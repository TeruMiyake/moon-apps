/**
 * 合成結果の入力フォームを提供するコンポーネント
 */
"use client";

import { ItemRank, ItemType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/Button";

export interface ItemInputProps {
  ranks: ItemRank[];
  types: ItemType[];
}

export default function ItemInput({ ranks, types }: ItemInputProps) {
  // 新規登録時にページを refresh するために router を使う
  const router = useRouter();

  const [name, setName] = useState("");
  // rankId: 1 ~ 7
  const [rankId, setRankId] = useState(1);
  // typeId: 1 ~ 5
  const [typeId, setTypeId] = useState(1);

  // 登録ボタンが押された場合の処理
  const handleSubmit = async () => {
    const body = {
      name,
      rankId,
      typeId,
    };

    try {
      const res = await fetch("/api/items", {
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

  return (
    <div className="mb-6 max-w-xs rounded-lg bg-gray-100 p-6 pl-8">
      <form>
        {/* アイテム登録 */}
        <div className="mb-4 flex space-x-4">
          {/* Name */}
          <div className="mr-16">
            <label htmlFor="name" className="block text-gray-700">
              アイテム名:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded bg-blue-200 p-2"
            />
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
          {/* Type */}
          <div className="mr-16">
            <label htmlFor="typeId" className="block text-gray-700">
              タイプ
            </label>
            <select
              id="typeId"
              value={typeId}
              onChange={(e) => setTypeId(Number(e.target.value))}
              className="rounded bg-blue-200 p-2"
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          {/* Rank */}
          <div>
            <label htmlFor="rankId" className="block text-gray-700">
              ランク:
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
        </div>

        {/* 結果選択＆登録ボタン */}
        <div className="ml-12 mt-5 flex flex-wrap">
          <Button
            key="submit"
            type="button"
            onClick={() => {
              handleSubmit();
            }}
            className="m-2 flex w-2/5 items-center justify-center"
          >
            登録
          </Button>
        </div>
      </form>
    </div>
  );
}
