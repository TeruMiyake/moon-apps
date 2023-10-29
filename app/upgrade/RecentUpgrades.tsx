/**
 * 最近登録された合成結果を表示するコンポーネント
 */
import {
  PrismaClient,
  Upgrade,
  ItemRank,
  UpgradeResultType,
} from "@prisma/client";

const prisma = new PrismaClient();

export type IncludedUpgrade = Upgrade & {
  rank: ItemRank;
  resultType: UpgradeResultType;
};

export default async function RecentUpgrades() {
  const upgrades: IncludedUpgrade[] = await prisma.upgrade.findMany({
    take: 20,
    orderBy: {
      triedAt: "desc",
    },
    include: {
      rank: true,
      resultType: true,
    },
  });
  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">最近登録された合成結果</h2>
      <ul className="list-inside list-disc">
        {upgrades.map((upgrade) => (
          <li key={upgrade.id} className="mb-1">
            ランク {upgrade.rank.name}, +{upgrade.originalLevel} →, 結果:{" "}
            {upgrade.resultType.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
