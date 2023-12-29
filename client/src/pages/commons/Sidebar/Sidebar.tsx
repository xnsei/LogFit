import {cn} from "@/lib/utils.ts";
import {useLocation} from "react-router-dom";

const Sidebar = () => {
    const pathname = useLocation().pathname;
    return (
        <div className="flex flex-col w-full text-center space-y-2">
            <p className="text-foreground/60">QUICK LINKS</p>
            <a
                href={"/"}
                className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/" ? "text-foreground" : "text-foreground/60"
                )}>
                Overview
            </a>
            <a
                href={"/weights"}
                className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/weights" ? "text-foreground" : "text-foreground/60"
                )}>
                Weights
            </a>
            <a
                href={"/workouts"}
                className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/workouts" ? "text-foreground" : "text-foreground/60"
                )}>
                Workouts
            </a>
            <a
                href={"/exercises"}
                className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/exercises" ? "text-foreground" : "text-foreground/60"
                )}>
                Exercises
            </a>
        </div>
    );
};

export default Sidebar;
