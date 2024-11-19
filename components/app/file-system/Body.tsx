"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FolderComponent } from "./Folder";
import { FileComponent } from "./File";
import {
  selectCurrentFolderId,
  selectEntities,
  setStatus,
  setCurrentFolder,
  deleteEntity,
  renameEntity,
  moveEntity,
  createFile,
  createFolder, // For copy action
} from "@/lib/redux/slices/fileSystemSlice";
import { RootState } from "@/lib/redux/store";
import { FolderType } from "@/lib/types/models";
import { PiEmptyLight } from "react-icons/pi";

export function FileSystemBody() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const entities = useSelector(selectEntities);
  const statusMessage = useSelector(
    (state: RootState) => state.fileManager.statusMessage
  );
  const statusType = useSelector(
    (state: RootState) => state.fileManager.statusType
  );
  const currentFolderId = useSelector(selectCurrentFolderId);

  const currentFolder = entities[currentFolderId || ""] as FolderType;
  const files = Object.values(entities).filter(
    (entity) =>
      entity.type === "file" && entity.parentFolderId === currentFolderId
  );
  const folders = Object.values(entities).filter(
    (entity) =>
      entity.type === "folder" && entity.parentFolderId === currentFolderId
  );

  const shuffledFilesAndFolders = [...files, ...folders];

  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState("");
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [draggedItemType, setDraggedItemType] = useState<string | null>(null);
  const [cutItem, setCutItem] = useState<string | null>(null); // To store the cut item
  const [copiedItem, setCopiedItem] = useState<string | null>(null); // To store the copied item

  useEffect(() => {
    if (statusMessage) {
      toast({
        title: statusType === "error" ? "Error" : "Success",
        description: statusMessage,
        variant: statusType === "error" ? "destructive" : "default",
      });

      dispatch(setStatus({ message: "", type: "success" }));
    }
  }, [statusMessage, statusType, toast, dispatch]);

  const handleFolderClick = (folderId: string) => {
    dispatch(setCurrentFolder(folderId));
  };

  const handleDelete = (entityId: string) => {
    dispatch(deleteEntity(entityId));
  };

  const handleRename = (entityId: string) => {
    if (isRenaming) {
      dispatch(renameEntity({ id: entityId, newName }));
      setIsRenaming(false);
    } else {
      setIsRenaming(true);
      setNewName(entities[entityId].name); // Get the current name to allow editing
    }
  };

  const handleDrop = (folderId: string) => {
    if (draggedItemId && draggedItemType) {
      dispatch(moveEntity({ id: draggedItemId, newParentFolderId: folderId }));
      setDraggedItemId(null); // Clear the dragged item
      setDraggedItemType(null); // Clear the dragged item type
    }
  };

  const handleDragStart = (entityId: string, entityType: string) => {
    setDraggedItemId(entityId);
    setDraggedItemType(entityType);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow drop
  };

  const handleCut = (itemId: string) => {
    setCutItem(itemId);
    setCopiedItem(null); // Clear copied item when cutting
  };

  const handleCopy = (itemId: string) => {
    setCopiedItem(itemId);
    setCutItem(null); // Clear cut item when copying
  };

  const handlePaste = (targetId: string) => {
    if (cutItem) {
      dispatch(moveEntity({ id: cutItem, newParentFolderId: targetId }));
      setCutItem(null); // Clear cut item after pasting
      toast({
        title: "Item Moved",
        description: "The item has been moved successfully!",
        variant: "default",
      });
    } else if (copiedItem) {
      const copiedEntity = entities[copiedItem];
      copiedEntity.type === "file"
        ? dispatch(
            createFile({
              ...copiedEntity,
              parentFolderId: targetId,
            })
          )
        : dispatch(
            createFolder({
              ...copiedEntity,
              parentFolderId: targetId,
            })
          );
      setCopiedItem(null); // Clear copied item after pasting
      toast({
        title: "Item Copied",
        description: "The item has been copied successfully!",
        variant: "default",
      });
    }
  };

  return (
    <div className="flex h-screen p-4">
      <div className="mx-auto flex w-full flex-col items-center justify-center text-center">
        {shuffledFilesAndFolders.length === 0 ? (
          <div className="flex h-full items-start justify-center rounded-md border border-dashed">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <PiEmptyLight className="h-20 w-20 rounded-full text-muted" />
              <h3 className="mt-4 text-lg font-semibold">
                No files or folders found
              </h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                You have not added any files or folders. Add one below.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="relative">
                    Add File/Folder
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add File/Folder</DialogTitle>
                    <DialogDescription>
                      Upload your file or create a folder below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="file">File/Folder Upload</Label>
                      <Input id="file" type="file" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() =>
                        toast({
                          title: "File/Folder Uploaded",
                          description:
                            "Your file/folder was uploaded successfully!",
                          variant: "default",
                        })
                      }
                    >
                      Upload
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 w-full h-full">
            {shuffledFilesAndFolders.map((entity) =>
              entity.type === "folder" ? (
                <FolderComponent
                  key={entity.id}
                  folder={entity as FolderType}
                  onClick={handleFolderClick}
                  onDelete={handleDelete}
                  onRename={handleRename}
                  onDrop={handleDrop}
                  onDragStart={() => handleDragStart(entity.id, "folder")}
                  onCut={handleCut}
                  onCopy={handleCopy}
                  onPaste={handlePaste}
                />
              ) : (
                <FileComponent
                  key={entity.id}
                  file={entity}
                  onDelete={handleDelete}
                  onRename={handleRename}
                  onDragStart={() => handleDragStart(entity.id, "file")}
                  onCut={handleCut}
                  onCopy={handleCopy}
                  onPaste={handlePaste}
                  onDrag={function (fileId: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  onDrop={function (
                    targetId: string,
                    draggedItemId: string
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
