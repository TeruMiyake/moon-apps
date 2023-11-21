/**
 * アイテム一覧を表示するコンポーネント
 */
import { PrismaClient, Item, ItemRank, ItemType } from "@prisma/client";
import ItemDeleteButton from "@/app/item/ItemDeleteButton";

const prisma = new PrismaClient();

export type IncludedItem = Item & {
  rank: ItemRank;
  type: ItemType;
};

export default async function RecentItems() {
  const items: IncludedItem[] = await prisma.item.findMany({
    include: {
      rank: true,
      type: true,
    },
  });

  await prisma.$disconnect();

  return (
    <div className="mb-6 max-w-3xl rounded p-4">
      <h2 className="mb-4 text-2xl font-semibold text-gray-600">
        アイテム一覧
      </h2>

      {/* 大きな画面用 */}
      <div className="hidden max-w-3xl rounded bg-gray-100 p-1 md:table">
        <table className="min-w-full bg-white text-center">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">タイプ</th>
              <th className="border-b px-4 py-2">ランク</th>
              <th className="border-b px-4 py-2">アイテム名</th>
              <th className="border-b px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="border-b px-4 py-2">{item.type.name}</td>
                <td className="border-b px-4 py-2">[{item.rank.name}]</td>
                <td className="border-b px-4 py-2">{item.name}</td>
                <td className="border-b px-4 py-2">
                  <ItemDeleteButton id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* スマホと小さめのタブレット用 */}
      <div className="flex flex-col gap-1 md:hidden">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`rounded p-2 ${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            <div className="ml-2 mr-4 flex items-center justify-between">
              <div>
                <span className="font-bold">
                  {item.type.name} &nbsp; [{item.rank.name}] {item.name}
                </span>
              </div>
              <div>
                <ItemDeleteButton id={item.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
