import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { resetPasswordApi } from '../../../../App/auth/apis/auth.api';
import { ResetPasswordSchema } from '../../../../validations/auth';

export const ResetPassword = () => {
    const params: any = new URLSearchParams(window.location.search);
    const [success, setSuccess] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(ResetPasswordSchema) });

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        return new Promise((resolve) => {
            setTimeout(async () => {
                const res = await resetPasswordApi({
                    token: params.get('token'),
                    password: data.password,
                });
                setSuccess(res.code === 200);
                console.log(res);
                resolve(true);
            }, 2000);
        });
    };
    return (
        <div className="container d-flex flex-column align-items-center">
            {!success ? (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                    <div className="form-group mb-2">
                        <label htmlFor="password" className="form-label">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            {...register('password')}
                            id="password"
                            placeholder="Mật khẩu"
                        />
                        <p className="text-danger">
                            {errors.password?.message}
                        </p>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="confirmPassword" className="form-label">
                            Xác nhận mật khẩu mới
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            {...register('confirmPassword')}
                            id="confirmPassword"
                            placeholder="Xác nhận mật khẩu"
                        />
                        <p className="text-danger">
                            {errors.confirmPassword?.message}
                        </p>
                    </div>
                    <div className="d-grid">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {!isSubmitting ? (
                                'Đổi mật khẩu'
                            ) : (
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )}
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <p className="d-flex align-items-center gap-3">
                        <i
                            className="bi bi-check2-circle"
                            style={{ color: 'green', fontSize: '2rem' }}
                        ></i>{' '}
                        Đã đổi mật khẩu thành công, hãy đăng nhập để tiếp tục.
                    </p>
                    <Link to="/">Đăng nhập</Link>
                </>
            )}
        </div>
    );
};
