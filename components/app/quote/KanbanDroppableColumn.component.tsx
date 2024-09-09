import React from "react";

type DroppableColumnProps = {
  id: string;
  label: any;
  children: React.ReactNode;
  isActive: boolean;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
};

export const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  label,
  children,
  isActive,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
}) => {
  return (
    <div
      data-id={id}
      className={`p-4 rounded-lg ${
        isActive ? 'border-4 border-blue-500' : 'border border-gray-300'
      } bg-gray-100`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
};
