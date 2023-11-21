/**
 * Need コンポーネントをリスト表示するコンポーネント
 */
import {
  PrismaClient,
  Item,
  ItemRank,
  ItemType,
  ItemNeed,
} from "@prisma/client";

import Need from "@/app/need/Need";

const prisma = new PrismaClient();

export type IncludedItem = Item & {
  rank: ItemRank;
  type: ItemType;
};

export type IncludedItemNeed = ItemNeed & {
  item1: IncludedItem | null;
  item2: IncludedItem | null;
  item3: IncludedItem | null;
  item4: IncludedItem | null;
  item5: IncludedItem | null;
  item6: IncludedItem | null;
  item7: IncludedItem | null;
  item8: IncludedItem | null;
};

export default async function NeedList() {
  const itemNeeds: IncludedItemNeed[] = await prisma.itemNeed.findMany({
    orderBy: {
      userName: "asc",
    },
    include: {
      item1: {
        include: {
          rank: true,
          type: true,
        },
      },
      item2: {
        include: {
          rank: true,
          type: true,
        },
      },
      item3: {
        include: {
          rank: true,
          type: true,
        },
      },
      item4: {
        include: {
          rank: true,
          type: true,
        },
      },
      item5: {
        include: {
          rank: true,
          type: true,
        },
      },
      item6: {
        include: {
          rank: true,
          type: true,
        },
      },
      item7: {
        include: {
          rank: true,
          type: true,
        },
      },
      item8: {
        include: {
          rank: true,
          type: true,
        },
      },
    },
  });

  await prisma.$disconnect();

  return (
    <div className="container mx-auto p-4">
      {itemNeeds.map((itemNeed, index) => (
        <Need key={index} itemNeed={itemNeed} />
      ))}
    </div>
  );
}
