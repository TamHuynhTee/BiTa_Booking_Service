import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInSchema } from '../../validations/auth';

interface Props {}

export const LoginDialog = (props: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: yupResolver(SignInSchema) });

    const handleShowPass = (e: any) => {
        const type = !e.target.checked ? 'password' : 'text';
        document.getElementById('password')?.setAttribute('type', type);
    };

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        return new Promise((resolve) => {
            setTimeout(() => {
                alert('Logged in');
                resolve(true);
            }, 2000);
        });
    };

    return (
        <div className="modal fade" id="LoginModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold">Đăng nhập</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group mb-2">
                                <label htmlFor="phone" className="form-label">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('phone')}
                                    id="phone"
                                    placeholder="Số điện thoại"
                                />
                                <p className="text-danger">
                                    {errors.phone?.message}
                                </p>
                            </div>
                            <div className="form-group mb-2">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Mật khẩu
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

                            <div className="checkbox mb-2">
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={handleShowPass}
                                        id="showPass"
                                    />{' '}
                                    Hiện mật khẩu
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        {...register('remembered')}
                                    />{' '}
                                    Duy trì đăng nhập
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            data-bs-target="#ForgotPassModal"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                        >
                            Quên mật khẩu
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit(onSubmit)}
                        >
                            {!isSubmitting ? (
                                'Đăng nhập'
                            ) : (
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
