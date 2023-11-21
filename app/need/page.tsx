/**
 * /needs
 *
 * アイテムの募集状況を登録・表示するアプリの画面
 */
import { Border } from "@/components/Border";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";

import NeedList from "@/app/need/NeedList";

// Route Segment Config
// Page, Layout, Route Handlers に設定可能, Component には不可
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <Container className="mt-8 sm:mt-16 lg:mt-24">
      <FadeIn>
        <h1 className="mb-4 text-4xl font-bold">みんなの欲しいアイテム集</h1>
        {/* 注意書き */}
        <h2>ごめんなさい、まだ使えません…… 😿</h2>
      </FadeIn>

      <FadeInStagger className="mt-10" faster>
        <Border as={FadeIn} />
        {/* 欲しいアイテム入力・表示フォーム */}
        <NeedList />
      </FadeInStagger>
    </Container>
  );
}
