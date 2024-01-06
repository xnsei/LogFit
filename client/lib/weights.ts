import axios from "axios";
import baseURL from "./links";

export const getWeights = async () => {
    try {
        const response = await axios.get(baseURL + "/weights", {
            headers: {
                token: localStorage.getItem("token"),
            },
        });
        const data = await response.data;
        return await data.sort((a: any, b: any) => {
            const dateA = parseInt(a.datadate);
            const dateB = parseInt(b.datadate);
            return dateA - dateB;
        }).reverse();
    } catch (error) {
        console.log(error);
    }
};