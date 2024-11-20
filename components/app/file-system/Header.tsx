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
      content: string;
    }[]
  >([]);

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
      const uploadData = {
        name: fileMetadata[index].name,
        extension: fileMetadata[index].extension,
        size: fileMetadata[index].size,
        file,
        folderId: currentFolderId,
        content: fileMetadata[index].content,
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
    });
    setIsUploadOpen(false);
  };

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
        <DialogOverlay />
        <DialogContent className="h-4/5 overflow-y-auto">
          <DialogTitle>Upload Files</DialogTitle>
          <Input
            type="file"
            onChange={handleUploadFileChange}
            multiple
            className="file-input"
          />
          <div className="mt-4">
            {fileMetadata.map((file, index) => (
              <div key={index} className="mb-2">
                <span>{file.name}</span>
                <span className="ml-4">{file.size} bytes</span>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleUpload}>Upload</Button>
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
