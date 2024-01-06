import {useLocation} from "react-router-dom";
import AllEntries from "@/src/pages/exercises/entryTypes.tsx";
import {useEffect, useState} from "react";
import {getEntries} from "@/lib/entries.ts";
import {entry} from "@/src/pages/workouts/allWorkouts.tsx";
import Navbar from "@/src/pages/commons/navbar/Navbar.tsx";
import Sidebar from "@/src/pages/commons/Sidebar/Sidebar.tsx";
import EntryForm from "@/src/pages/exercises/EntryForm.tsx";
import axios from "axios";
import baseURL from "@/lib/links.ts";
import PaginationHelper from "@/src/components/Pagination/PaginationHelper.tsx";
import {useSelector} from "react-redux";
import {exercise} from "@/src/pages/exercises/exercises.tsx";

const ExercisePage = () => {
    const location = useLocation();
    const {exerciseId, exerciseName} = location.state as { exerciseId: string, exerciseName: string };

    useEffect(() => {
        getEntries(exerciseId).then(data => {
            setEntries(data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const [entries, setEntries] = useState(Array<entry>());

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

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
                console.log("event emitted");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isExerciseCardio = (id: string): boolean => {
        const exercises = useSelector((state: any) => state.exercises.exercises);
        if(!exercises) return false;
        return exercises.find((exercise: exercise) => exercise._id === id).isCardio ?? false;
    }

    return (
        <div key={exerciseId} className="w-full">
            <Navbar/>
            <div className="container my-4 grid grid-cols-12">
                <div className="hidden md:inline-flex col-span-2">
                    <Sidebar/>
                </div>
                <div className="col-span-12 md:col-span-10">
                    <h1 className="font-bold text-2xl pb-2">{exerciseName}</h1>
                    <p className="text-muted-foreground">{exerciseName} will help you achieve your
                        goals</p>
                    <EntryForm
                        isCardio={isExerciseCardio(exerciseId)}
                        exerciseId={exerciseId}
                        exerciseName={exerciseName}
                        onDelete={() => handleDelete(exerciseId)}
                    />
                    <AllEntries exerciseId={exerciseId} startIndex={firstIndex} endIndex={lastIndex}/>
                    <PaginationHelper
                        totalPages={Math.ceil(entries.length / itemsPerPage)}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default ExercisePage;
