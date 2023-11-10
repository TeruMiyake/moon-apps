/**
 * /api/upgrades/stats
 *
 * GET: 合成結果の統計情報を取得。返り値は UpgradeStatsPerRank[]。0回の組み合わせはデータに含まれないので例外処理に注意。
 */
import { type NextRequest } from "next/server";

import {
  PrismaClient,
  ItemRank,
  Upgrade,
  UpgradeResultType,
} from "@prisma/client";

// Route Segment Config
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 30; // seconds

const prisma = new PrismaClient();

const headers = { "content-type": "application/json;charset=UTF-8" };

type IncludedUpgrade = Upgrade & {
  rank: ItemRank;
  resultType: UpgradeResultType;
};

type UpgradeStatsPerRank = {
  // (アイテムランク, 元の強化値) の組み合わせを表す
  // 冗長となるが、便宜上、ランク名の文字列も含めておく
  itemRank: { itemRankId: number; itemRankName: string; originalLevel: number };
  // そのアイテムランク, 元の強化値で合成された回数の合計
  totalCount: number;
  // 結果種別ごとの合計数
  counts: {
    upgradeResultTypeId: number;
    upgradeResultTypeName: string;
    count: number;
    rate: number;
  }[];
};

export async function GET(req: NextRequest) {
  console.log(`GET /api/upgrades/stats called. req: ${req}`);

  // Request オブジェクトから URL クエリパラメータを取得
  const searchParams = req.nextUrl.searchParams;
  const fromDateStr = searchParams.get('from');

  // 'from' パラメータが存在し、有効な日付であれば、それを使用
  let fromDate: Date | undefined = undefined;
  if (fromDateStr) {
    fromDate = new Date(fromDateStr);
    if (isNaN(fromDate.getTime())) {
      // 有効な日付でなければ undefined に設定
      fromDate = undefined;
    }
  }

  // 事前に dict[resyltTypeid] = resultTypeName の辞書を作成しておく
  let updgradeResultTypeNameDict: { [key: number]: string } = {};
  try {
    const upgradeResultTypes: UpgradeResultType[] =
      await prisma.upgradeResultType.findMany();

    updgradeResultTypeNameDict = upgradeResultTypes.reduce(
      (dict, resultType) => {
        dict[resultType.id] = resultType.name;
        return dict;
      },
      {} as { [key: number]: string },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Unable to fetch upgradeResultTypes" }),
      {
        status: 500,
        headers,
      },
    );
  } finally {
    await prisma.$disconnect();
  }

  // データ取得及び集計処理
  try {
    const upgrades: IncludedUpgrade[] = await prisma.upgrade.findMany({
      where: fromDate ? { triedAt: { gte: fromDate } } : undefined,
      include: {
        rank: true,
        resultType: true,
      },
    });

    const groupedByRank: {
      [key: string]: IncludedUpgrade[];
    } = {};

    // 1. upgrades を itemRankId と originalLevel でグループ化
    // groupedByRank[`${itemRankId}_${originalLevel}`] = [Upgrade, Upgrade, ...]
    upgrades.forEach((upgrade) => {
      const key = `${upgrade.rankId}_${upgrade.originalLevel}`;
      if (!groupedByRank[key]) {
        groupedByRank[key] = [];
      }
      groupedByRank[key].push(upgrade);
    });

    // 2. 集計処理
    const upgradeStatsPerRanks: UpgradeStatsPerRank[] = Object.values(
      groupedByRank,
    ).map((group: IncludedUpgrade[]) => {
      // group は各 (アイテムランク, 元の強化値) を区分する

      // 各 (アイテムランク, 元の強化値) ごとの合成数の合計
      const totalCount = group.length;

      // counts[upgradeResultTypeId] = 結果ごとの小計数
      const counts: { [key: number]: number } = {};
      group.forEach((upgrade) => {
        if (!counts[upgrade.resultType.id]) {
          counts[upgrade.resultType.id] = 0;
        }
        counts[upgrade.resultType.id]++;
      });

      // 3. 結果をUpgradeStatsPerRankの形に整形
      const countsArray = Object.keys(counts).map((resultTypeId) => {
        const number_resultTypeId = parseInt(resultTypeId);
        return {
          upgradeResultTypeId: number_resultTypeId,
          upgradeResultTypeName:
            updgradeResultTypeNameDict[number_resultTypeId],
          count: counts[number_resultTypeId],
          rate: (counts[number_resultTypeId] / totalCount) * 100,
        };
      });

      return {
        itemRank: {
          itemRankId: group[0].rankId,
          itemRankName: group[0].rank.name,
          originalLevel: group[0].originalLevel,
        },
        totalCount,
        counts: countsArray,
      };
    });

    return new Response(JSON.stringify(upgradeStatsPerRanks), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Unable to fetch upgrades" }), {
      status: 500,
      headers,
    });
  } finally {
    await prisma.$disconnect();
  }
}
