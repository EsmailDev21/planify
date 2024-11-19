// Breadcrumb.tsx

import React from "react";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { FileSystemEntity, FolderType } from "@/lib/types/models";
import { setCurrentFolder } from "@/lib/redux/slices/fileSystemSlice";

interface BreadcrumbProps {
  currentFolderId: string | null;
  entities: Record<string, FileSystemEntity>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentFolderId,
  entities,
}) => {
  const dispatch = useDispatch();

  const getBreadcrumbPath = (folderId: string | null): Array<FolderType> => {
    const path: Array<FolderType> = [];
    let currentId = folderId;
    while (currentId) {
      const folder = entities[currentId] as FolderType;
      if (folder?.type === "folder") {
        path.unshift(folder);
        currentId = folder.parentFolderId;
      } else {
        break;
      }
    }
    return path;
  };

  const path = getBreadcrumbPath(currentFolderId);

  return (
    <div className="flex items-center space-x-2 text-muted-foreground">
      <span
        key={"root"}
        onClick={() => dispatch(setCurrentFolder(null))}
        className={cn(
          "cursor-pointer hover:underline",
          "after:content-['/'] after:mx-2"
        )}
      >
        {"Root"}
      </span>
      {path.map((folder, index) => (
        <span
          key={folder.id}
          onClick={() => dispatch(setCurrentFolder(folder.id))}
          className={cn(
            "cursor-pointer hover:underline",
            index < path.length - 1 && "after:content-['/'] after:mx-2"
          )}
        >
          {folder.name}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
