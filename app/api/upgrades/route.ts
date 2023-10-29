/**
 * /api/upgrade
 *
 * GET: すべての合成結果を取得（今は最新 50 件にしている, includedUpgrade[] を返す）
 * POST: 合成結果を登録: 単純に Upgrade をそのまま受け取る
 * DELETE: 合成結果を削除: Upgrade の ID を受け取る: { id: number }
 */
import {
  Upgrade,
  PrismaClient,
  ItemRank,
  UpgradeResultType,
} from "@prisma/client";

const prisma = new PrismaClient();

const headers = { "content-type": "application/json;charset=UTF-8" };

export type IncludedUpgrade = Upgrade & {
  rank: ItemRank;
  resultType: UpgradeResultType;
};

export async function GET(req: Request) {
  console.log(`GET /api/upgrade called. req: ${req}`);
  try {
    const upgrades: IncludedUpgrade[] = await prisma.upgrade.findMany(
      // 登録された日時が新しい順に 50 件まで取得
      {
        orderBy: {
          registeredAt: "desc",
        },
        take: 50,
        include: {
          rank: true,
          resultType: true,
        },
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

export async function DELETE(req: Request) {
  console.log(`DELETE /api/upgrade called. req: ${req}`);
  try {
    const body = await req.json();
    console.log(`req.json(): ${JSON.stringify(body)}`);

    if (body === undefined || body.id === undefined) {
      return new Response(
        JSON.stringify({ error: "ID is required to delete upgrade" }),
        { status: 400, headers },
      );
    }

    const upgrade: Upgrade = await prisma.upgrade.delete({
      where: {
        id: body.id,
      },
    });

    return new Response(JSON.stringify(upgrade), { status: 200, headers });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Unable to delete upgrade" }), {
      status: 500,
      headers,
    });
  } finally {
    await prisma.$disconnect();
  }
}
