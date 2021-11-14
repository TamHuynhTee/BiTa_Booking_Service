import * as yup from 'yup';

const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export const CreateBookingSchema = yup.object().shape({
    name: yup.string().required('Chưa nhập tên'),
    category: yup.string().required('Chưa chọn loại dịch vụ'),
    price: yup
        .number()
        .positive('Giá không được âm')
        .moreThan(yup.ref('depositPrice')),
    hasDeposit: yup.boolean().nullable(),
    depositPrice: yup.number().positive('Phí cọc không được âm').nullable(),
    description: yup.string().nullable(),
    duration: yup.object({
        quantity: yup.number().positive(),
        unit: yup.string().oneOf(['minute', 'hour']),
    }),
    schedule: yup.array(
        yup.object({
            weekDay: yup.string().oneOf(weekDays),
            time: yup.array(yup.string()),
        })
    ),
});
