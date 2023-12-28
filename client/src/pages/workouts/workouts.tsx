import {useEffect} from "react";
import "./workouts.scss";
import axios from "axios";
import Navbar from "../commons/navbar/Navbar.tsx";
import WorkoutForm from "./workoutForm";
import AllWorkouts from "./allWorkouts";
import {useNavigate} from "react-router-dom";
import baseURL from "../../../lib/links.ts";
import Sidebar from "@/src/pages/commons/Sidebar/Sidebar.tsx";

const Workouts = () => {
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
                            <h1 className="text-2xl font-bold">Workouts</h1>
                            <p className="text-lg text-muted-foreground/90">List of all your workouts</p>
                        </div>
                        <WorkoutForm/>
                    </div>
                    <AllWorkouts/>
                </div>
            </div>
        </div>
    );
};

export default Workouts;
