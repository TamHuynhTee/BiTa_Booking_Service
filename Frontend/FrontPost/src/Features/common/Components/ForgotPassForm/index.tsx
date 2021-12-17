import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { forgotPasswordApi } from '../../../../App/auth/apis/auth.api';
import { ForgotPassSchema } from '../../../../validations/auth';

export const ForgotPassForm = () => {
    const [state, setState] = React.useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: yupResolver(ForgotPassSchema) });

    React.useEffect(() => {
        return () => setState(0);
    });

    const onSubmit = (data: any, e: any) => {
        try {
            e.preventDefault();
            return new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await forgotPasswordApi(data);
                    if (result.code === 200) {
                        setState(1);
                        reset();
                    } else {
                        setState(2);
                    }
                    resolve(true);
                }, 2000);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-2">
                <label htmlFor="email" className="form-label">
                    Nhập email để lấy lại mật khẩu
                </label>
                <input
                    type="text"
                    className="form-control"
                    {...register('email')}
                    id="email"
                    placeholder="Email"
                />
                <p className="text-danger">{errors.email?.message}</p>
            </div>
            <button className="btn btn-primary mb-2" type="submit">
                {!isSubmitting ? (
                    'Gửi'
                ) : (
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                )}
            </button>
            {state === 1 ? (
                <div className="alert alert-success m-0" role="alert">
                    Đã gửi mail làm lại mật khẩu. Hãy kiểm tra email của bạn.
                </div>
            ) : state === 2 ? (
                <div className="alert alert-danger m-0" role="alert">
                    Có lỗi! Email không tồn tại.
                </div>
            ) : (
                ''
            )}
        </form>
    );
};
