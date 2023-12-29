import axios from "axios";
import {useState} from "react";
import {io} from "socket.io-client";
import baseURL from "../../../lib/links.ts";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader, DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

const socket = io(baseURL);

const WorkoutExercisesForm = ({workoutId}: { workoutId: string }) => {
    const [open, setOpen] = useState(false);
    const [exerciseTitle, setExerciseTitle] = useState("");

    const addExercise = async () => {
        try {
            const response = await axios.post(
                baseURL + `/workouts/${workoutId}/exercises/new`,
                {
                    name: exerciseTitle,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (response.status === 200) {
                socket.emit("addExercise", {});
                console.log("workout exercise add event emitted");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addExercise();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-black text-white mt-2 px-4 py-2 rounded no-underline">
                Add Exercise
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-3xl mb-4 font-bold">Add Exercise</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <input
                    className="rounded mb-2 h-10 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                    type="text"
                    id="title"
                    name="title"
                    value={exerciseTitle}
                    onChange={(e) => setExerciseTitle(e.target.value)}
                    placeholder="Exercise Title"
                    required
                />
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            disabled={!exerciseTitle}
                            className="bg-black text-white px-4 py-2 rounded no-underline"
                            type="submit"
                            variant="default"
                            onClick={handleSubmit}
                        >
                            Add Exercise
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
);
};

export {
    WorkoutExercisesForm
};
