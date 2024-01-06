import { configureStore } from "@reduxjs/toolkit";
import weightReducer from "./weightSlice.ts";
import workoutReducer from "./workoutSlice.ts";
import exerciseReducer from "./exerciseSlice.ts";

export default configureStore({
    reducer: {
        weights: weightReducer,
        workouts: workoutReducer,
        exercises: exerciseReducer,
    },
});