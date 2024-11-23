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
import { FileType, FolderType } from "@/lib/types/models";
import { PiEmptyLight } from "react-icons/pi";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const [selectedEntity, setSelectedEntity] = useState<FolderType | FileType>(
    currentFolder
  );

  const handleEntityInfo = (entity: string) => {
    setSelectedEntity(
      shuffledFilesAndFolders.find((i) => i.id === entity) != undefined
        ? (shuffledFilesAndFolders.find((i) => i.id === entity) as
            | FileType
            | FolderType)
        : currentFolder
    );
  };

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
    console.log({ cutted: itemId });
    setCopiedItem(null); // Clear copied item when cutting
  };

  const handleCopy = (itemId: string) => {
    setCopiedItem(itemId);
    console.log({ copied: itemId });
    setCutItem(null); // Clear cut item when copying
  };
  const handlePaste = (targetId: string) => {
    console.log({ target: targetId, cutted: cutItem, copied: copiedItem });

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

      // Check for existing items with the same name in the target folder
      const existingNames = Object.values(entities)
        .map((entity) => entity.name)
        .filter((name) => name.startsWith(copiedEntity.name));

      let newName = copiedEntity.name;
      if (existingNames.includes(newName)) {
        let suffix = 1;
        while (existingNames.includes(`${copiedEntity.name} (${suffix})`)) {
          suffix++;
        }
        newName = `${copiedEntity.name} (${suffix})`;
      }
      console.log(newName);
      // Dispatch the copy action
      if (copiedEntity.type === "file") {
        dispatch(
          createFile({
            ...copiedEntity,
            id: `${copiedEntity.name}-${new Date().toISOString()}`, // Unique ID
            name: newName,
            parentFolderId: targetId,
          })
        );
      } else {
        dispatch(
          createFolder({
            ...copiedEntity,
            id: `${copiedEntity.name}-${new Date().toISOString()}`, // Unique ID
            name: newName,
            parentFolderId: targetId,
          })
        );
      }

      setCopiedItem(null); // Clear copied item after pasting
      toast({
        title: "Item Copied",
        description: `The item "${newName}" has been copied successfully!`,
        variant: "default",
      });
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-screen ">
          <div className="mx-auto flex w-full flex-col items-center  text-center">
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
                      <Button disabled size="sm" className="relative">
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
                          disabled
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
              <div className="grid grid-cols-4 p-4 gap-4 w-full max-h-[500px] overflow-auto">
                {shuffledFilesAndFolders.map((entity) =>
                  entity.type === "folder" ? (
                    <Tooltip key={entity.id}>
                      <TooltipTrigger>
                        <FolderComponent
                          onInfo={handleEntityInfo}
                          isPasteDisabled={
                            copiedItem === null && cutItem === null
                          }
                          isCopied={copiedItem === entity.id}
                          isCutted={cutItem === entity.id}
                          folder={entity as FolderType}
                          onClick={handleFolderClick}
                          onDelete={handleDelete}
                          onRename={handleRename}
                          onDrop={handleDrop}
                          onDragStart={() =>
                            handleDragStart(entity.id, "folder")
                          }
                          onCut={handleCut}
                          onCopy={handleCopy}
                          onPaste={handlePaste}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Drag to move, right-click for options</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip key={entity.id}>
                      <TooltipTrigger>
                        <FileComponent
                          onInfo={handleEntityInfo}
                          isCopied={copiedItem === entity.id}
                          isCutted={cutItem === entity.id}
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Drag to move, right-click for options</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel>Folder Options</ContextMenuLabel>

        <ContextMenuItem
          disabled={cutItem === null && copiedItem === null}
          onClick={() => {
            if (currentFolderId === null) return null;
            else return handlePaste(currentFolderId);
          }}
        >
          Paste
        </ContextMenuItem>
        <ContextMenuSeparator />
      </ContextMenuContent>

      <Sheet
        open={!!selectedEntity}
        onOpenChange={() => setSelectedEntity(currentFolder)}
      >
        <SheetTrigger asChild />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedEntity?.name}</SheetTitle>
            <SheetDescription>
              {selectedEntity?.type === "file"
                ? "File Details"
                : "Folder Details"}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div>
              <p>Type: {selectedEntity?.type}</p>
              <p>
                Last Modified:{" "}
                {selectedEntity?.modifiedAt.toLocaleDateString() || "Unknown"}
              </p>
              {selectedEntity?.type === "file" && (
                <>
                  <p>
                    size:{" "}
                    {selectedEntity?.size <= 1024
                      ? `${selectedEntity.size} Bytes`
                      : selectedEntity.size <= 1024 * 1024
                      ? `${(selectedEntity.size / 1024).toFixed(2)} KB`
                      : `${(selectedEntity.size / (1024 * 1024)).toFixed(
                          2
                        )} MB`}
                  </p>
                  <p>extension: {selectedEntity?.extension}</p>
                </>
              )}
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </ContextMenu>
  );
}
