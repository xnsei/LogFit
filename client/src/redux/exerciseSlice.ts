import {createSlice} from '@reduxjs/toolkit';
import {exercise} from "@/src/pages/exercises/exercises.tsx";

export const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: {
        exercises: Array<exercise>(),
    },
    reducers: {
        setExercises: (state, action) => {
            state.exercises = action.payload;
        },
    },
});

export const {setExercises} = exerciseSlice.actions;
export default exerciseSlice.reducer;
