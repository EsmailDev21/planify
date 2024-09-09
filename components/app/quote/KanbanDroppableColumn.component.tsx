import React from "react";

type DroppableColumnProps = {
  id: string;
  label: any;
  children: React.ReactNode;
  isActive: boolean;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;

  onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => void;
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
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  return (
    <div
      data-id={id}
      className={`p-4 rounded-lg ${
        isActive ? "border-2 border-primary" : "border border-gray-300"
      } bg-gray-100`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
};
