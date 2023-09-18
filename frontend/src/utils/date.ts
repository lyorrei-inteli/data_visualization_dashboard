import dayjs from "dayjs";

export const formatDate = (input: string): string => {
    return dayjs(input).format("DD/MM/YYYY");
};
