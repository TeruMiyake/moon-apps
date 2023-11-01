/**
 * 合成結果の入力フォームを提供するコンポーネント
 */
"use client";

import { ItemRank, UpgradeResultType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface UpgradeInputProps {
  ranks: ItemRank[];
  resultTypes: UpgradeResultType[];
}

export default function UpgradeInput({
  ranks,
  resultTypes,
}: UpgradeInputProps) {
  // 新規登録時にページを refresh するために router を使う
  const router = useRouter();

  const [originalLevel, setOriginalLevel] = useState(0);
  const [triedAt, setTriedAt] = useState(new Date());
  // rankId: 1 ~ 7
  const [rankId, setRankId] = useState(1);

  // Date 型を使いつつもフォームでは日付しか扱わないことにするため、
  // フォーム上では "YYYY-MM-DD" 形式の文字列 triedAtStr として扱う
  // 送信時には triedAtStr を Date 型に変換する
  const triedAtStr = triedAt.toISOString().split("T")[0];

  // 合成結果の登録ボタンが押された場合の処理
  // resultTypeId は登録ボタンの種類によって異なる
  const handleSubmit = async (resultTypeId: number) => {
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

    router.refresh();
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
    <div className="mb-6 max-w-xs rounded-lg bg-gray-100 p-6 pl-14">
      <form>
        {/* Rank and Original Level */}
        <div className="mb-4 flex space-x-4">
          {/* Rank */}
          <div className="mr-10">
            <label htmlFor="rankId" className="block text-gray-700">
              装備ランク:
            </label>
            <select
              id="rankId"
              value={rankId}
              onChange={(e) => setRankId(Number(e.target.value))}
              className="rounded bg-blue-200 p-2"
            >
              {ranks.map((rank) => (
                <option key={rank.id} value={rank.id}>
                  {rank.name}
                </option>
              ))}
            </select>
          </div>
          {/* Original Level */}
          <div>
            <label htmlFor="originalLevel" className="block text-gray-700">
              合成
              <u>
                <b>前</b>
              </u>
              の+値:
            </label>
            <select
              id="originalLevel"
              value={originalLevel}
              onChange={(e) => setOriginalLevel(Number(e.target.value))}
              className="rounded bg-blue-200 p-2"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tried At */}
        <div className="mb-4">
          <label htmlFor="triedAt" className="block text-gray-700">
            合成した日付:
          </label>
          <input
            type="date"
            id="triedAt"
            value={triedAtStr}
            onChange={handleChangeDate}
            className="rounded bg-blue-200 p-2"
          />
        </div>

        {/* 結果選択＆登録ボタン */}
        <div className="mt-5 flex flex-wrap">
          {resultTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => {
                handleSubmit(type.id);
              }}
              className="m-2 w-1/3 rounded bg-blue-400 p-3 text-white"
            >
              {type.name}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
