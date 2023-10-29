/**
 * 合成結果の統計を表示するコンポーネント
 *
 * インタラクティブにグラフを表示したりフィルタしたりしたいが、
 * 当面は合成結果の統計を表示するだけでよいので、一旦 Server Components で実装
 *
 * API GET /api/upgrades/stats を fetch することで DRY にしたかったが、
 * URL を解決できない（SC から自身の API を相対パスで呼べない？）のでとりあえず API とほぼ同じコードを書いた
 */
import {
  PrismaClient,
  ItemRank,
  Upgrade,
  UpgradeResultType,
} from "@prisma/client";
import { Fragment } from "react";

const prisma = new PrismaClient();

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

const itemRankColorClassDict: { [key: number]: string } = {
  1: "bg-gray-100", // F
  2: "bg-green-100", // E
  3: "bg-orange-100",
  4: "bg-blue-100",
  5: "bg-amber-100",
  6: "bg-red-100",
  7: "bg-purple-100",
};

async function fetchStats(): Promise<UpgradeStatsPerRank[]> {
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
    return [] as UpgradeStatsPerRank[];
  } finally {
    await prisma.$disconnect();
  }

  // データ取得及び集計処理
  try {
    const upgrades: IncludedUpgrade[] = await prisma.upgrade.findMany({
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

    return upgradeStatsPerRanks;
  } catch (error) {
    console.error(error);
    return [] as UpgradeStatsPerRank[];
  } finally {
    await prisma.$disconnect();
  }
}

export default async function UpgradeStats() {
  // 集計結果の取得
  const stats: UpgradeStatsPerRank[] = await fetchStats();
  // 集計結果をソート
  stats.sort((a, b) => a.itemRank.originalLevel - b.itemRank.originalLevel);
  stats.sort((a, b) => a.itemRank.itemRankId - b.itemRank.itemRankId);

  return (
    <div className="mb-6 max-w-3xl">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">ランク</th>
            <th className="border px-4 py-2">元の強化値</th>
            <th className="border px-4 py-2">合成回数</th>
            <th className="border px-4 py-2">結果種別名</th>
            <th className="border px-4 py-2">回数</th>
            <th className="border px-4 py-2">確率 (%)</th>
          </tr>
        </thead>
        <tbody>
          {/* ランクごとに分ける */}
          {stats.map((stat, index) => (
            <Fragment key={index}>
              {stat.counts.map((count, subIndex) => (
                <tr key={subIndex}>
                  {subIndex === 0 && (
                    <>
                      <td
                        className={`border px-4 py-2 ${
                          itemRankColorClassDict[stat.itemRank.itemRankId]
                        }`}
                        rowSpan={stat.counts.length}
                      >
                        {stat.itemRank.itemRankName}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          itemRankColorClassDict[stat.itemRank.itemRankId]
                        }`}
                        rowSpan={stat.counts.length}
                      >
                        +{stat.itemRank.originalLevel}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          itemRankColorClassDict[stat.itemRank.itemRankId]
                        }`}
                        rowSpan={stat.counts.length}
                      >
                        {stat.totalCount}
                      </td>
                    </>
                  )}
                  {(() => {
                    // 背景色クラスを格納する変数を定義
                    const bgColorClass =
                      count.upgradeResultTypeName === "失敗"
                        ? "bg-gray-100"
                        : count.upgradeResultTypeName === "成功"
                        ? "bg-yellow-50"
                        : count.upgradeResultTypeName === "大成功"
                        ? "bg-yellow-100"
                        : count.upgradeResultTypeName === "超大成功"
                        ? "bg-yellow-200"
                        : "";

                    return (
                      <>
                        <td
                          className={`border px-4 py-2 ${bgColorClass}`}
                        >
                          {count.upgradeResultTypeName}
                        </td>
                        <td className={`border px-4 py-2 ${bgColorClass}`}>
                          {count.count}
                        </td>
                        <td className={`border px-4 py-2 ${bgColorClass}`}>
                          {count.rate}
                        </td>
                      </>
                    );
                  })()}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
