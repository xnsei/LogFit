import axios from "axios";
import {format} from "date-fns";
import {useState} from "react";
import {io} from "socket.io-client";
import {ExerciseEntryProps} from "./entryProps";
import baseURL from "../../../lib/links.ts";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "@radix-ui/react-icons";
import {Calendar} from "@/components/ui/calendar.tsx";
import * as React from "react";

const socket = io(baseURL);

const EntryForm = (props: ExerciseEntryProps) => {
    const [weight, setWeight] = useState("");
    const [repetitions, setRepetitions] = useState("");
    const [duration, setDuration] = useState("");
    const [date, setDate] = React.useState<Date>();
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const datadate: Date = new Date();
        const formattedDate = format(datadate, "yyyyMMdd");
        try {
            const response = await axios.post(
                `${baseURL}/exercises/${props.exerciseId}/entries/new`,
                {
                    weight: weight,
                    repetitions: repetitions,
                    duration: duration,
                    datadate: formattedDate,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (response.status === 200) {
                socket.emit("addEntry", {});
                console.log("event emitted");
            }
        } catch (error) {
            console.log(error);
        }
        setOpen(false)
    };

    const entryForm = (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="bg-black text-white mt-2 px-4 py-2 rounded no-underline">
                    Add Reps
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-3xl mb-4 font-bold">Add Repetitions</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    {!props.isCardio && <input
                        className="rounded mb-2 h-10 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                        type="number"
                        name="weight"
                        placeholder="Weight"
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />}
                    {!props.isCardio && <input
                        className="rounded mb-2 h-10 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                        type="number"
                        name="repetitions"
                        placeholder="Repetitions"
                        onChange={(e) => setRepetitions(e.target.value)}
                        required
                    />}
                    {props.isCardio && <input
                        className="rounded mb-2 h-10 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                        type="number"
                        name="duration"
                        placeholder="Duration (in secs)"
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    " justify-start items-center text-left font-normal rounded h-10 border border-gray-300",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-4 h-6 w-6"/>
                                {date ? format(date, "PPP") :
                                    <span className="text-lg">Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <DialogFooter className="sm:justify-start mt-2">
                        <DialogClose asChild>
                            <Button
                                disabled={props.isCardio ? !duration : !weight || !repetitions}
                                type="submit"
                                className="bg-black text-white px-4 py-2 rounded no-underline"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );

    return (
        <div className="flex justify-between items-center border-b-2 pb-2 mb-2">
            <h1 className="text-muted-foreground/90 mt-4">YOUR PAST ACTIVITY</h1>
            <div>{entryForm}</div>
        </div>
    );
};
export default EntryForm;
