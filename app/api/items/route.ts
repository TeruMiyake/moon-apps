/**
 * /api/items
 *
 * GET: 全件のアイテムを取得
 */

import { PrismaClient, Item } from "@prisma/client";

const prisma = new PrismaClient();

const headers = { "content-type": "application/json;charset=UTF-8" };

export async function GET(req: Request) {
  console.log(`GET /api/upgrade called. req: ${req}`);
  try {
    const items: Item[] = await prisma.item.findMany();

    return new Response(JSON.stringify(items), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Unable to fetch upgrades" }), {
      status: 500,
      headers,
    });
  } finally {
    await prisma.$disconnect();
  }
}
