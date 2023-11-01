/**
 * /battle
 *
 * 戦闘結果の抽出・解析を行う画面
 */

import BattleAnalysis from "@/app/battle/BattleAnalysis";

// Route Segment Config
// Page, Layout, Route Handlers に設定可能, Component には不可
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="bg-gray-100 p-8">
      <h1 className="mb-4 text-4xl font-bold">戦闘結果分析</h1>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        {/* 分析画面 */}
        <BattleAnalysis />
      </div>
    </main>
  );
}
