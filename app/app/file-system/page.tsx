import { FileSystemBody } from "@/components/app/file-system/Body";
import FileManagerHeader from "@/components/app/file-system/Header";
import React from "react";

const FileSystemIndex = () => {
  return (
    <div className=" min-h-screen">
      <FileManagerHeader />
      <FileSystemBody />
    </div>
  );
};

export default FileSystemIndex;
