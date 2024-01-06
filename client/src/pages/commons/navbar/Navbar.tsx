import {useNavigate, useLocation} from "react-router-dom";
import {cn} from "@/lib/utils.ts";
import NavSearch from "@/src/pages/commons/navbar/NavSearch.tsx";
import {Sheet, SheetContent, SheetHeader, SheetTrigger} from "@/components/ui/sheet.tsx";
import Sidebar from "@/src/pages/commons/Sidebar/Sidebar.tsx";


const Navbar = () => {
    const pathname = useLocation().pathname;

    return (
        <div
            className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container grid grid-cols-1 md:grid-cols-2 h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <LogFitLogo/>
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
                <div className="flex justify-end items-center">
                    <Sheet>
                        <SheetTrigger className="inline-flex md:hidden cursor-pointer">
                            <HamburgerIcon/>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <LogFitLogo/>
                            </SheetHeader>
                            <div className="ml-12">
                                <Sidebar/>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <NavSearch/>
                </div>
            </div>
        </div>
    );
};

const LogFitLogo = () => {
    const navigate = useNavigate();
    return (
        <div className="mr-4 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logfit.png" alt="logo" className="h-8"/>
            <h1 className="text-center sm:inline-block text-xl font-bold">Log</h1>
            <h1 className="text-center sm:inline-block text-xl font-bold text-indigo-600">Fit</h1>
        </div>
    )
}

const HamburgerIcon = () => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <line x1="3" y1="12" x2="14" y2="12"/>
            <line x1="3" y1="6" x2="10" y2="6"/>
            <line x1="3" y1="18" x2="18" y2="18"/>
        </svg>
    )
};

export default Navbar;
