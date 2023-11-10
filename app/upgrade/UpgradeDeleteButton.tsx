"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface UpgradeDeleteButtonProps {
  id: number;
}

export default function UpgradeDeleteButton({ id }: UpgradeDeleteButtonProps) {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const handleAlertConfirmed = () => {
    handleDelete(id);
    setShowAlert(false);
  };

  // 合成結果の登録ボタンが押された場合の処理
  // resultTypeId は登録ボタンの種類によって異なる
  const handleDelete = async (id: number) => {
    const body = {
      id,
    };

    try {
      const res = await fetch("/api/upgrades", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Successfully deleted:", data);
      } else {
        console.log("Failed to delete: ", res.status, res.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    router.refresh();
  };

  return (
    <>
      <button
        className="rounded bg-red-500 px-3 py-2 text-white"
        onClick={() => setShowAlert(true)}
      >
        削除
      </button>

      {showAlert && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/50">
          <div className="rounded bg-white p-4">
            <p>本当に削除しますか？</p>
            <button
              className="mr-2 rounded bg-red-500 px-4 py-2 text-white"
              onClick={handleAlertConfirmed}
            >
              OK
            </button>
            <button
              className="rounded bg-gray-500 px-4 py-2 text-white"
              onClick={() => setShowAlert(false)}
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </>
  );
}
