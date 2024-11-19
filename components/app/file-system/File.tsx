"use client";

import React, { useState } from "react";
import {
  PiFileTextDuotone,
  PiFileJsDuotone,
  PiFileHtmlDuotone,
  PiFileCssDuotone,
  PiFilePdfDuotone,
  PiFileImageDuotone,
  PiFileCodeDuotone,
  PiFileVideoDuotone,
  PiFileAudioDuotone,
  PiFileZipDuotone,
  PiFileDocDuotone,
  PiFileXDuotone,
  PiFilePptDuotone,
  PiFileDuotone,
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
  onDragStart: (fileId: string) => void; // Handle drag start
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
}: FileProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(file.name);

  const getFileIcon = () => {
    switch (file.extension) {
      case "txt":
        return <PiFileTextDuotone className="h-16 w-16 text-green-500" />;
      case "js":
        return <PiFileJsDuotone className="h-16 w-16 text-yellow-500" />;
      case "html":
        return <PiFileHtmlDuotone className="h-16 w-16 text-orange-500" />;
      case "css":
        return <PiFileCssDuotone className="h-16 w-16 text-blue-500" />;
      case "pdf":
        return <PiFilePdfDuotone className="h-16 w-16 text-red-500" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "svg":
        return <PiFileImageDuotone className="h-16 w-16 text-purple-500" />;
      case "json":
      case "xml":
        return <PiFileCodeDuotone className="h-16 w-16 text-cyan-500" />;
      case "mp4":
      case "avi":
      case "mov":
      case "mkv":
        return <PiFileVideoDuotone className="h-16 w-16 text-teal-500" />;
      case "mp3":
      case "wav":
      case "aac":
        return <PiFileAudioDuotone className="h-16 w-16 text-indigo-500" />;
      case "zip":
      case "rar":
      case "7z":
        return <PiFileZipDuotone className="h-16 w-16 text-gray-500" />;
      case "doc":
      case "docx":
        return <PiFileDocDuotone className="h-16 w-16 text-blue-600" />;
      case "xls":
      case "xlsx":
        return <PiFileXDuotone className="h-16 w-16 text-green-600" />;
      case "ppt":
      case "pptx":
        return <PiFilePptDuotone className="h-16 w-16 text-red-600" />;
      default:
        return <PiFileDuotone className="h-16 w-16 text-gray-500" />;
    }
  };

  const handleRename = () => {
    if (isRenaming) {
      onRename(file.id, newName);
    }
    setIsRenaming(!isRenaming);
  };

  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("text", file.id); // Storing the file ID for drag-and-drop
    onDragStart(file.id); // Call the onDragStart handler
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const draggedItemId = event.dataTransfer.getData("text");
    onDrop(file.id, draggedItemId); // Pass the dropped file and the dragged file ID
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Allow the drop
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger draggable onDragStart={handleDragStart} asChild>
        <div
          className="flex flex-col items-center p-2 border border-muted rounded-lg cursor-pointer"
          onDragOver={handleDragOver} // Allow dragging over the file component
          onDrop={handleDrop} // Handle the drop event
        >
          {getFileIcon()}
          {isRenaming ? (
            <Input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mt-2 p-1 border-b border-muted bg-transparent text-center"
              autoFocus
            />
          ) : (
            <p className="mt-2">{file.name}</p>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel>File Options</ContextMenuLabel>
        <ContextMenuItem onClick={() => onDelete(file.id)}>
          Delete
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onCopy(file.id)}>Copy</ContextMenuItem>
        <ContextMenuItem onClick={() => onCut(file.id)}>Cut</ContextMenuItem>
        <ContextMenuItem onClick={handleRename}>
          {isRenaming ? "Save" : "Rename"}
        </ContextMenuItem>
        <ContextMenuSeparator />
      </ContextMenuContent>
    </ContextMenu>
  );
}
