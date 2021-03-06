import React from 'react';
import './style.scss';
import doodle from '../../../../images/doodle.svg';
import { LinkButton } from '../../../../Components/LinkButton';
import { defaultRoute } from '../../../../routes/defaultRoute';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ILoginApi } from '../../../../App/auth/type';
import {
    getCurrentUserAsync,
    loginAsync,
} from '../../../../App/auth/slice/thunk';
import { SignInSchema } from '../../../../validations/auth';
import logo from '../../../../images/logo.svg';
import { useHistory } from 'react-router';
import { ForgotPassForm } from '../../Components/ForgotPassForm';
import { loginApi } from '../../../../App/auth/apis/auth.api';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { useDispatch, useSelector } from 'react-redux';
import { selectGoBack } from '../../../../App/auth/slice/selector';
import { setNeedAuth } from '../../../../App/auth/slice';

interface LoginProps {}

export const Login = (props: LoginProps) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const goBack = useSelector(selectGoBack);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(SignInSchema) });

    const handleShowPass = (e: any) => {
        const type = !e.target.checked ? 'password' : 'text';
        document.getElementById('password')?.setAttribute('type', type);
    };

    const onSubmit = (data: any, e: any) => {
        try {
            e.preventDefault();
            return new Promise((resolve) => {
                setTimeout(async () => {
                    const payload: ILoginApi = {
                        email: data.emailOrUsername,
                        password: data.password,
                    };
                    const result: any = await dispatch(loginAsync(payload));
                    // console.log(result);
                    if (result.payload?.code === 200) {
                        if (goBack) {
                            history.goBack();
                            dispatch(setNeedAuth(false));
                        } else {
                            if (
                                ['user', 'business'].includes(
                                    result.payload?.data.role
                                )
                            ) {
                                dispatch(getCurrentUserAsync());
                                history.push(
                                    result.payload?.data.role === 'user'
                                        ? defaultRoute.AuthenticatedHome
                                        : '/business-dashboard'
                                );
                            }
                        }
                    }
                    resolve(true);
                }, 2000);
            });
        } catch (error) {
            console.log(error);
        }
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
                    <h3 className="fw-bold text-center">????ng nh???p</h3>
                    <div className="form-group mb-2">
                        <label htmlFor="emailOrUsername" className="form-label">
                            Username ho???c email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            {...register('emailOrUsername')}
                            id="emailOrUsername"
                            placeholder="Username ho???c email"
                        />
                        <p className="text-danger">
                            {errors.emailOrUsername?.message}
                        </p>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="password" className="form-label">
                            M???t kh???u
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            {...register('password')}
                            id="password"
                            placeholder="M???t kh???u"
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
                            Hi???n m???t kh???u
                        </label>
                    </div>
                    <div className="d-grid">
                        <button
                            className="btn btn-primary mb-2"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {!isSubmitting ? (
                                '????ng nh???p'
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
                            disabled={isSubmitting}
                        >
                            ????ng k??
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
                                disabled={isSubmitting}
                            >
                                <i className="bi bi-arrow-left"></i> Trang ch???
                            </button>
                            <button
                                type="button"
                                className="btn btn-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#forgotPassForm"
                                disabled={isSubmitting}
                            >
                                Qu??n m???t kh???u?
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
