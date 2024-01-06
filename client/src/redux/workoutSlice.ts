import {createSlice} from '@reduxjs/toolkit';
import {WorkoutInterface} from "@/src/pages/workouts/allWorkouts.tsx";

export const workoutSlice = createSlice({
    name: 'workout',
    initialState: {
        workouts: Array<WorkoutInterface>(),
    },
    reducers: {
        setWorkouts: (state, action) => {
            state.workouts = action.payload;
        },
    },
});

export const {setWorkouts} = workoutSlice.actions;
export default workoutSlice.reducer;
