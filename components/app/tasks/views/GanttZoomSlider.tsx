// VerticalZoomSlider.tsx
"use client";
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

type VerticalZoomSliderProps = {
  onZoomChange: (zoomLevel: number) => void;
};

const VerticalZoomSlider: React.FC<VerticalZoomSliderProps> = ({
  onZoomChange,
}) => {
  const [zoomLevel, setZoomLevel] = useState(6); // Default zoom level

  const handleZoomChange = (value: number[]) => {
    const newZoomLevel = value[0]; // Get the zoom level from slider value
    setZoomLevel(newZoomLevel);
    onZoomChange(newZoomLevel);
  };

  return (
    <div className="flex items-center space-x-2 p-4">
      <span className="text-sm ">Zoom</span>
      <Slider
        value={[zoomLevel]}
        onValueChange={handleZoomChange}
        min={1}
        max={10}
        step={1}
        className="w-48" // Adjust the height as needed
      />
      <span className="text-sm ">{zoomLevel}</span>
    </div>
  );
};

export default VerticalZoomSlider;
