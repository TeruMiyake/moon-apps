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

function toJTC(utc: Date): Date {
  return new Date(utc.getTime() + 9 * 60 * 60 * 1000);
}

// 23.01.23 12:34 形式
function toFormattedJTC_YYMMDDHHmm(utc: Date): string {
  const jtc = toJTC(utc);
  const year = jtc.getFullYear();
  const month = jtc.getMonth() + 1;
  const date = jtc.getDate();
  const hours = jtc.getHours();
  const minutes = jtc.getMinutes();
  return `${year % 100}/${month.toString().padStart(2, "0")}/${date
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

// 23.01.23 形式
function toFormattedJTC_YYMMDD(utc: Date): string {
  return toFormattedJTC_YYMMDDHHmm(utc).slice(0, 8);
}

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
    <div className="max-w-2xl rounded bg-gray-100 p-4">
      <h2 className="mb-4 text-2xl font-semibold text-gray-600">
        最近登録された合成結果
      </h2>
      <table className="min-w-full bg-white text-center">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">登録日</th>
            <th className="border-b px-4 py-2">合成日</th>
            <th className="border-b px-4 py-2">ランク</th>
            <th className="border-b px-4 py-2">元の強化値</th>
            <th className="border-b px-4 py-2">結果</th>
            <th className="border-b px-4 py-2">操作</th>
          </tr>
        </thead>
        <tbody>
          {upgrades.map((upgrade, index) => (
            <tr
              key={upgrade.id}
              className={index % 2 === 0 ? "bg-gray-100" : ""}
            >
              <td className="border-b px-4 py-2">
                {toFormattedJTC_YYMMDDHHmm(upgrade.registeredAt)}
              </td>
              <td className="border-b px-4 py-2">
                {toFormattedJTC_YYMMDD(upgrade.triedAt)}
              </td>
              <td className="border-b px-4 py-2">{upgrade.rank.name}</td>
              <td className="border-b px-4 py-2">{`+${upgrade.originalLevel}`}</td>
              <td className="border-b px-4 py-2">{upgrade.resultType.name}</td>
              <td className="border-b px-4 py-2">
                <button className="rounded bg-red-500 px-4 py-2 text-white">
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
