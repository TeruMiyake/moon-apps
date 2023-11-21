/**
 * /memos
 *
 * メモを登録・表示するアプリの画面
 */
import { Border } from "@/components/Border";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";

import MemoInput from "@/app/memo/MemoInput";
import MemoList from "@/app/memo/MemoList";

// Route Segment Config
// Page, Layout, Route Handlers に設定可能, Component には不可
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <Container className="mt-8 sm:mt-16 lg:mt-24">
      <FadeIn>
        <h1 className="mb-4 text-4xl font-bold">みんなのメモ帳</h1>
        {/* 注意書き */}
        <h2>誰でも読めるし消せるので、あまり大事すぎることは書かないでね。</h2>

        {/* メモ登録フォーム */}
        <MemoInput />
      </FadeIn>

      <FadeInStagger className="mt-10" faster>
        <Border as={FadeIn} />
        {/* 欲しいアイテム入力・表示フォーム */}
        <MemoList />
      </FadeInStagger>
    </Container>
  );
}
