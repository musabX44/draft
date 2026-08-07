import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../server/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { id } = req.query;
  const { cardId, fromColumnId, toColumnId, toIndex } = req.body;

  // Update card's column and order; naive approach
  try {
    await prisma.$transaction(async (tx) => {
      // decrement orders in source column for items after removed index is skipped for simplicity
      // set card's columnId and order = toIndex
      await tx.card.update({
        where: { id: cardId },
        data: { columnId: toColumnId, order: toIndex }
      });
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Move failed" });
  }
}
