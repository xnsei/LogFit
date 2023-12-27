import {useNavigate, useLocation} from "react-router-dom";
import {cn} from "@/lib/utils.ts";
import NavSearch from "@/src/pages/commons/navbar/NavSearch.tsx";


const Navbar = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    return (
        <div
            className=" sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container grid grid-cols-1 md:grid-cols-2 h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <div className="mr-4 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <img src="/logfit.png" alt="logo" className="h-8"/>
                        <h1 className="text-center sm:inline-block text-xl font-bold">Log</h1>
                        <h1 className="text-center sm:inline-block text-xl font-bold text-indigo-600">Fit</h1>
                    </div>
                    <nav className="flex items-center gap-6 text-sm">
                        <a
                            href={"/"}
                            className={cn(
                                "transition-colors hover:text-foreground/80 hidden lg:inline-flex",
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
                    </nav>
                </div>
                <div className="flex justify-end">
                    <NavSearch/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
