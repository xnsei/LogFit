import {format} from "date-fns";

export const dateFormat = (date: string) => {
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);

        const monthNames = [
            "Jan",
            "Feb",
            "March",
            "April",
            "May",
            "June",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
        ];
        const monthName = monthNames[parseInt(month) - 1];
        return `${monthName} ${parseInt(day)}, ${date.substring(0, 4)}`;
};

export const convertDate = (date: string) => {
    const formattedDate = format(parseInt(date), "yyyyMMdd")
    return dateFormat(formattedDate);
}