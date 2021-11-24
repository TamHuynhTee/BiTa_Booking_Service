export const durationFormatter = (unit?: string) => {
    if (!unit) return '';
    return unit === 'minute' ? 'phút' : 'giờ';
};
