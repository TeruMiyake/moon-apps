/**
 * 合成結果の入力フォームを提供するコンポーネント
 */
"use client";

import { ItemRank, UpgradeResultType } from "@prisma/client";
import { useState } from "react";

export interface UpgradeInputProps {
  ranks: ItemRank[];
  resultTypes: UpgradeResultType[];
}

export default function UpgradeInput({
  ranks,
  resultTypes,
}: UpgradeInputProps) {
  const [originalLevel, setOriginalLevel] = useState(0);
  const [triedAt, setTriedAt] = useState(new Date());
  const [rankId, setRankId] = useState(0);
  const [resultTypeId, setResultTypeId] = useState(0);

  // Date 型を使いつつもフォームでは日付しか扱わないことにするため、
  // フォーム上では "YYYY-MM-DD" 形式の文字列 triedAtStr として扱う
  // 送信時には triedAtStr を Date 型に変換する
  const triedAtStr = triedAt.toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      originalLevel,
      triedAt,
      rankId,
      resultTypeId,
    };

    try {
      const res = await fetch("/api/upgrades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Successfully created:", data);
      } else {
        console.log("Failed to create: ", res.status, res.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // 上述のとおり、フォーム送信時に triedAtStr を Date 型に変換する
  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateStr = e.target.value; // "YYYY-MM-DD" 形式の文字列
    const newDate = new Date(newDateStr);

    // 時刻を正午に固定
    newDate.setHours(12, 0, 0, 0);

    setTriedAt(newDate);
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">合成結果入力フォーム</h2>
      <form onSubmit={handleSubmit}>
        {/* Original Level */}
        <div>
          <label htmlFor="originalLevel">Original Level:</label>
          <select
            id="originalLevel"
            value={originalLevel}
            onChange={(e) => setOriginalLevel(Number(e.target.value))}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Tried At */}
        <div>
          <label htmlFor="triedAt">Tried At:</label>
          <input
            type="date"
            id="triedAt"
            value={triedAtStr}
            onChange={handleChangeDate}
          />
        </div>

        {/* Rank */}
        <div>
          <label htmlFor="rankId">Rank:</label>
          <select
            id="rankId"
            value={rankId}
            onChange={(e) => setRankId(Number(e.target.value))}
          >
            {ranks.map((rank) => (
              <option key={rank.id} value={rank.id}>
                {rank.name}
              </option>
            ))}
          </select>
        </div>

        {/* Result Type */}
        <div>
          {resultTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setResultTypeId(type.id)}
            >
              {type.name}
            </button>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}