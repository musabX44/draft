import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BoardView from "../../components/BoardView";
import axios from "axios";
import { DropResult } from "react-beautiful-dnd";

type Card = { id: string; title: string; content?: string };
type Column = { id: string; title: string; cards: Card[] };

export default function BoardPage() {
  const router = useRouter();
  const { id } = router.query;
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    if (!id) return;
    fetchBoard();
  }, [id]);

  async function fetchBoard() {
    const res = await axios.get(`/api/boards/${id}`);
    setColumns(res.data.columns || []);
  }

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    // optimistic UI update
    const sourceColId = result.source.droppableId;
    const destColId = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    const newCols = JSON.parse(JSON.stringify(columns)) as Column[];
    const src = newCols.find(c => c.id === sourceColId)!;
    const dest = newCols.find(c => c.id === destColId)!;
    const [moved] = src.cards.splice(sourceIndex, 1);
    dest.cards.splice(destIndex, 0, moved);
    setColumns(newCols);

    await axios.post(`/api/boards/${id}/move`, {
      cardId: moved.id,
      fromColumnId: sourceColId,
      toColumnId: destColId,
      toIndex: destIndex
    });
  }

  return (
    <main className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Board</h2>
      <BoardView columns={columns} onDragEnd={onDragEnd} />
    </main>
  );
}
