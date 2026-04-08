import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full w-6 lg:w-10 z-20  h-6 lg:h-10 bg-white dark:bg-gray-200 "
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-blue-800" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-gray-700" />
            )}
        </Button>
    );
};

export default ThemeToggle;
