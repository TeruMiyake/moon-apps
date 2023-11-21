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
  const [userName, setUserName] = useState(itemNeed.userName);
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
  const [item1] = useState(itemNeed.item1);
  const [item2] = useState(itemNeed.item2);
  // const [item3, setItem3] = useState(itemNeed.item3);
  // const [item4, setItem4] = useState(itemNeed.item4);
  // const [item5, setItem5] = useState(itemNeed.item5);
  // const [item6, setItem6] = useState(itemNeed.item6);
  // const [item7, setItem7] = useState(itemNeed.item7);
  // const [item8, setItem8] = useState(itemNeed.item8);
  // const [item1Price, setItem1Price] = useState(itemNeed.item1Price);
  // const [item2Price, setItem2Price] = useState(itemNeed.item2Price);
  // const [item3Price, setItem3Price] = useState(itemNeed.item3Price);
  // const [item4Price, setItem4Price] = useState(itemNeed.item4Price);
  // const [item5Price, setItem5Price] = useState(itemNeed.item5Price);
  // const [item6Price, setItem6Price] = useState(itemNeed.item6Price);
  // const [item7Price, setItem7Price] = useState(itemNeed.item7Price);
  // const [item8Price, setItem8Price] = useState(itemNeed.item8Price);
  // const [item1NowBuying, setItem1NowBuying] = useState(itemNeed.item1NowBuying);
  // const [item2NowBuying, setItem2NowBuying] = useState(itemNeed.item2NowBuying);
  // const [item3NowBuying, setItem3NowBuying] = useState(itemNeed.item3NowBuying);
  // const [item4NowBuying, setItem4NowBuying] = useState(itemNeed.item4NowBuying);
  // const [item5NowBuying, setItem5NowBuying] = useState(itemNeed.item5NowBuying);
  // const [item6NowBuying, setItem6NowBuying] = useState(itemNeed.item6NowBuying);
  // const [item7NowBuying, setItem7NowBuying] = useState(itemNeed.item7NowBuying);
  // const [item8NowBuying, setItem8NowBuying] = useState(itemNeed.item8NowBuying);
  // const [item1Memo, setItem1Memo] = useState(itemNeed.item1Memo);
  // const [item2Memo, setItem2Memo] = useState(itemNeed.item2Memo);
  // const [item3Memo, setItem3Memo] = useState(itemNeed.item3Memo);
  // const [item4Memo, setItem4Memo] = useState(itemNeed.item4Memo);
  // const [item5Memo, setItem5Memo] = useState(itemNeed.item5Memo);
  // const [item6Memo, setItem6Memo] = useState(itemNeed.item6Memo);
  // const [item7Memo, setItem7Memo] = useState(itemNeed.item7Memo);
  // const [item8Memo, setItem8Memo] = useState(itemNeed.item8Memo);


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

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, itemName: string) => {
    const price = parseFloat(e.target.value) || 0;
    setPrices({ ...prices, [itemName]: price });
  };

  return (
    <div className="mb-3 border p-3">
      <div className="mb-3">
        {/* ユーザー名の編集フォーム */}
        <label className="mb-1 block">User Name: </label>
          <input
            value={userName || ""}
            onChange={(e) =>
              handleUserNameChange(e)
            }
            className="border p-1"
          />
        {/* 各アイテムと価格の編集フォーム */}
        {/* 例: */}
        <div className="mb-2">
          {/* ここにドロップダウンリストを追加 */}
          <p>{item1?.name || ""}</p>
          <label className="mb-1 block">Item 1 Price:</label>
          <input
            type="number"
            value={prices['item1Price'] || ""}
            onChange={(e) =>
              handlePriceChange(e, "item1Price")
            }
            className="border p-1"
          />
        </div>
        {/* 各アイテムに対して同様のフォームを追加 */}
        <div className="mb-2">
          <label className="mb-1 block">Item 2 Price:</label>
          <input
            type="number"
            value={prices['item2Price'] || ""}
            onChange={(e) =>
              handlePriceChange(e, "item2Price")
            }
            className="border p-1"
          />
          {/* ここにドロップダウンリストを追加 */}
          <p>{item2?.name || ""}</p>
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
