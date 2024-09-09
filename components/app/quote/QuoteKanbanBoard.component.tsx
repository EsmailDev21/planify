import React, { useState } from "react";
import { QuoteModel, QuoteStatus } from "@/lib/types/models";
import { DroppableColumn } from "./KanbanDroppableColumn.component";
import QuoteCard from "./QuoteCard.component";
import { selectQuotes, updateQuote } from "@/lib/redux/slices/quoteSlice";
import { useDispatch, useSelector } from "react-redux";

// Define status labels for the Kanban columns
const statusLabels: Record<QuoteStatus, string> = {
  [QuoteStatus.PENDING]: "Pending",
  [QuoteStatus.ACCEPTED]: "Accepted",
  [QuoteStatus.REJECTED]: "Rejected",
};

// Mapping from sortable IDs to statuses
const idToStatus: Record<string, QuoteStatus> = {
  "Sortable-0": QuoteStatus.PENDING,
  "Sortable-1": QuoteStatus.ACCEPTED,
  "Sortable-2": QuoteStatus.REJECTED,
};

const KanbanBoard: React.FC = () => {
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const { quotes } = useSelector(selectQuotes);
  const dispatch = useDispatch();

  // Group quotes by status
  const quotesByStatus = {
    [QuoteStatus.PENDING]: quotes.filter(
      (q) => q.status === QuoteStatus.PENDING
    ),
    [QuoteStatus.ACCEPTED]: quotes.filter(
      (q) => q.status === QuoteStatus.ACCEPTED
    ),
    [QuoteStatus.REJECTED]: quotes.filter(
      (q) => q.status === QuoteStatus.REJECTED
    ),
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setDraggingItemId(event.currentTarget.getAttribute("data-id"));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Allow drop
    const targetColumnId = event.currentTarget.getAttribute("data-id");
    setActiveColumnId(targetColumnId || null);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    const targetColumnId = event.currentTarget.getAttribute("data-id");
    if (activeColumnId === targetColumnId) {
      setActiveColumnId(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default behavior
    console.log("dropping");
    const targetColumnId = event.currentTarget.getAttribute("data-id");

    console.log({ targetColumnId, activeColumnId, draggingItemId });
    if (activeColumnId && draggingItemId && targetColumnId) {
      const sourceStatus = idToStatus[activeColumnId];
      const destinationStatus = idToStatus[targetColumnId];

      console.log({ sourceStatus, destinationStatus });

      // Find the quote being dragged
      const quote = quotes.find((q) => q.id === draggingItemId);

      if (quote) {
        // Update the quote's status if moved to a different column
        dispatch(
          updateQuote({
            ...quote,
            status: destinationStatus,
          })
        );
      }

      // Reset dragging state
      setDraggingItemId(null);
      setActiveColumnId(null);
    }
  };

  const handleDragEnd = () => {
    setDraggingItemId(null);
    setActiveColumnId(null);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {Object.entries(quotesByStatus).map(([status, quotes]) => (
        <DroppableColumn
          key={status}
          id={`Sortable-${status}`}
          label={statusLabels[status as unknown as QuoteStatus]}
          isActive={activeColumnId === `Sortable-${status}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        >
          {quotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </DroppableColumn>
      ))}
    </div>
  );
};

export default KanbanBoard;
