import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { SignInSchema } from '../../../../validations/auth';
import { ILoginApi } from '../../type';
import { useHistory } from 'react-router';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { loginApi } from '../../apis/auth.api';
import { ButtonSpinner } from '../../../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { selectGoBack } from '../../slice/selector';
import { setNeedAuth } from '../../slice';

export const LoginForm = () => {
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
                    const result = await loginApi(payload);
                    // console.log(result);

                    if (result.code === 200) {
                        if (['user', 'business'].includes(result.data.role)) {
                            notifyError(
                                'Trang này chỉ dành cho quản trị viên và quản lý'
                            );
                        } else if (result.data.token) {
                            if (goBack) {
                                dispatch(setNeedAuth(false));
                                localStorage.setItem(
                                    'token',
                                    result.data.token
                                );
                                history.goBack();
                            } else {
                                localStorage.setItem(
                                    'token',
                                    result.data.token
                                );
                                notifySuccess('Đăng nhập thành công');
                                history.push('/dashboard');
                            }
                        }
                    } else {
                        notifyError(result.message);
                    }
                    resolve(true);
                }, 2000);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '480px' }}>
            <div className="form-group mb-1">
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
                <p className="text-danger">{errors.emailOrUsername?.message}</p>
            </div>
            <div className="form-group mb-1">
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
                <p className="text-danger">{errors.password?.message}</p>
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
                <button
                    className="btn btn-primary mb-2"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {!isSubmitting ? 'Đăng nhập' : <ButtonSpinner />}
                </button>
            </div>
        </form>
    );
};
