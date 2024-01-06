import axios from "axios";
import baseURL from "./links";

export const getWorkouts = async () => {
    try {
        const response = await axios.get(`${baseURL}/workouts`, {
            headers: {
                token: localStorage.getItem("token"),
            },
        });
        return await response.data;
    } catch (error) {
        console.log(error);
    }
};