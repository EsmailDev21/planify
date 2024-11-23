"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PiSortAscendingDuotone,
  PiFolderPlusDuotone,
  PiFilePlusDuotone,
  PiUploadDuotone,
  PiXLight,
  PiTrashDuotone,
  PiFileDuotone,
  PiFileLight,
} from "react-icons/pi";
import { RootState } from "@/lib/redux/store";
import {
  createFile,
  createFolder,
  setSearchQuery,
  sortEntities,
} from "@/lib/redux/slices/fileSystemSlice";
import { FileType, FolderType } from "@/lib/types/models";
import Breadcrumb from "./Breadcrumb";
import { generateRandomColor } from "../tasks/views/GanttTask.component";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { textExtensions } from "@/lib/mock/extensions";
import { Progress } from "@/components/ui/progress";
import { fileIcons } from "@/lib/mock/fileIcons";
import { cn } from "@/lib/utils";
const getFileIcon = (extension: string) => {
  const fileType = fileIcons[extension as keyof typeof fileIcons] || {
    duotone: PiFileDuotone,
    light: PiFileLight,
    color: "text-gray-500",
  };

  const Icon = fileType.duotone;
  const classNames = cn("h-5 w-5", fileType.color);

  return <Icon className={classNames} />;
};
const FileManagerHeader: React.FC = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    sortBy: "Name",
    fileType: "All",
    search: "",
  });

  const currentFolderId = useSelector(
    (state: RootState) => state.fileManager.currentFolderId
  );
  const entities = useSelector(
    (state: RootState) => state.fileManager.entities
  );

  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isCreateFileOpen, setIsCreateFileOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileMetadata, setFileMetadata] = useState<
    {
      name: string;
      extension: string;
      size: number;
      content: string | ArrayBuffer | null;
    }[]
  >([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSort = (sortBy: any) => {
    setFilters({ ...filters, sortBy });
    dispatch(sortEntities(sortBy));
  };

  const handleFilterByType = (fileType: string) => {
    setFilters({ ...filters, fileType });
  };

  const handleClearFilters = () => {
    setFilters({ sortBy: "Name", fileType: "All", search: "" });
    dispatch(setSearchQuery(""));
  };

  const handleCreateFolder = () => {
    if (!folderName) return;
    const newFolder: FolderType = {
      id: `folder-${Date.now()}`,
      name: folderName,
      type: "folder",
      parentFolderId: currentFolderId,
      children: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
    dispatch(createFolder(newFolder));
    setIsCreateFolderOpen(false);
    setFolderName("");
  };
  const handleUploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);

    // Read content of text files
    const fileMetadataWithContent = files.map((file) => {
      const reader = new FileReader();

      return new Promise<FileType>((resolve) => {
        reader.onload = () => {
          const content = reader.result as string;
          resolve({
            id: `file-${Date.now()}-${file.name}`,
            name: file.name,
            extension: file.name.split(".").pop() || "",
            size: file.size,
            type: "file",
            createdAt: new Date(),
            modifiedAt: new Date(),
            parentFolderId: currentFolderId,
            content, // Store the file content as a string
          });
        };

        reader.readAsText(file); // For text-based files, you can use readAsText
      });
    });

    Promise.all(fileMetadataWithContent).then((filesWithContent) => {
      setFileMetadata(filesWithContent);
    });
  };
  const handleUpload = () => {
    selectedFiles.forEach((file, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10; // Increment progress
        setUploadProgress((prev) => [...prev, progress]);

        if (progress >= 100) {
          clearInterval(interval); // Clear interval when upload completes
        }
      }, 300);

      const reader = new FileReader();

      // Determine the file extension
      const extension = file.name.split(".").pop()?.toLowerCase() || "unknown";

      reader.onload = () => {
        const fileContent = textExtensions.includes(extension)
          ? (reader.result as string) // Read as plain text
          : reader.result; // Read as Base64 for binary files

        const uploadData = {
          name: file.name,
          extension,
          size: file.size,
          file, // Original file object
          folderId: currentFolderId,
          content: fileContent, // Store the file content here
        };

        dispatch(
          createFile({
            ...uploadData,
            id: `file-${Date.now()}-${index}`,
            createdAt: new Date(),
            modifiedAt: new Date(),
            parentFolderId: uploadData.folderId,
            type: "file",
          })
        );
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      if (textExtensions.includes(extension)) {
        reader.readAsText(file); // Read as plain text
      } else {
        reader.readAsDataURL(file); // Read as Base64 for binary files
      }
    });

    setIsUploadOpen(false);
  };

  function handleRemoveFile(index: number): void {
    fileMetadata.filter((_, i) => index != i);
  }

  return (
    <div className="flex flex-col bg-inherit  items-start flex-wrap w-full gap-2 p-2 rounded-lg mb-4">
      {/* Breadcrumb */}
      <Breadcrumb currentFolderId={currentFolderId} entities={entities} />

      {/* Sort and Filter Options */}
      <div className="flex flex-wrap w-full items-center justify-between gap-4 p-4 border border-muted rounded-lg shadow-md mb-4">
        {/* Sort dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <PiSortAscendingDuotone className="w-5 h-5" />
              <span>Sort: {filters.sortBy}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => handleSort("Name")}>
              Name
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSort("Date")}>
              Date
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSort("Size")}>
              Size
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Filter by type dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Type: {filters.fileType}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => handleFilterByType("All")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleFilterByType("File")}>
              Files
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleFilterByType("Folder")}>
              Folders
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search input */}
        <Input
          type="text"
          placeholder="Search files and folders..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-60 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md"
        />

        {/* Clear Filters Button */}
        <Button
          onClick={handleClearFilters}
          variant="ghost"
          className="flex items-center space-x-2"
        >
          <PiXLight className="w-5 h-5" />
          <span>Clear</span>
        </Button>

        {/* Action Buttons */}
        <div className="flex flex-row space-x-2">
          <Button
            onClick={() => setIsCreateFolderOpen(true)}
            className="flex items-center space-x-2"
          >
            <PiFolderPlusDuotone className="w-5 h-5" />
            <span>New Folder</span>
          </Button>

          <Button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center space-x-2"
          >
            <PiUploadDuotone className="w-5 h-5" />
            <span>Upload</span>
          </Button>
        </div>
      </div>

      {/* Create Folder Modal */}
      <Dialog open={isCreateFolderOpen}>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Create New Folder</DialogTitle>
          <Input
            type="text"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="w-full mb-4"
          />
          <div className="flex space-x-2">
            <Button onClick={handleCreateFolder}>Create Folder</Button>
            <Button
              onClick={() => setIsCreateFolderOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Modal */}
      <Dialog open={isUploadOpen}>
        <DialogOverlay className="fixed inset-0  bg-opacity-50" />
        <DialogContent className="w-full max-w-lg mx-auto rounded-lg shadow-lg p-6 overflow-y-auto h-4/5">
          <DialogTitle className="text-lg font-semibold text-gray-800 mb-4">
            Upload Files
          </DialogTitle>
          <div className="mb-4">
            <label
              htmlFor="file-upload"
              className="block w-full cursor-pointer rounded-md border border-dashed border-gray-300 p-4 text-center text-gray-500 hover:border-gray-400"
            >
              Drag and drop files here, or click to select files
            </label>
            <Input
              id="file-upload"
              type="file"
              onChange={handleUploadFileChange}
              multiple
              className="hidden"
            />
          </div>
          <div className="space-y-4">
            {fileMetadata.length > 0 ? (
              fileMetadata.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between  p-3 rounded-md shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10  rounded-md">
                      {getFileIcon(file.extension)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {file.size <= 1024
                          ? `${file.size} Bytes`
                          : file.size <= 1024 * 1024
                          ? `${(file.size / 1024).toFixed(2)} KB`
                          : `${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {uploadProgress[index] && (
                      <div className="w-20">
                        <Progress value={uploadProgress[index]} />
                      </div>
                    )}
                    <Button
                      onClick={() => handleRemoveFile(index)}
                      variant={"destructive"}
                      aria-label="Remove file"
                    >
                      <PiTrashDuotone className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No files selected yet.</p>
            )}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <Button onClick={handleUpload} disabled={fileMetadata.length === 0}>
              Upload
            </Button>
            <Button onClick={() => setIsUploadOpen(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileManagerHeader;
