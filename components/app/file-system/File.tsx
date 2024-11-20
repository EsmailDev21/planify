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
  PiFileTextLight,
  PiFileLight,
  PiFilePptLight,
  PiFileXLight,
  PiFileDocLight,
  PiFileZipLight,
  PiFileAudioLight,
  PiFileVideoLight,
  PiFileJsLight,
  PiFileHtmlLight,
  PiFileCssLight,
  PiFilePdfLight,
  PiFileImageLight,
  PiFileCodeLight,
  PiFileTsLight,
  PiFileTsDuotone,
  PiFileTsxLight,
  PiFileTsxDuotone,
  PiFileCsvLight,
  PiFileCsvDuotone,
  PiFileJpgLight,
  PiFileJpgDuotone,
  PiFilePngLight,
  PiFilePngDuotone,
  PiFileXlsLight,
  PiFileXlsDuotone,
  PiFileJsxLight,
  PiFileJsxDuotone,
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
}: FileProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(file.name);
  const getFileIcon = () => {
    const getClassNames = (baseColor: string) =>
      cn(`h-16 w-16 ${baseColor}`, isCutted && "text-opacity-70");

    switch (file.extension) {
      case "txt":
        return isCopied ? (
          <PiFileTextLight className="h-16 w-16 text-green-500" />
        ) : (
          <PiFileTextDuotone className={getClassNames("text-green-500")} />
        );
      case "js":
        return isCopied ? (
          <PiFileJsLight className="h-16 w-16 text-yellow-500" />
        ) : (
          <PiFileJsDuotone className={getClassNames("text-yellow-500")} />
        );
      case "jsx":
        return isCopied ? (
          <PiFileJsxLight className="h-16 w-16 text-yellow-500" />
        ) : (
          <PiFileJsxDuotone className={getClassNames("text-yellow-500")} />
        );
      case "html":
        return isCopied ? (
          <PiFileHtmlLight className="h-16 w-16 text-orange-500" />
        ) : (
          <PiFileHtmlDuotone className={getClassNames("text-orange-500")} />
        );
      case "css":
        return isCopied ? (
          <PiFileCssLight className="h-16 w-16 text-blue-500" />
        ) : (
          <PiFileCssDuotone className={getClassNames("text-blue-500")} />
        );
      case "pdf":
        return isCopied ? (
          <PiFilePdfLight className="h-16 w-16 text-red-500" />
        ) : (
          <PiFilePdfDuotone className={getClassNames("text-red-500")} />
        );
      case "jpg":
      case "jpeg":
        return isCopied ? (
          <PiFileJpgLight className="h-16 w-16 text-purple-500" />
        ) : (
          <PiFileJpgDuotone className={getClassNames("text-purple-500")} />
        );
      case "png":
        return isCopied ? (
          <PiFilePngLight className="h-16 w-16 text-purple-500" />
        ) : (
          <PiFilePngDuotone className={getClassNames("text-purple-500")} />
        );
      case "gif":
      case "bmp":
      case "svg":
        return isCopied ? (
          <PiFileImageLight className="h-16 w-16 text-purple-500" />
        ) : (
          <PiFileImageDuotone className={getClassNames("text-purple-500")} />
        );
      case "json":
      case "xml":
        return isCopied ? (
          <PiFileCodeLight className="h-16 w-16 text-cyan-500" />
        ) : (
          <PiFileCodeDuotone className={getClassNames("text-cyan-500")} />
        );
      case "mp4":
      case "avi":
      case "mov":
      case "mkv":
        return isCopied ? (
          <PiFileVideoLight className="h-16 w-16 text-teal-500" />
        ) : (
          <PiFileVideoDuotone className={getClassNames("text-teal-500")} />
        );
      case "mp3":
      case "wav":
      case "aac":
        return isCopied ? (
          <PiFileAudioLight className="h-16 w-16 text-indigo-500" />
        ) : (
          <PiFileAudioDuotone className={getClassNames("text-indigo-500")} />
        );
      case "zip":

      case "rar":
      case "7z":
        return isCopied ? (
          <PiFileZipLight className="h-16 w-16 text-gray-500" />
        ) : (
          <PiFileZipDuotone className={getClassNames("text-gray-500")} />
        );
      case "doc":
      case "docx":
        return isCopied ? (
          <PiFileDocLight className="h-16 w-16 text-blue-600" />
        ) : (
          <PiFileDocDuotone className={getClassNames("text-blue-600")} />
        );
      case "xls":
        return isCopied ? (
          <PiFileXLight className="h-16 w-16 text-green-600" />
        ) : (
          <PiFileXDuotone className={getClassNames("text-green-600")} />
        );
      case "xlsx":
        return isCopied ? (
          <PiFileXlsLight className="h-16 w-16 text-green-600" />
        ) : (
          <PiFileXlsDuotone className={getClassNames("text-green-600")} />
        );
      case "ppt":
      case "pptx":
        return isCopied ? (
          <PiFilePptLight className="h-16 w-16 text-red-600" />
        ) : (
          <PiFilePptDuotone className={getClassNames("text-red-600")} />
        );
      case "ts":
        return isCopied ? (
          <PiFileTsLight className="h-16 w-16 text-blue-600" />
        ) : (
          <PiFileTsDuotone className={getClassNames("text-blue-600")} />
        );
      case "tsx":
        return isCopied ? (
          <PiFileTsxLight className="h-16 w-16 text-blue-600" />
        ) : (
          <PiFileTsxDuotone className={getClassNames("text-blue-600")} />
        );
      case "csv":
        return isCopied ? (
          <PiFileCsvLight className="h-16 w-16 text-emerald-600" />
        ) : (
          <PiFileCsvDuotone className={getClassNames("text-emerald-600")} />
        );
      default:
        return isCopied ? (
          <PiFileLight className="h-16 w-16 text-gray-500" />
        ) : (
          <PiFileDuotone className={getClassNames("text-gray-500")} />
        );
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
          className={`flex flex-col h-52 items-center p-2 border border-muted rounded-lg cursor-pointer  ${
            isCutted && "border-dashed border-green-400 border-2"
          } ${isCopied && "border-opacity-70 border-2 border-indigo-500"}`}
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
            <p className="mt-2 text-center truncate w-full" title={file.name}>
              {file.name}
            </p>
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
