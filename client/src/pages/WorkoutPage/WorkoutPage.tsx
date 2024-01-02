import {useLocation} from "react-router-dom";
import Navbar from "@/src/pages/commons/navbar/Navbar.tsx";
import Sidebar from "@/src/pages/commons/Sidebar/Sidebar.tsx";
import {Exercises} from "@/src/pages/workouts/allWorkouts.tsx";

const WorkoutPage = () => {
    const location = useLocation();
    const {workoutId, workoutName} = location.state as { workoutId: string, workoutName: string };
    return (
        <div className="w-full">
            <Navbar/>
            <div className="container my-4 grid grid-cols-12">
                <div className="hidden md:inline-flex col-span-2">
                    <Sidebar/>
                </div>
                <div className="col-span-12 md:col-span-10">
                    <div className="mb-4">
                        <div>
                        <h1 className="font-bold text-2xl pb-2">{workoutName}</h1>
                        <p className="text-muted-foreground">
                            {workoutName} will help you achieve your goals
                        </p>
                        </div>
                    </div>
                    <Exercises baseUrl={`/workouts/${workoutId}`} workoutId={workoutId}/>
                </div>
            </div>
        </div>
    );
}

export default WorkoutPage;
