export const moneyFormatter = (money: number) => {
    if (!money) money = 0;
    return money.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
    });
};
