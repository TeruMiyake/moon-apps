/**
 * 欲しいアイテムと価格を表示し、更新するコンポーネント
 */
"use client";

// import { useRouter } from "next/navigation";
import React, { useState } from "react";

// import { Button } from "@/components/Button";

import { IncludedItemNeed } from "@/app/needs/NeedList";

export default function Need({ itemNeed }: { itemNeed: IncludedItemNeed }) {
  // State for editing fields
  const [prices, setPrices] = useState({
    item1Price: itemNeed.item1Price,
    item2Price: itemNeed.item2Price,
    item3Price: itemNeed.item3Price,
    item4Price: itemNeed.item4Price,
    item5Price: itemNeed.item5Price,
    item6Price: itemNeed.item6Price,
    item7Price: itemNeed.item7Price,
    item8Price: itemNeed.item8Price,
  });

  // ここで各アイテムの選択状態を管理するstateを設定する

  // 更新処理
  const handleUpdate = () => {
    // ここで更新処理を実装
  };

  // 削除処理
  const handleDelete = () => {
    // 削除前の確認ダイアログ表示
    if (window.confirm("Are you sure you want to delete this item need?")) {
      // ここで削除処理を実装
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, itemName: string) => {
    const price = parseFloat(e.target.value) || 0;
    setPrices({ ...prices, [itemName]: price });
  };

  return (
    <div className="mb-3 border p-3">
      <div className="mb-3">
        <label className="mb-1 block">User Name: {itemNeed.userName}</label>
        {/* 各アイテムと価格の編集フォーム */}
        {/* 例: */}
        <div className="mb-2">
          <label className="mb-1 block">Item 1 Price:</label>
          <input
            type="number"
            value={itemNeed.item1Price || ""}
            onChange={(e) =>
              handlePriceChange(e, "item1Price")
            }
            className="border p-1"
          />
          {/* ここにドロップダウンリストを追加 */}
          <p>{itemNeed.item1?.name || ""}</p>
        </div>
        {/* 各アイテムに対して同様のフォームを追加 */}
        <div className="mb-2">
          <label className="mb-1 block">Item 2 Price:</label>
          <input
            type="number"
            value={itemNeed.item2Price || ""}
            onChange={(e) =>
              handlePriceChange(e, "item1Price")
            }
            className="border p-1"
          />
          {/* ここにドロップダウンリストを追加 */}
          <p>{itemNeed.item2?.name || ""}</p>
        </div>

        {/* 更新ボタン */}
        <button
          onClick={handleUpdate}
          className="bg-blue-500 px-4 py-2 text-white"
        >
          Update
        </button>

        {/* 削除ボタン */}
        <button
          onClick={handleDelete}
          className="ml-2 bg-red-500 px-4 py-2 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
