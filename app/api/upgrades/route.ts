/**
 * /api/upgrade
 *
 * GET: すべての合成結果を取得（今は最新 50 件にしている）
 * POST: 合成結果を登録: 単純に Upgrade をそのまま受け取る
 */
import { Upgrade, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const headers = { "content-type": "application/json;charset=UTF-8" };

export async function GET(req: Request) {
  console.log(`GET /api/upgrade called. req: ${req}`);
  try {
    const upgrades: Upgrade[] = await prisma.upgrade.findMany(
      // 登録された日時が新しい順に 50 件まで取得
      {
        orderBy: {
          registeredAt: "desc",
        },
        take: 50,
      },
    );

    return new Response(JSON.stringify(upgrades), {
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

export async function POST(req: Request) {
  console.log(`POST /api/upgrade called. req: ${req}`);
  try {
    const body = await req.json();
    console.log(`req.json(): ${JSON.stringify(body)}`);

    if (body.registeredAt === undefined) {
      body.registeredAt = new Date();
    }
    const upgrade: Upgrade = await prisma.upgrade.create({
      data: body,
    });

    return new Response(JSON.stringify(upgrade), { status: 200, headers });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Unable to create upgrade" }), {
      status: 500,
      headers,
    });
  } finally {
    await prisma.$disconnect();
  }
}
