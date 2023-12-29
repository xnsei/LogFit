import Navbar from "@/src/pages/commons/navbar/Navbar.tsx";
import Weights from "@/src/components/weights/weights.tsx";
import Sidebar from "@/src/pages/commons/Sidebar/Sidebar.tsx";
import PaginationHelper from "@/src/components/Pagination/PaginationHelper.tsx";
import {useEffect, useState} from "react";
import {Weight} from "@/src/components/weights/chart.tsx";
import axios from "axios";
import baseURL from "@/lib/links.ts";
import {dateFormat} from "@/lib/dateFormat.ts";

const WeightPage = () => {
    const [weights, setWeights] = useState(Array<Weight>());
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentWeights = weights.slice(firstIndex, lastIndex);

    const getWeights = async () => {
        try {
            const response = await axios.get(baseURL + "/weights", {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            const data = await response.data;
            const newData = data.sort((a: any, b: any) => {
                const dateA = parseInt(a.datadate);
                const dateB = parseInt(b.datadate);
                return dateA - dateB;
            }).reverse();
            setWeights(newData);
        } catch (error) {
            console.log(error);
        }
        return weights;
    };

    useEffect(() => {
        getWeights();
    }, []);

    return (
        <div className="w-full">
            <Navbar/>
            <div className="container my-4 grid grid-cols-12">
                <div className="hidden md:inline-flex col-span-2">
                    <Sidebar/>
                </div>
                <div className="col-span-12 md:col-span-10">
                    <Weights/>
                    <div className="my-4">
                        <h1 className="font-bold text-2xl border-b-2 pb-2">My Weight Log</h1>
                        {currentWeights.map((weight: Weight) => {
                            return (
                                <div className="container my-4 grid grid-cols-12 pb-1 items-center">
                                    <h2 className="text-muted-foreground col-span-6 md:col-span-8 lg:col-span-9">
                                        {dateFormat(weight.datadate)}
                                    </h2>
                                    <h2 className="text-lg font-bold col-span-3 md:col-span-2 lg:col-span-2">
                                        {weight.entry}
                                    </h2>
                                    <button className="bg-black text-white py-2 rounded px-auto col-span-3 md:col-span-2 lg:col-span-1">
                                        Edit
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <div className="pb-4">
                        <PaginationHelper
                            totalPages={Math.ceil(weights.length / itemsPerPage)}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeightPage;
