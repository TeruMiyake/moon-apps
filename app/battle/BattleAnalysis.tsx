/**
 * バトル結果の HTML ソースを元に結果を抽出・解析して表示するコンポーネント
 */
"use client";

import { useState } from "react";

export default function BattleAnalysis() {
  const [sourceCode, setSourceCode] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const handleExecute = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sourceCode, "text/html");

    // ここで解析処理。例えば、すべてのimgタグのsrcを取得
    const divs = Array.from(
      doc.querySelectorAll(
        "div.row.bg-1.p-1,div.col-12.highlight2.mw-.p-1,div.current-action,div.users,div.enemies,div.skill_title,div.damage",
      ),
    ).map((div) => {
      // クラス名による条件分岐
      console.log(div.classList);
      if (div.classList.contains("current-action")) {
        // .current-action がマッチした場合
        return (div as HTMLDivElement).style.width;
      } else {
        // その他がマッチした場合
        return (div as HTMLDivElement).innerText.replaceAll(/\s|\n/g, "");
      }
    });
    setResult(divs);
  };

  return (
    <div className="flex flex-col justify-center bg-gray-100 p-4">
      <div className="w-full">
        <textarea
          className="h-60 w-full resize-none rounded border p-4 shadow-sm sm:h-96"
          placeholder="HTMLソースコードを貼り付けてください"
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
        ></textarea>
        <button
          onClick={handleExecute}
          className="mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:border-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
        >
          実行
        </button>
      </div>
      <div className="mt-8 w-full">
        <h2 className="mb-4 text-2xl font-bold">解析結果</h2>
        {result && (
          <pre className="overflow-x-auto rounded bg-gray-200 p-4">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
