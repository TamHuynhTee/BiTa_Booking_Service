import * as yup from 'yup';

export const CreateBookingSchema = yup.object().shape({
    customerName: yup.string().required('Vui lòng nhập tên'),
    customerPhone: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(
            /(84|0[3|5|7|8|9|1|2|4|6])+([0-9]{8})\b/,
            'Số điện thoại không hợp lệ'
        ),
    appointmentDate: yup.date().required('Chưa chọn ngày hẹn'),
    appointmentTime: yup.string().required('Chưa chọn giờ hẹn').nullable(),
    customerTime: yup.string(),
});
