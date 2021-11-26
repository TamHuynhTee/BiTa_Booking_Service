export const moneyFormatter = (money?: number) => {
    if (!money) money = 0;
    const result = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'VND',
    }).format(money);
    return result;
};
