/**
 * /item
 *
 * アイテムの登録・修正を行うアプリのトップ画面
 */
import { Border } from "@/components/Border";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";

import { PrismaClient, ItemRank, ItemType } from "@prisma/client";

import ItemInput from "@/app/item/ItemInput";
import ItemList from "@/app/item/ItemList";

// Route Segment Config
// Page, Layout, Route Handlers に設定可能, Component には不可
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function Home() {
  const ranks: ItemRank[] = await prisma.itemRank.findMany();
  const types: ItemType[] = await prisma.itemType.findMany();

  await prisma.$disconnect();

  return (
    <Container className="mt-8 sm:mt-16 lg:mt-24">
      <FadeIn>
        <h1 className="mb-4 text-4xl font-bold">アイテム登録フォーム</h1>

        {/* 合成結果入力フォーム */}
        <ItemInput ranks={ranks} types={types} />
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <Border as={FadeIn} />
        {/* 合成結果表示 */}
        <ItemList />
      </FadeInStagger>
    </Container>
  );
}
