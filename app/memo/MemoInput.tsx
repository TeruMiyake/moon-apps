/**
 * メモの入力フォームを提供するコンポーネント
 */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/Button";

export default function MemoInput() {
  // 新規登録時にページを refresh するために router を使う
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // 登録ボタンが押された場合の処理
  const handleSubmit = async () => {
    const body = {
      title,
      text,
    };

    try {
      const res = await fetch("/api/memos", {
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
    <div className="mb-2 max-w-2xl rounded p-4">
      {/* 大きな画面用 */}
      <div className="mb-2 hidden w-full rounded-lg bg-gray-100 p-1 pl-4 md:table">
        <form>
          {/* メモ登録 */}
          <div className="mb-4 space-x-4">
            {/* Title */}
            <div className="mr-4">
              <label htmlFor="title" className="block text-gray-700">
                タイトル:
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded bg-blue-200 p-2"
              />
            </div>
          </div>
          <div className="mb-2 space-x-4">
            {/* Type */}
            <div className="mr-4">
              <label htmlFor="typeId" className="block text-gray-700">
                内容:
              </label>
              <textarea
                rows={5}
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded bg-blue-200 p-2"
              />
            </div>
          </div>

          {/* 結果選択＆登録ボタン */}
          <div className="flex justify-center">
            <Button
              key="submit"
              type="button"
              onClick={() => {
                handleSubmit();
              }}
              className="m-2 mb-4 flex w-2/5 items-center justify-center"
            >
              登録
            </Button>
          </div>
        </form>
      </div>

      {/* スマホと小さめのタブレット用 */}
      <div className="flex flex-col gap-1 md:hidden">
        <form>
          {/* メモ登録 */}
          <div className="mb-4 space-x-4">
            {/* Title */}
            <div className="mr-4">
              <label htmlFor="title" className="block text-gray-700">
                タイトル:
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded bg-blue-200 p-2"
              />
            </div>
          </div>
          <div className="mb-4 space-x-4">
            {/* Type */}
            <div className="mr-4">
              <label htmlFor="typeId" className="block text-gray-700">
                内容
              </label>
              <textarea
                rows={5}
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded bg-blue-200 p-2"
              />
            </div>
          </div>

          {/* 結果選択＆登録ボタン */}
          <div className="ml-16 mt-5">
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
    </div>
  );
}
