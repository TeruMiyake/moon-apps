/**
 * /upgrade
 *
 * 合成結果の統計入力・表示を行うアプリのトップ画面
 */

import {
  PrismaClient,
  Item,
  ItemRank,
  ItemType,
  UpgradeResultType,
} from "@prisma/client";

import UpgradeInput from "@/app/upgrade/UpgradeInput";
import RecentUpgrades from "@/app/upgrade/RecentUpgrades";

const prisma = new PrismaClient();

type IncludedItem = Item & {
  rank: ItemRank;
  type: ItemType;
};

export default async function Home() {
  // アイテム一覧用
  // TODO: このページには不要なので、削除予定
  const items: IncludedItem[] = await prisma.item.findMany({
    include: {
      rank: true,
      type: true,
    },
  });

  const ranks: ItemRank[] = await prisma.itemRank.findMany();
  const resultTypes: UpgradeResultType[] =
    await prisma.upgradeResultType.findMany();

  prisma.$disconnect();

  return (
    <main className="bg-gray-100 p-8">
      <h1 className="mb-4 text-4xl font-bold">合成結果入力</h1>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        {/* 合成結果入力フォーム */}
        <UpgradeInput ranks={ranks} resultTypes={resultTypes} />

        {/* 合成結果表示 */}
        <RecentUpgrades />

        {/* アイテム一覧表示 */}
        <h2 className="mb-2 text-2xl font-semibold">アイテム一覧</h2>
        <ul className="list-inside list-disc">
          {items.map((item) => (
            <li key={item.id} className="mb-1">
              {item.name}: ランク {item.rank.name}, 種別 {item.type.name}（
              {item.type.equippable ? "装備可" : "装備不可"}）
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
