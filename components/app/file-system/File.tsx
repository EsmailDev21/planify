"use client";

import React, { useState } from "react";
import {
  PiFileDuotone,
  PiFileLight,
  PiPenDuotone,
  PiScissorsDuotone,
  PiInfoDuotone,
  PiCopyDuotone,
  PiXCircleDuotone,
  PiBookOpenDuotone,
} from "react-icons/pi";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuLabel,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import { toggleSelectEntity } from "@/lib/redux/slices/fileSystemSlice";
import { useRouter } from "next/navigation";
import { fileIcons } from "@/lib/mock/fileIcons";

interface FileProps {
  file: {
    id: string;
    name: string;
    extension: string;
  };
  onDelete: (fileId: string) => void;
  onRename: (fileId: string, newName: string) => void;
  onCut: (fileId: string) => void;
  onPaste: (targetId: string) => void;
  onCopy: (fileId: string) => void;
  onDrag: (fileId: string) => void; // Drag event handler
  onDrop: (targetId: string, draggedItemId: string) => void; // Drop event handler
  onDragStart: (fileId: string) => void;
  onInfo: (fileId: string) => void;
  isCopied: boolean;
  isCutted: boolean; // Handle drag start
}

export function FileComponent({
  file,
  onDelete,
  onRename,
  onCopy,
  onCut,
  onPaste,
  onDrag,
  onDrop,
  onDragStart,
  isCopied,
  isCutted,
  onInfo,
}: FileProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [newName, setNewName] = useState(file.name);
  const [isSelected, setIsSelected] = useState(false);
  const getFileIcon = (
    extension: string,
    isCopied: boolean,
    isCutted: boolean
  ) => {
    const fileType = fileIcons[extension as keyof typeof fileIcons] || {
      duotone: PiFileDuotone,
      light: PiFileLight,
      color: "text-gray-500",
    };

    const Icon = isCopied ? fileType.light : fileType.duotone;
    const classNames = cn(
      "h-16 w-16",
      fileType.color,
      isCutted && "text-opacity-70"
    );

    return <Icon className={classNames} />;
  };

  const handleRename = () => {
    if (isRenaming) {
      onRename(file.id, newName);
    }
    setIsRenaming(!isRenaming);
  };
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("text", file.id); // Storing the file ID for drag-and-drop
    onDragStart(file.id); // Call the onDragStart handler
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const draggedItemId = event.dataTransfer.getData("text");
    onDrop(file.id, draggedItemId); // Pass the dropped file and the dragged file ID
  };
  const handleOpen = () => {
    dispatch(toggleSelectEntity(file.id));
    router.push("/app/file-system/file/" + file.id);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Allow the drop
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger
        draggable
        onDragStart={(e) => {
          setIsDragging(true);
          handleDragStart(e);
        }}
        asChild
        onDragEnd={(e) => setIsDragging(false)}
      >
        <div
          className={`flex flex-col h-52 items-center p-2 border  rounded-lg cursor-pointer  ${
            isCutted && "border-dashed border-green-400 border-2"
          } ${isCopied && "border-opacity-70 border-2 border-indigo-500"} ${
            !isCutted && !isCopied && "border-muted"
          } ${isDragging && "scale-105 transition-all duration-300"}`}
          onDragOver={handleDragOver} // Allow dragging over the file component
          onDrop={(e) => {
            setIsDragging(false);
            handleDrop(e);
          }} // Handle the drop event
        >
          <div className="flex w-full justify-between items-center flex-row ">
            <Checkbox
              onClick={() => setIsSelected(!isSelected)}
              checked={isSelected}
              className="self-start"
            />
            <div className="flex flex-col space-y-1">
              {isCutted && (
                <Badge className="self-end bg-green-400">File Cut!</Badge>
              )}
              {isCopied && (
                <Badge className="self-end bg-indigo-500">File Copied!</Badge>
              )}
              {isRenaming && (
                <Badge className="self-end bg-blue-500">Renaming...</Badge>
              )}
              {isDragging && (
                <Badge className="self-end bg-teal-500">Moving...</Badge>
              )}
              {isSelected && (
                <Badge className="self-end bg-cyan-500">File Selected!</Badge>
              )}
            </div>
          </div>

          {getFileIcon(file.extension, isCopied, isCutted)}
          {isRenaming ? (
            <Input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mt-2 p-1 border-b border-muted bg-transparent text-center"
              autoFocus
            />
          ) : (
            <p className="mt-2 text-center truncate w-full" title={file.name}>
              {file.name}
            </p>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64 border-muted">
        <ContextMenuLabel>File Options</ContextMenuLabel>
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          onClick={handleOpen}
        >
          <PiBookOpenDuotone className="" /> <span>Open</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          onClick={() => onCopy(file.id)}
        >
          <PiCopyDuotone /> <span>Copy</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          onClick={() => onCut(file.id)}
        >
          <PiScissorsDuotone /> <span>Cut</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          onClick={handleRename}
        >
          <PiPenDuotone /> <span>{isRenaming ? "Save" : "Rename"}</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          onClick={() => onInfo(file.id)}
        >
          <PiInfoDuotone /> <span>Properties</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex text-sm  text-muted-foreground flex-row space-x-2 items-center"
          onClick={() => onDelete(file.id)}
        >
          <PiXCircleDuotone className="" /> <span>Delete</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
