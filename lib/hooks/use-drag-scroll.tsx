import { useState, useEffect } from "react";

export const useDragToScroll = (bodyRef: React.RefObject<HTMLDivElement>) => {
  const [isDragging, setIsDragging] = useState(false);
  const [scrollStartX, setScrollStartX] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && bodyRef.current) {
        const deltaX = scrollStartX - event.clientX;
        bodyRef.current.scrollLeft += deltaX;
        setScrollStartX(event.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scrollStartX, bodyRef]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setScrollStartX(event.clientX);
  };

  return { handleMouseDown };
};
