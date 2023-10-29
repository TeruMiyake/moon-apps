/**
 * /upgrade
 *
 * 合成結果の統計入力・表示を行うアプリのトップ画面
 */

import { PrismaClient, ItemRank, UpgradeResultType } from "@prisma/client";

import UpgradeInput from "@/app/upgrade/UpgradeInput";
import RecentUpgrades from "@/app/upgrade/RecentUpgrades";
import UpgradeStats from "@/app/upgrade/UpgradeStats";

const prisma = new PrismaClient();

export default async function Home() {
  const ranks: ItemRank[] = await prisma.itemRank.findMany();
  const resultTypes: UpgradeResultType[] =
    await prisma.upgradeResultType.findMany();

  await prisma.$disconnect();

  return (
    <main className="bg-gray-100 p-8">
      <h1 className="mb-4 text-4xl font-bold">合成結果入力</h1>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        {/* 合成結果入力フォーム */}
        <UpgradeInput ranks={ranks} resultTypes={resultTypes} />

        {/* 合成結果表示 */}
        <RecentUpgrades />

        {/* 合成結果統計表示 */}
        <UpgradeStats />
      </div>
    </main>
  );
}
