/**
 * /api/memos
 *
 * GET: 全件のメモを取得
 * POST: メモを登録
 * DELETE: メモを削除
 */

import { PrismaClient, Memo } from "@prisma/client";

const prisma = new PrismaClient();

const headers = { "content-type": "application/json;charset=UTF-8" };

export async function GET(req: Request) {
  console.log(`GET /api/memos called. req: ${req}`);
  try {
    const memos: Memo[] = await prisma.memo.findMany();

    return new Response(JSON.stringify(memos), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Unable to fetch memos" }), {
      status: 500,
      headers,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  console.log(`POST /api/memos called. req: ${req}`);
  try {
    const body = await req.json();
    console.log(`req.json(): ${JSON.stringify(body)}`);

    const memo: Memo = await prisma.memo.create({
      data: body,
    });

    return new Response(JSON.stringify(memo), { status: 200, headers });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Unable to create memo." }), {
      status: 500,
      headers,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request) {
  console.log(`DELETE /api/memos called. req: ${req}`);
  try {
    const body = await req.json();
    console.log(`req.json(): ${JSON.stringify(body)}`);

    if (body === undefined || body.id === undefined) {
      return new Response(
        JSON.stringify({ error: "ID is required to delete memo." }),
        { status: 400, headers },
      );
    }

    const memo: Memo = await prisma.memo.delete({
      where: {
        id: body.id,
      },
    });

    return new Response(JSON.stringify(memo), { status: 200, headers });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Unable to delete memo." }), {
      status: 500,
      headers,
    });
  } finally {
    await prisma.$disconnect();
  }
}
