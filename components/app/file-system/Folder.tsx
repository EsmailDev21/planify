"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  PiBookOpenDuotone,
  PiCopyDuotone,
  PiFilesDuotone,
  PiFolderDuotone,
  PiFolderLight,
  PiFolderOpenDuotone,
  PiFoldersDuotone,
  PiInfoDuotone,
  PiPenDuotone,
  PiScissorsDuotone,
  PiXCircleDuotone,
} from "react-icons/pi";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

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
  isPasteDisabled: boolean;
  onInfo: (folderId: string) => void; // Added to handle drag start
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
  isPasteDisabled,
  onInfo, // Received the new prop
}: FolderProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  const [isDraggingOver, setIsDraggingOver] = useState(false); // State to track drag over
  const [isDragging, setIsDragging] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
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
    setIsDraggingOver(false);
    setIsDragging(false); // Reset drag over state
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDraggingOver(true); // Set drag over state
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
    setIsDragging(false); // Reset drag over state when the drag leaves
  };

  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("text", folder.id); // Set the dragged item's ID
    onDragStart(event, folder.id);
    setIsDragging(true); // Trigger the onDragStart prop
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
          onDragStart={handleDragStart}
          onDragEnd={(e) => setIsDragging(false)}
          // Attach onDragStart
          draggable // Make it draggable
          className={`flex flex-col h-52 items-center p-2 border rounded-lg cursor-pointer ${
            isDraggingOver
              ? "border-blue-500 border-2 scale-95 transition-all duration-300"
              : "border-muted"
          } ${isCutted && "border-dashed border-green-400 border-2"} ${
            isCopied && "border-opacity-70 border-2 border-indigo-500"
          }`} // Change styles when dragging over
        >
          <div className="flex w-full justify-between items-center flex-row ">
            <Checkbox
              onClick={() => setIsSelected(!isSelected)}
              checked={isSelected}
              className="self-start"
            />
            <div className="flex flex-col space-y-1">
              {isCutted && (
                <Badge className="self-end bg-green-400">Folder Cut!</Badge>
              )}
              {isCopied && (
                <Badge className="self-end bg-indigo-500">Folder Copied!</Badge>
              )}
              {isRenaming && (
                <Badge className="self-end bg-blue-500">Renaming...</Badge>
              )}
              {isDragging && (
                <Badge className="self-end bg-teal-500">Moving...</Badge>
              )}
              {isSelected && (
                <Badge className="self-end bg-cyan-500">Folder Selected!</Badge>
              )}
            </div>
          </div>

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

      <ContextMenuContent className="w-64 border-muted">
        <ContextMenuLabel>Folder Options</ContextMenuLabel>
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          onClick={() => onDelete(folder.id)}
        >
          <PiFolderOpenDuotone className="" /> <span>Open</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          onClick={() => onCopy(folder.id)}
        >
          <PiCopyDuotone /> <span>Copy</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          onClick={() => onCut(folder.id)}
        >
          <PiScissorsDuotone /> <span>Cut</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          onClick={handleRename}
        >
          <PiPenDuotone /> <span>{isRenaming ? "Save" : "Rename"}</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          disabled={isPasteDisabled}
          onClick={() => onPaste(folder.id)}
        >
          <PiFilesDuotone /> <span>Paste</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          onClick={() => onInfo(folder.id)}
        >
          <PiInfoDuotone /> <span>Properties</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          onClick={() => onDelete(folder.id)}
        >
          <PiXCircleDuotone className="" /> <span>Delete</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
