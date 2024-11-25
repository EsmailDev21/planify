import { useState } from "react";

export const useToggle = () => {
  const [isExpanded, setIsExpanded] = useState<string[]>([]);

  const toggle = (id: string) =>
    setIsExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  return { isExpanded, toggle };
};
