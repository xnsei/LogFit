import {createSlice} from '@reduxjs/toolkit';

export interface weight {
    id: number;
    weight: number;
    datadate: string;
}

export const weightSlice = createSlice({
    name: 'weights',
    initialState: {
        weights: Array<weight>(),
    },
    reducers: {
        setWeights: (state, action) => {
            state.weights = action.payload;
        },
    },
});

export const {setWeights} = weightSlice.actions;
export default weightSlice.reducer;