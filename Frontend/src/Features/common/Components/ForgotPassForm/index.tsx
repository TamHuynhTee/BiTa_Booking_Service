import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ForgotPassSchema } from '../../../../validations/auth';

interface Props {}

export const ForgotPassForm = (props: Props) => {
    const [state, setState] = React.useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: yupResolver(ForgotPassSchema) });

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        console.log(data);
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
