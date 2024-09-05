"use client"
import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Update state based on the initial match
    const updateMatch = () => setMatches(mediaQuery.matches);
    updateMatch();

    // Listen for changes in the media query match status
    mediaQuery.addEventListener("change", updateMatch);

    // Clean up the event listener on component unmount
    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}
