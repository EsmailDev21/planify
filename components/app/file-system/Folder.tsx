"use client";

import React, { useEffect, useRef, useState } from "react";
import { PiFolderDuotone, PiFolderLight } from "react-icons/pi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { FolderType } from "@/lib/types/models";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FolderProps {
  folder: FolderType;
  onClick: (folderId: string) => void;
  onDelete: (folderId: string) => void;
  onRename: (folderId: string, newName: string) => void;
  onDrop: (folderId: string, draggedItemId: string) => void; // To handle drop
  onDragStart: (event: React.DragEvent, entityId: string) => void;
  onCut: (folderId: string) => void;
  onCopy: (folderId: string) => void;
  onPaste: (folderId: string) => void;
  isCopied: boolean;
  isCutted: boolean;
  isPasteDisabled: boolean; // Added to handle drag start
}

export function FolderComponent({
  folder,
  onClick,
  onDelete,
  onRename,
  onDrop,
  onDragStart,
  onCut,
  onCopy,
  onPaste,
  isCopied,
  isCutted,
  isPasteDisabled, // Received the new prop
}: FolderProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  const [isDraggingOver, setIsDraggingOver] = useState(false); // State to track drag over

  const handleRename = () => {
    if (isRenaming) {
      onRename(folder.id, newName);
    }
    setIsRenaming(!isRenaming);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const draggedItemId = event.dataTransfer.getData("text");
    onDrop(folder.id, draggedItemId);
    setIsDraggingOver(false); // Reset drag over state
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDraggingOver(true); // Set drag over state
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false); // Reset drag over state when the drag leaves
  };

  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("text", folder.id); // Set the dragged item's ID
    onDragStart(event, folder.id); // Trigger the onDragStart prop
  };

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current != null && ref.current.focus();
  }, []);
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          onDoubleClick={() => onClick(folder.id)}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave} // Reset state when drag leaves
          onDragStart={handleDragStart} // Attach onDragStart
          draggable // Make it draggable
          className={`flex flex-col h-52 items-center p-2 border rounded-lg cursor-pointer ${
            isDraggingOver ? "border-blue-500" : "border-muted"
          } ${isCutted && "border-dashed border-green-400 border-2"} ${
            isCopied && "border-opacity-70 border-2 border-indigo-500"
          }`} // Change styles when dragging over
        >
          {isCopied ? (
            <PiFolderDuotone className={"h-16 w-16 text-blue-500"} />
          ) : (
            <PiFolderDuotone
              className={cn(
                `h-16 w-16 text-blue-500`,
                (isCutted || isCopied) && "text-opacity-70"
              )}
            />
          )}
          {isRenaming ? (
            <Input
              ref={ref}
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mt-2 p-1 border-b border-muted bg-transparent text-center"
              autoFocus
            />
          ) : (
            <p className="mt-2">{folder.name}</p>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel>Folder Options</ContextMenuLabel>
        <ContextMenuItem onClick={() => onDelete(folder.id)}>
          Delete
        </ContextMenuItem>
        <ContextMenuItem onClick={handleRename}>
          {isRenaming ? "Save" : "Rename"}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onCut(folder.id)}>Cut</ContextMenuItem>
        <ContextMenuItem onClick={() => onCopy(folder.id)}>
          Copy
        </ContextMenuItem>
        <ContextMenuItem
          disabled={isPasteDisabled}
          onClick={() => onPaste(folder.id)}
        >
          Paste
        </ContextMenuItem>
        <ContextMenuSeparator />
      </ContextMenuContent>
    </ContextMenu>
  );
}
