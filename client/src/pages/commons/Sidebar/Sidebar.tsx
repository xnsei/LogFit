import {cn} from "@/lib/utils.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {WorkoutInterface} from "@/src/pages/workouts/allWorkouts.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {exercise} from "@/src/pages/exercises/exercises.tsx";

const Sidebar = () => {
    const selector = useSelector((state: any) => state);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    return (
        <ScrollArea className="h-full py-6 lg:py-8">
            <div className="flex flex-col w-full text-left space-y-2 pb-8">
                <p className="text-foreground/60">QUICK LINKS</p>
                <a
                    href={"/"}
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/" ? "text-foreground" : "text-foreground/60"
                    )}>
                    Overview
                </a>
                <a
                    href={"/weights"}
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/weights" ? "text-foreground" : "text-foreground/60"
                    )}>
                    Weights
                </a>
                <a
                    href={"/workouts"}
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/workouts" ? "text-foreground" : "text-foreground/60"
                    )}>
                    Workouts
                </a>
                <a
                    href={"/exercises"}
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/exercises" ? "text-foreground" : "text-foreground/60"
                    )}>
                    Exercises
                </a>
            </div>
            <div className="flex flex-col w-full text-left space-y-2 pb-8">
                <p className="text-foreground/60">WORKOUTS</p>
                {selector?.workouts?.workouts?.map((workout: WorkoutInterface) => {
                    return (
                        <a
                            key={workout._id}
                            onClick={() => {
                                navigate(`/workouts/${workout._id}`, {
                                    state: {
                                        workoutId: workout._id,
                                        workoutName: workout.name
                                    }
                                })
                            }}
                            className={cn(
                                "transition-colors hover:text-foreground/80 cursor-pointer",
                                pathname === `/workouts/${workout._id}` ? "text-foreground" : "text-foreground/60"
                            )}
                        >
                            {workout.name}
                        </a>
                    );
                })}
            </div>
            <div className="flex flex-col w-full text-left space-y-2 pb-8">
                <p className="text-foreground/60">EXERCISES</p>
                {selector?.exercises?.exercises?.map((exercise: exercise) => {
                    return (
                        <a
                            key={exercise._id}
                            onClick={() => {
                                navigate(`/exercises/${exercise._id}`, {
                                    state: {
                                        exerciseId: exercise._id,
                                        exerciseName: exercise.name
                                    }
                                })
                            }}
                            className={cn(
                                "transition-colors hover:text-foreground/80 cursor-pointer",
                                pathname === `/exercises/${exercise._id}` ? "text-foreground" : "text-foreground/60"
                            )}
                        >
                            {exercise.name}
                        </a>
                    );
                })}
            </div>
        </ScrollArea>
    );
};

export default Sidebar;
