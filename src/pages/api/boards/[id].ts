import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    const board = await prisma.board.findUnique({
      where: { id: String(id) },
      include: {
        columns: { include: { cards: true }, orderBy: { order: "asc" } }
      }
    });

    if (!board) return res.status(404).json({ error: "Board not found" });

    const columns = board.columns.map(c => ({
      id: c.id,
      title: c.title,
      cards: c.cards.map(card => ({ id: card.id, title: card.title, content: card.content }))
    }));

    return res.json({ id: board.id, title: board.title, columns });
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
