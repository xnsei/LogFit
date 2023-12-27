import axios from "axios";
import {useState} from "react";
import {io} from "socket.io-client";
import "./workoutForm.scss";
import baseURL from "../../../links";
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


const WorkoutForm = () => {
    const [open, setOpen] = useState(false);
    const [workoutTitle, setWorkoutTitle] = useState("");

    const addWorkout = async () => {
        try {
            const response = await axios.post(
                `${baseURL}/workouts/new`,
                {
                    name: workoutTitle,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (response.status === 200) {
                socket.emit("addWorkout", {});
                console.log("event emitted");
            }
        } catch (error) {
            console.log(error);
        }
        setOpen(false);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addWorkout();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-black text-white mt-2 px-4 py-2 rounded no-underline">
                Add Workout
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-3xl mb-4 font-bold">Add New Workout</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <input
                    className="rounded mb-2 h-10 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                    type="string"
                    name="title"
                    placeholder="Workout Title"
                    onChange={(e) => setWorkoutTitle(e.target.value)}
                    required
                />
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            disabled={!workoutTitle}
                            className="bg-black text-white px-4 py-2 rounded no-underline"
                            type="submit"
                            variant="default"
                            onClick={handleSubmit}
                        >
                            Add Workout
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WorkoutForm;
