import * as yup from 'yup';

export const SignInSchema = yup.object().shape({
    emailOrUsername: yup.string().required('Chưa nhập username hoặc email'),
    password: yup.string().required('Chưa nhập mật khẩu'),
});

export const ForgotPassSchema = yup.object().shape({
    email: yup.string().email('Không phải email').required('Chưa nhập email'),
});

export const SignUpSchema = yup.object().shape({
    surName: yup.string().required('Chưa nhập họ'),
    firstName: yup.string().required('Chưa nhập tên'),
    username: yup.string().required('Chưa nhập username'),
    email: yup.string().email('Không phải email').required('Chưa nhập email'),
    phoneNumber: yup
        .string()
        .required('Chưa nhập số điện thoại')
        .matches(
            /(84|0[3|5|7|8|9|1|2|4|6])+([0-9]{8})\b/,
            'Số điện thoại không hợp lệ'
        ),
    gender: yup.string().required('Chưa chọn giới tính'),
    password: yup
        .string()
        .required('Chưa nhập mật khẩu')
        .min(8, 'Mật khẩu ít nhất 8 ký tự')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Mật khẩu phải chứa ít nhất 1 số và 1 ký tự'
        ),
    confirmPassword: yup
        .string()
        .required('Chưa xác nhận mật khẩu')
        .oneOf([yup.ref('password'), null], 'Mật khẩu phải giống nhau'),
});

export const ProfileSchema = yup.object().shape({
    surName: yup.string(),
    firstName: yup.string(),
    username: yup.string().required('Chưa nhập username'),
    email: yup.string().email('Không phải định dạng email'),
    phoneNumber: yup
        .string()
        .matches(
            /(84|0[3|5|7|8|9|1|2|4|6])+([0-9]{8})\b/,
            'Số điện thoại không hợp lệ'
        ),
    gender: yup.string(),
});

export const ChangePassSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .required('Chưa nhập mật khẩu hiện tại')
        .min(8, 'Mật khẩu ít nhất 8 ký tự')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Mật khẩu phải chứa ít nhất 1 số và 1 ký tự'
        ),
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

export const ResetPasswordSchema = yup.object().shape({
    password: yup
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
        .oneOf([yup.ref('password'), null], 'Mật khẩu phải giống nhau'),
});

export const NewBusinessSchema = yup.object().shape({
    registeredName: yup.string().required('Chưa nhập tên doanh nghiệp'),
    displayName: yup.string().required('Chưa chọn tên hiển thị'),
    ownerName: yup.string().required('Chưa nhập tên chủ doanh nghiệp'),
    email: yup.string().email('Không phải email').required('Chưa nhập email'),
    phoneNumber: yup
        .string()
        .required('Chưa nhập số điện thoại')
        .matches(
            /(84|0[3|5|7|8|9|1|2|4|6])+([0-9]{8})\b/,
            'Số điện thoại không hợp lệ'
        ),
    shortDescription: yup.string(),
});
