import axios from "axios";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import baseURL from "../../../lib/links.ts";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {exercise} from "@/src/pages/exercises/exercises.tsx";
import {getEntries} from "@/lib/entries.ts";
import {convertDate, dateFormat} from "@/lib/dateFormat.ts";
import {useNavigate} from "react-router-dom";
import { WorkoutExercisesForm } from "../exercises/exerciseForm.tsx";

const socket = io(baseURL);

export interface WorkoutInterface {
    _id: string;
    name: string;
    exercises: Array<string>;
}

export interface entry {
    _id: string;
    entry: string;
    datadate: string;
}

const AllWorkouts = () => {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState(Array<WorkoutInterface>());
    const [isLoading, setIsLoading] = useState(true);


    const getWorkouts = async () => {
        try {
            const response = await axios.get(`${baseURL}/workouts`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            const data = await response.data;
            setWorkouts(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
        return workouts;
    };

    useEffect(() => {
        getWorkouts();
    }, []);

    useEffect(() => {
        socket.on("updateWorkout", (_data: any) => {
            getWorkouts();
        });
    }, [socket]);

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && workouts.map(workout => {
                return (
                    <div id={workout._id}>
                        <Accordion type="single" collapsible>
                            <AccordionItem className="border rounded-lg shadow-md overflow-hidden mb-4"
                                           value={workout.name}>
                                <AccordionTrigger className="px-4 hover:no-underline data-[state=open]:bg-gray-100">
                                    <div className="text-left py-2">
                                        <h1 className="text-xl">{workout.name}</h1>
                                        <p className="text-muted-foreground">{workout.name} will help you achieve your
                                            goals</p>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="mt-4 px-4">
                                    <div className="border-b-2 pb-2">
                                        <Exercises baseUrl={`/workouts/${workout._id}`} workoutId={workout._id}/>
                                    </div>
                                    <div className="mt-2 flex">
                                        <button
                                            onClick={() => {
                                                navigate(`/workouts/${workout._id}`, {
                                                    state: {
                                                        workoutId: workout._id,
                                                        workoutName: workout.name
                                                    }
                                                })
                                            }}
                                            className="bg-black text-white px-4 py-2 rounded no-underline"
                                        >
                                            View Workout Details
                                        </button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )
            })}
        </div>
    );
};

const Exercises = ({baseUrl, workoutId}: { baseUrl: string, workoutId: string }) => {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState(Array<exercise>());
    const getExercises = async () => {
        try {
            const response = await axios.get(baseURL + `${baseUrl}/exercises`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            const data = await response.data;
            setExercises(data);
        } catch (error) {
            console.log(error);
        }
        return exercises;
    };

    useEffect(() => {
        getExercises();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center pb-2 mb-4 border-b-2">
            <h1 className="text-muted-foreground">
                EXERCISES
            </h1>
                <WorkoutExercisesForm workoutId={workoutId} />
            </div>
            <div>
                {exercises.map(exercise => {
                    return (
                        <div className="pb-2 grid grid-cols-12 items-center">
                            <h1 className="text-lg col-span-6 lg:col-span-8">
                                {exercise.name}
                            </h1>
                            <div className="col-span-4 lg:col-span-3">
                                <LatestUpdate id={exercise._id}/>
                            </div>
                            <button
                                onClick={() => navigate(`/exercises/${exercise._id}`, {
                                    state: {
                                        exerciseId: exercise._id,
                                        exerciseName: exercise.name
                                    }
                                })}
                                className="col-span-2 lg:col-span-1 bg-black text-white px-auto py-2 rounded no-underline">Details
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const LatestUpdate = ({id}: { id: string }) => {
    const [latestEntryDate, setLatestEntryDate] = useState("");

    const getLatestEntryDate = async () => {
        const entries = await getEntries(id);
        console.log(entries)
        const latestEntryDate = await entries[0].datadate;
        setLatestEntryDate(latestEntryDate);
    }

    useEffect(() => {
        getLatestEntryDate();
    }, []);

    return (
        <div>
            <h1 className="text-muted-foreground">
                {latestEntryDate ? `Updated on ${latestEntryDate.length > 8 ? convertDate(latestEntryDate) : dateFormat(latestEntryDate)}` : "No Logs for this exercise yet"}
            </h1>
        </div>
    )
}

export default AllWorkouts;
export {Exercises};
