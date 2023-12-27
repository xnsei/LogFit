import {Button} from "@/components/ui/button.tsx";
import {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {cn} from "@/lib/utils.ts";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,

} from "@/components/ui/command.tsx";
import {
    FileIcon,
    MoonIcon,
    ExitIcon,
} from "@radix-ui/react-icons"


const NavSearch = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)

    const runCommand = useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            <Button
                variant="outline"
                className={cn(
                    "relative h-8 mx-2 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
                )}
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">Search...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd
                    className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..."/>
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Links">
                        <CommandItem
                            key="weights"
                            value="Weights"
                            onSelect={() => {
                                runCommand(() => window.location.href = '/weights')
                            }}
                        >
                            <FileIcon className="mr-2 h-4 w-4"/>
                            Weights
                        </CommandItem>
                        <CommandItem
                            key="workouts"
                            value="Workouts"
                            onSelect={() => {
                                runCommand(() => window.location.href = '/workouts')
                            }}
                        >
                            <FileIcon className="mr-2 h-4 w-4"/>
                            Workouts
                        </CommandItem>
                        <CommandItem
                            key="exercises"
                            value="Exercises"
                            onSelect={() => {
                                runCommand(() => window.location.href = '/exercises')
                            }}
                        >
                            <FileIcon className="mr-2 h-4 w-4"/>
                            Exercises
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
            <button className="mx-2">
                <MoonIcon/>
            </button>
            <button className="mx-2" onClick={logOut}>
                <ExitIcon />
            </button>
        </>
    );
}

export default NavSearch;
