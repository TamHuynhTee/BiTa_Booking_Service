export const thisDay = () => {
    const date = new Date();
    const now =
        date.getFullYear() +
        '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + date.getDate()).slice(-2);
    return now;
};
