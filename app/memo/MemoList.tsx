/**
 * アイテム一覧を表示するコンポーネント
 */
import { PrismaClient, Memo } from "@prisma/client";
import MemoDeleteButton from "@/app/memo/MemoDeleteButton";

const prisma = new PrismaClient();

export default async function MemoList() {
  const memos: Memo[] = await prisma.memo.findMany({
    // id の降順で取得
    orderBy: {
      id: "desc",
    },
  });

  await prisma.$disconnect();

  return (
    <div className="mb-6 max-w-3xl rounded p-4">
      <h2 className="mb-4 text-2xl font-semibold text-gray-600">メモ一覧</h2>

      {/* 大きな画面用 */}
      <div className="hidden max-w-3xl rounded bg-gray-100 p-1 md:table">
        <table className="min-w-full bg-white text-center">
          <thead>
            <tr>
              <th className="whitespace-pre-wrap border-b px-4 py-2">
                タイトル
              </th>
              <th className="whitespace-pre-wrap border-b px-4 py-2">内容</th>
              <th className="border-b px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {memos.map((memo, index) => (
              <tr
                key={memo.id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="whitespace-pre-wrap border-b px-4 py-2 text-center">{memo.title}</td>
                <td className="whitespace-pre-wrap border-b px-4 py-2 text-left">{memo.text}</td>
                <td className="border-b px-4 py-2">
                  <MemoDeleteButton id={memo.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* スマホと小さめのタブレット用 */}
      <div className="flex flex-col gap-1 md:hidden">
        {memos.map((memo, index) => (
          <div
            key={memo.id}
            className={`rounded p-2 ${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            <div className="ml-2 mr-4">
              <div>
                <span className="whitespace-pre-wrap font-bold">
                  {memo.title}
                </span>
              </div>
              <div>
                <span className="whitespace-pre-wrap">{memo.text}</span>
              </div>
              <div>
                <MemoDeleteButton id={memo.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
