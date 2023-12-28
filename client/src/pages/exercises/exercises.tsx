import {useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../commons/navbar/Navbar.tsx";
import {useNavigate} from "react-router-dom";
import EntryForm from "./EntryForm.tsx";
import {io} from "socket.io-client";
import baseURL from "../../../lib/links.ts";
import Sidebar from "@/src/pages/commons/Sidebar/Sidebar.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import AllEntries from "@/src/pages/exercises/entryTypes.tsx";

const socket = io(baseURL);

export interface exercise {
    _id: string;
    name: string;
}

const AllExercises = () => {
    const [exercises, setExercises] = useState(Array<exercise>());

    const navigate = useNavigate();

    const authenticate = async () => {
        try {
            const response = await axios.get(`${baseURL}/authenticate`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            if (response.status !== 200) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    };

    const getExercises = async () => {
        try {
            const response = await axios.get(baseURL + `/exercises`, {
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
        authenticate();
        getExercises();
    }, []);

    useEffect(() => {
        socket.on("updateExercise", (_data: any) => {
            getExercises();
        });
    }, [socket]);

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.post(
                `${baseURL}/exercises/${id}/delete`,
                null,
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            if (response.status === 200) {
                socket.emit("deleteExercise", {});
                console.log("event emitted");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="">
                {exercises.map(exercise => {
                        return (
                            <div key={exercise._id}>
                                <Accordion type={"single"} collapsible>
                                    <AccordionItem className="border rounded-lg shadow-md overflow-hidden mb-4"
                                                   value={exercise.name}>
                                        <AccordionTrigger className="px-4 hover:no-underline data-[state=open]:bg-gray-100">
                                            <div className="text-left py-2">
                                                <h1 className="text-xl">{exercise.name}</h1>
                                                <p className="text-muted-foreground">{exercise.name} will help you achieve
                                                    your
                                                    goals</p>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="mt-0 px-4">
                                            <div key={exercise._id}>
                                                <EntryForm
                                                    exerciseId={exercise._id}
                                                    exerciseName={exercise.name}
                                                    onDelete={() => handleDelete(exercise._id)}
                                                />
                                                <AllEntries exerciseId={exercise._id} startIndex={0} endIndex={5}/>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    );
};

const Exercises = () => {
    const navigate = useNavigate();

    const authenticate = async () => {
        try {
            const response = await axios.get(`${baseURL}/authenticate`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            if (response.status !== 200) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    };

    useEffect(() => {
        authenticate();
    }, []);
    return (
        <div className="w-full">
            <Navbar/>
            <div className="container my-4 grid grid-cols-12">
                <div className="hidden md:inline-flex md:col-span-2">
                    <Sidebar/>
                </div>
                <div className="col-span-12 md:col-span-10">
                    <div className="flex justify-between items-center border-b-2 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold">Exercises</h1>
                            <p className="text-lg text-muted-foreground/90">List of all your exercises</p>
                        </div>
                    </div>
                    <AllExercises/>
                </div>
            </div>
        </div>
    );
};

export default Exercises;
