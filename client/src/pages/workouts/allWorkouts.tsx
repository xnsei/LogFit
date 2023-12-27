import axios from "axios";
import {useEffect, useState} from "react";
import "./allWorkouts.scss";
import {io} from "socket.io-client";
import baseURL from "../../../links";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {exercise} from "@/src/pages/exercises/exercises.tsx";
import {getEntries} from "@/lib/entries.ts";
import {convertDate, dateFormat} from "@/lib/dateFormat.ts";

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
    const [workouts, setWorkouts] = useState(Array<WorkoutInterface>());
    const [isLoading, setIsLoading] = useState(true);
    // const navigate = useNavigate();


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

    // const handleDelete = async (id: string) => {
    //     try {
    //         const response = await axios.post(
    //             `${baseURL}/workouts/${id}/delete`,
    //             null,
    //             {
    //                 headers: {
    //                     token: localStorage.getItem("token"),
    //                 },
    //             }
    //         );
    //         if (response.status === 200) {
    //             socket.emit("deleteWorkout", {});
    //             console.log("event emitted");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    //
    // const handleView = async (id: string) => {
    //     try {
    //         const response = await axios.get(`${baseURL}/workouts/${id}`, {
    //             headers: {
    //                 token: localStorage.getItem("token"),
    //             },
    //         });
    //         if (response.status === 200) {
    //             navigate("/workout/view", {state: {workout: response.data}});
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && workouts.map(workout => {
                return (
                    <div id={workout._id}>
                        <Accordion type="single" collapsible>
                            <AccordionItem className="border rounded-lg shadow-md overflow-hidden mb-4 px-4 py-2"
                                           value={workout.name}>
                                <AccordionTrigger className="hover:no-underline data-[state=open]:border-b-2">
                                    <div className="text-left">
                                        <h1 className="text-xl">{workout.name}</h1>
                                        <p className="text-muted-foreground">{workout.name} will help you achieve your
                                            goals</p>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                    <Exercises baseUrl={`/workouts/${workout._id}`}/>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )
            })}
        </div>
    );
};

const Exercises = ({baseUrl}: { baseUrl: string }) => {
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
            <h1 className="text-muted-foreground mb-2">
                EXERCISES
            </h1>
            <div>
                {exercises.map(exercise => {
                    return (
                        <div className="border-b mb-4 pb-1 grid grid-cols-12 items-center">
                            <h1 className="text-lg col-span-6 lg:col-span-8">
                                {exercise.name}
                            </h1>
                            <div className="col-span-4 lg:col-span-3">
                                <LatestUpdate id={exercise._id}/>
                            </div>
                            <button
                                className="col-span-2 lg:col-span-1 bg-black text-white px-auto py-2 rounded no-underline">Details
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const LatestUpdate = ({id} : {id: string}) => {
    const [latestEntryDate, setLatestEntryDate] = useState("");

    const getLatestEntryDate = async () => {
        const entries = await getEntries({exerciseId: id});
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
