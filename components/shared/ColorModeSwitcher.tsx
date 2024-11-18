import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ColorModeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const switchHandler = () => {
    console.log(theme);
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  return (
    <Button variant="outline" onClick={switchHandler}>
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ColorModeSwitcher;
