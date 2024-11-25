import { useEffect, useRef } from "react";

export const useScrollSync = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.currentTarget as HTMLDivElement;
      if (target === headerRef.current && bodyRef.current) {
        bodyRef.current.scrollLeft = headerRef.current.scrollLeft;
      } else if (target === bodyRef.current && headerRef.current) {
        headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
      }
    };

    headerRef.current?.addEventListener("scroll", handleScroll);
    bodyRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      headerRef.current?.removeEventListener("scroll", handleScroll);
      bodyRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { headerRef, bodyRef };
};
