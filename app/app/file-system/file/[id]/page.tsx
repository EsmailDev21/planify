"use client";
import FileViewer from "@/components/app/file-system/FileViewer";
import { RootState } from "@/lib/redux/store";
import { FileType } from "@/lib/types/models";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const FileIndex = () => {
  const { id } = useParams();
  const selectedFile = useSelector(
    (state: RootState) =>
      state.fileManager.entities[typeof id === "string" ? id : ""] as FileType
  );
  return (
    <div className="min-h-screen">
      <FileViewer
        file={{
          name: selectedFile.name,
          size: selectedFile.size,
          extension: selectedFile.extension,
          previewUrl: selectedFile.content,
          content: selectedFile.content,
        }}
      />
    </div>
  );
};

export default FileIndex;
