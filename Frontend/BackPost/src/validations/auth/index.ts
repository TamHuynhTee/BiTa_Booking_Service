import * as yup from 'yup';

export const SignInSchema = yup.object().shape({
    emailOrUsername: yup.string().required('Chưa nhập username hoặc email'),
    password: yup.string().required('Chưa nhập mật khẩu'),
});

export const ProfileInfoSchema = yup.object().shape({
    surName: yup.string().required('Chưa nhập họ'),
    firstName: yup.string().required('Chưa nhập tên'),
    username: yup.string().required('Chưa nhập tên đăng nhập'),
    email: yup.string().email('Không phải email').required('Chưa nhập email'),
    phoneNumber: yup
        .string()
        .required('Chưa nhập số điện thoại')
        .matches(
            /(84|0[3|5|7|8|9|1|2|4|6])+([0-9]{8})\b/,
            'Số điện thoại không hợp lệ'
        ),
    gender: yup.string(),
    dayOfBirth: yup.date(),
    avatar: yup.string(),
});

export const ChangePasswordSchema = yup.object().shape({
    oldPassword: yup.string().required('Chưa nhập mật khẩu'),
    newPassword: yup
        .string()
        .required('Chưa nhập mật khẩu mới')
        .min(8, 'Mật khẩu ít nhất 8 ký tự')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Mật khẩu phải chứa ít nhất 1 số và 1 ký tự'
        ),
    confirmPassword: yup
        .string()
        .required('Chưa xác nhận mật khẩu')
        .oneOf([yup.ref('newPassword'), null], 'Mật khẩu phải giống nhau'),
});
