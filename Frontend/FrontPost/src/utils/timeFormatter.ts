export const timeFormatter = (time?: string) => {
    return time?.slice(0, 2) + ':' + time?.slice(2);
};
