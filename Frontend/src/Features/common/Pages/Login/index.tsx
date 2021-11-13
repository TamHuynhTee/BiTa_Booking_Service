import React from 'react';
import './style.scss';
import doodle from '../../../../images/doodle.svg';
import { LinkButton } from '../../../../Components/LinkButton';
import { defaultRoute } from '../../../../routes/defaultRoute';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ILoginApi } from '../../../../App/auth/type';
import { loginAsync } from '../../../../App/auth/slice/thunk';
import { SignInSchema } from '../../../../validations/auth';
import logo from '../../../../images/logo.svg';
import { useHistory } from 'react-router';
import { ForgotPassForm } from '../../Components/ForgotPassForm';

interface LoginProps {}

export const Login = (props: LoginProps) => {
    const history = useHistory();
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
        // dispatch(loginAsync(payload));
    };

    return (
        <div className="login">
            <div className="login-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <img
                        className="rounded mx-auto d-block mb-3"
                        src={logo}
                        alt=""
                        style={{ height: '3rem' }}
                    />
                    <h3 className="fw-bold text-center">Đăng nhập</h3>
                    <div className="form-group mb-2">
                        <label htmlFor="emailOrUsername" className="form-label">
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
                        <label htmlFor="password" className="form-label">
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
                    <div className="d-grid">
                        <button className="btn btn-primary mb-2" type="submit">
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
                        <button
                            type="button"
                            className="btn btn-success mb-2"
                            onClick={() =>
                                history.push(defaultRoute.RegisterCustomer)
                            }
                        >
                            Đăng ký
                        </button>
                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-light ms-2"
                                onClick={() =>
                                    history.push(
                                        defaultRoute.UnauthenticatedHome
                                    )
                                }
                            >
                                <i className="bi bi-arrow-left"></i> Trang chủ
                            </button>
                            <button
                                type="button"
                                className="btn btn-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#forgotPassForm"
                            >
                                Quên mật khẩu?
                            </button>
                        </div>
                    </div>
                </form>
                <div className="collapse mt-3" id="forgotPassForm">
                    <div className="card card-body">
                        <ForgotPassForm />
                    </div>
                </div>
            </div>
        </div>
    );
};
