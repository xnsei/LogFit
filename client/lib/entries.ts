import axios from "axios";
import baseURL from "./links.ts";

export const getEntries = async (exerciseId: string) => {
    try {
        const response = await axios.get(
            baseURL + `/exercises/${exerciseId}/entries`,
            {
                headers: {
                    token: localStorage.getItem("token"),
                },
            }
        );
        const data = await response.data;
        return data
            .sort((a: any, b: any) => {
                const dateA = parseInt(a.datadate);
                const dateB = parseInt(b.datadate);
                return dateA - dateB;
            })
            .reverse();

    } catch (error) {
        console.log(error);
    }
};