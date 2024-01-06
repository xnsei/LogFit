import axios from "axios";
import baseURL from "./links";

export const getAllExercises = async () => {
    try {
        const response = await axios.get(baseURL + `/exercises`, {
            headers: {
                token: localStorage.getItem("token"),
            },
        });
        return await response.data;
    } catch (error) {
        console.log(error);
    }
};