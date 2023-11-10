/**
 * 合成に関する注意書きを表示するコンポーネント
 *
 * トグル可能
 */
"use client";

import { useState } from "react";

const TogglableNote = () => {
  const [isNoteVisible, setNoteVisible] = useState(false);

  const toggleNote = () => {
    setNoteVisible(!isNoteVisible);
  };

  return (
    <div className="relative mb-4">
      <button
        onClick={toggleNote}
        className="flex items-center rounded bg-yellow-100 p-2 pr-4 text-yellow-700"
      >
        ⚠️ 入力前に読んでね
      </button>
      {isNoteVisible && (
        <div className="absolute top-full z-10 mt-2 w-64 rounded border border-gray-300 bg-yellow-50 p-4 text-gray-800 shadow-lg">
          <h3 className="mb-2 text-lg font-bold">お願い</h3>
          <ol className="list-inside list-disc" type="1">
            <li>
              合成前から「入力する」と決めていたものだけ入力してください。成功/失敗時に偏った入力となり、統計が歪むことを防ぐためです。
            </li>
            <li>
              名前は入力しなくても OK
              です。（入れ間違いを消すときに、自分が入れたデータか分からなくなるのでつけた機能です。）
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default TogglableNote;
