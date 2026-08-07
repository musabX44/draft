import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

type Card = { id: string; title: string; content?: string };
type Column = { id: string; title: string; cards: Card[] };

export default function BoardView({ columns, onDragEnd }: { columns: Column[]; onDragEnd: (res: DropResult) => void }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-auto py-4">
        {columns.map((col, i) => (
          <div key={col.id} className="w-80 bg-white rounded shadow p-3 flex-shrink-0">
            <h3 className="font-semibold mb-2">{col.title}</h3>
            <Droppable droppableId={col.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[50px]">
                  {col.cards.map((card, idx) => (
                    <Draggable draggableId={card.id} index={idx} key={card.id}>
                      {(prov) => (
                        <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} className="p-3 mb-2 bg-gray-50 rounded border">
                          <div className="font-medium">{card.title}</div>
                          <div className="text-xs text-gray-500">{card.content}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
