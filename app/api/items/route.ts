/**
 * /api/items
 *
 * GET: 全件のアイテムを取得
 * POST: アイテムを登録
 * DELETE: アイテムを削除
 */

import { PrismaClient, Item, ItemRank } from "@prisma/client";

const prisma = new PrismaClient();

const headers = { "content-type": "application/json;charset=UTF-8" };

export type IncludedItem = Item & {
  rank: ItemRank;
};

export async function GET(req: Request) {
  console.log(`GET /api/items called. req: ${req}`);
  try {
    const items: IncludedItem[] = await prisma.item.findMany(
      // 全件取得
      {
        include: {
          rank: true,
        },
      },
    );

    return new Response(JSON.stringify(items), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Unable to fetch items" }), {
      status: 500,
      headers,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  console.log(`POST /api/items called. req: ${req}`);
  try {
    const body = await req.json();
    console.log(`req.json(): ${JSON.stringify(body)}`);

    const item: Item = await prisma.item.create({
      data: body,
    });

    return new Response(JSON.stringify(item), { status: 200, headers });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Unable to create item." }), {
      status: 500,
      headers,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request) {
  console.log(`DELETE /api/item called. req: ${req}`);
  try {
    const body = await req.json();
    console.log(`req.json(): ${JSON.stringify(body)}`);

    if (body === undefined || body.id === undefined) {
      return new Response(
        JSON.stringify({ error: "ID is required to delete item." }),
        { status: 400, headers },
      );
    }

    const item: Item = await prisma.item.delete({
      where: {
        id: body.id,
      },
    });

    return new Response(JSON.stringify(item), { status: 200, headers });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Unable to delete item." }), {
      status: 500,
      headers,
    });
  } finally {
    await prisma.$disconnect();
  }
}
