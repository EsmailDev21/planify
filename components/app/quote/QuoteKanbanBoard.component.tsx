import React, { useState } from "react";
import { Priority, QuoteModel, QuoteStatus, Status } from "@/lib/types/models";
import { DroppableColumn } from "./KanbanDroppableColumn.component";
import QuoteCard from "./QuoteCard.component";
import { selectQuotes, updateQuote } from "@/lib/redux/slices/quoteSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  deleteProject,
  selectProjects,
} from "@/lib/redux/slices/projectSlice";
import { generateRandomAvatar } from "../tasks/views/GanttTask.component";

// Define status labels for the Kanban columns
const statusLabels: Record<QuoteStatus, string> = {
  [QuoteStatus.PENDING]: "En Attente",
  [QuoteStatus.ACCEPTED]: "Accepté",
  [QuoteStatus.REJECTED]: "Réjeté",
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
  const { projects } = useSelector(selectProjects);
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
    setDraggingItemId(event.currentTarget.getAttribute("data-id") || null);
    document.body.classList.add("no-scroll"); // Prevent scrolling
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

    const targetColumnId = event.currentTarget.getAttribute("data-id");
    if (activeColumnId && draggingItemId && targetColumnId) {
      const sourceStatus = idToStatus[activeColumnId];
      const destinationStatus = idToStatus[targetColumnId];

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
        console.log({ destinationStatus, status: idToStatus["Sortable-1"] });
        if (destinationStatus === idToStatus["Sortable-1"]) {
          if (!projects.find((i) => i.title === quote.title)) {
            dispatch(
              addProject({
                address: quote.address,
                id: projects.length.toString(),
                title: quote.title,
                description: quote.description,
                thumbnail: quote.thumbnail,
                client: quote.client,
                tags: [],
                priority: Priority.HIGH,
                status: Status.TODO,
                dueDate: quote.dueDate,
                progress: 0,
                createdAt: new Date(),
                teamMembers: [
                  {
                    fullName: quote.sender.fullName,
                    profilePhoto:
                      "/assets/images/avatars/" +
                      generateRandomAvatar() +
                      ".png",
                  },
                ],
              })
            );
          }
        }
        if (destinationStatus === idToStatus["Sortable-0"]) {
          const id = projects.find((i) => i.title === quote.title)?.id;
          if (id) {
            dispatch(deleteProject(id));
          }
        }
        if (destinationStatus === idToStatus["Sortable-2"]) {
          const id = projects.find((i) => i.title === quote.title)?.id;
          if (id) {
            dispatch(deleteProject(id));
          }
        }
      }

      // Reset dragging state
      setDraggingItemId(null);
      setActiveColumnId(null);
    }

    document.body.classList.remove("no-scroll"); // Re-enable scrolling
  };

  const handleDragEnd = () => {
    setDraggingItemId(null);
    setActiveColumnId(null);
    document.body.classList.remove("no-scroll"); // Re-enable scrolling
  };

  // Touch-specific handlers
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    // Handle touch-specific drag start
    setDraggingItemId(event.currentTarget.getAttribute("data-id") || null);
    document.body.classList.add("no-scroll");
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    // Prevent touch move from scrolling the whole view
    //event.preventDefault();
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    // Handle touch-specific drag end
    const targetColumnId = event.currentTarget.getAttribute("data-id");
    if (activeColumnId && draggingItemId && targetColumnId) {
      const sourceStatus = idToStatus[activeColumnId];
      const destinationStatus = idToStatus[targetColumnId];

      if (sourceStatus !== destinationStatus) {
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
      }
    }

    setDraggingItemId(null);
    setActiveColumnId(null);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div className="grid grid-cols-3 gap-4">
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {quotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          ))}
        </DroppableColumn>
      ))}
    </div>
  );
};

export default KanbanBoard;
