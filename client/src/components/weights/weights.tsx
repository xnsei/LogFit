import axios from "axios";
import {format} from "date-fns";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import Chart, {Weight} from "./chart.tsx";
import baseURL from "../../../lib/links.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog.tsx"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "@radix-ui/react-icons";
import {Calendar} from "@/components/ui/calendar.tsx";
import * as React from "react";
import {useSelector} from "react-redux";
import {getWeights} from "@/lib/weights.ts";

const socket = io(baseURL);

function extractNumberFromString(inputString: string): string {
    const numberMatch = inputString.match(/[-+]?(\d*[.])?\d+/);
    if (numberMatch) {
        const extractedNumber = numberMatch[0];
        return extractedNumber.toString();
    } else {
        return "";
    }
}

const Weights = () => {
    const selector = useSelector((state: any) => state.weights);
    const [open, setOpen] = useState(false);
    const [entry, setEntry] = useState("");
    const [weights, setWeights] = useState(Array<Weight>());
    const [date, setDate] = React.useState<Date>();

    useEffect(() => {
        const weights = selector.weights;
        const reversedWeights = [...weights].reverse();
        setWeights(reversedWeights);
        if(reversedWeights.length < 1) {
            getWeights().then(data => {
                setWeights(data.reverse());
            }).catch(error => {
                console.log(error);
            })
        }
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formattedDate = format(date ?? new Date(), "yyyyMMdd");
        try {
            const response = await axios.post(
                `${baseURL}/weights/new`,
                {
                    entry: entry,
                    datadate: formattedDate,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (response.status === 200) {
                socket.emit("addWeight", {});
                console.log("event emitted");
            }
        } catch (error) {
            console.log(error);
        }
        setOpen(false);
    };

    return (
        <div className="border shadow-md rounded mb-8">
            <div className="overflow-hidden bg-white">
                <div className="flex flex-row justify-between items-center overflow-hidden bg-gray-100 py-2 px-4">
                    <div className="">
                        <h2 className="text-2xl font-bold">Progress Timeline</h2>
                        <h3 className="text-gray-500">Your weight is more than what it usually is.</h3>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger className="bg-black text-white mt-2 px-4 py-2 rounded no-underline">
                            Add Weight
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader className="text-center">
                                <DialogTitle className="text-3xl mb-4 font-bold">Add Weight Entry</DialogTitle>
                                <DialogDescription>
                                </DialogDescription>
                            </DialogHeader>
                            <input
                                className="rounded mb-2 h-10 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                type="string"
                                name="entry"
                                placeholder="Weight"
                                onChange={(e) => setEntry(extractNumberFromString(e.target.value))}
                                required
                            />
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
                                        disabled={!entry}
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
            </div>
            <div className="">
                <Chart data={weights}/>
            </div>
        </div>
    );
};

export default Weights;
