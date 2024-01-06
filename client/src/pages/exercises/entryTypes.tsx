import {useEffect, useState} from "react";
import {entry} from "@/src/pages/workouts/allWorkouts.tsx";
import axios from "axios";
import baseURL from "@/lib/links.ts";
import {dateFormat} from "@/lib/dateFormat.ts";
import {getEntries} from "@/lib/entries.ts";

const handleDelete = async (exerciseId: string, entryId: string) => {
    try {
        const response = await axios.post(
            `${baseURL}/exercises/${exerciseId}/entries/${entryId}/delete`,
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

const AllEntries = ({exerciseId, startIndex, endIndex}: { exerciseId: string, startIndex: number, endIndex: number }) => {

    useEffect(() => {
        getEntries(exerciseId).then(data => {
            setEntries(data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const [entries, setEntries] = useState(Array<entry>());
    return (
        <div>
            {entries.length > 0 && entries.slice(startIndex, endIndex).map(entry => {
                return (
                    <div key={entry._id}>
                        <div>
                            <div className="pb-2 grid grid-cols-12 items-center">
                                <h1 className="text-muted-foreground col-span-6 lg:col-span-8">{dateFormat(entry.datadate)}</h1>
                                <h1 className="text-lg col-span-4 lg:col-span-3">{entry.repetitions}</h1>
                                <button
                                    className="col-span-2 lg:col-span-1 bg-black text-white px-auto py-2 rounded no-underline"
                                    onClick={() => handleDelete(exerciseId, entry._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
            {entries.length === 0 &&
                <p className="text-muted-foreground/90">You haven't logged anything for this exercise yet</p>}
        </div>
    );
}

export default AllEntries;