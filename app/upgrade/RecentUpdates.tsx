/**
 * 最近登録された合成結果を表示するコンポーネント
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function RecentUpdates() {
  const upgrades = await prisma.upgrade.findMany({
    orderBy: { registeredAt: "desc" },
    take: 20,
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
