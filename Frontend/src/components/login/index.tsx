import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInSchema } from '../../validations/auth';
import { notifySuccess } from '../../utils/notify';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../../App/auth/slice/thunk';
import { ILoginApi } from '../../App/auth/type';

interface Props {}

export const LoginDialog = (props: Props) => {
    const dispatch = useDispatch();
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

    const onSubmit = async (data: any, e: any) => {
        e.preventDefault();
        const payload: ILoginApi = {
            email: data.emailOrUsername,
            password: data.password,
        };
        dispatch(loginAsync(payload));
    };

    return (
        <div className="modal fade" id="LoginModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold">Đăng nhập</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group mb-2">
                                <label
                                    htmlFor="emailOrUsername"
                                    className="form-label"
                                >
                                    Username hoặc email
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('emailOrUsername')}
                                    id="emailOrUsername"
                                    placeholder="Username hoặc email"
                                />
                                <p className="text-danger">
                                    {errors.emailOrUsername?.message}
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
