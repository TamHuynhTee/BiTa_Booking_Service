export const weekDayFormatter = (day?: string) => {
    switch (day) {
        case 'Monday':
            return 'Thứ hai';
        case 'Tuesday':
            return 'Thứ ba';
        case 'Wednesday':
            return 'Thứ tư';
        case 'Thursday':
            return 'Thứ năm';
        case 'Friday':
            return 'Thứ sáu';
        case 'Saturday':
            return 'Thứ bảy';
        default:
            return 'Chủ nhật';
    }
};
