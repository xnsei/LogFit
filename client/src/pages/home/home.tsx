import axios from "axios";
import {useEffect} from "react";
import Navbar from "../commons/navbar/Navbar.tsx";
import Weights from "@/src/components/weights/weights";
import {useNavigate} from "react-router-dom";
import baseURL from "../../../links";
import Sidebar from "@/src/pages/commons/Sidebar/Sidebar.tsx";
import FavoriteWorkouts from "@/src/components/FavoriteWorkouts/FavoriteWorkouts.tsx";
import FavoriteExercises from "@/src/components/FavoriteExercises/FavoriteExercises.tsx";

const Home = () => {
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
        <main className="w-full">
            <Navbar/>
            <div className="container my-4 grid grid-cols-12">
                <div className="hidden md:inline-flex col-span-2">
                    <Sidebar/>
                </div>
                <div className="col-span-12 md:col-span-10">
                    <div className="">
                        <div className="border-b-2 mb-8">
                            <div className="flex items-center mt-2">
                                <h1 className="text-center text-4xl font-bold">Welcome to Log</h1>
                                <h1 className="text-center text-4xl font-bold text-indigo-600">Fit!</h1>
                            </div>
                            <p className="text-lg text-muted-foreground/90">One stop solution for all your fitness trackigns.
                            </p>
                        </div>
                        <div className="mb-4">
                            <Weights/>
                        </div>
                        <div className="mb-4">
                            <FavoriteWorkouts/>
                        </div>
                        <div>
                            <FavoriteExercises/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
