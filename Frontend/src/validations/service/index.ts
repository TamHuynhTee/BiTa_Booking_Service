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

export const CreateServiceSchema = yup.object().shape({
    name: yup.string().required('Chưa nhập tên'),
    category: yup.string().required('Chưa chọn loại dịch vụ'),
    price: yup.string().nullable(),
    hasDeposit: yup.boolean().nullable(),
    depositPrice: yup.string().nullable(),
    description: yup.string().nullable(),
});
