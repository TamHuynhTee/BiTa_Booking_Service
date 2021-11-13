import React from 'react';
import './style.scss';
import doodle from '../../../../images/doodle.svg';
import { LinkButton } from '../../../../Components/LinkButton';
import { defaultRoute } from '../../../../routes/defaultRoute';
import { SignUpSchema } from '../../../../validations/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router';

interface RegisterCustomerProps {}

export const RegisterCustomer = (props: RegisterCustomerProps) => {
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: yupResolver(SignUpSchema) });

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        console.log(data);
        return new Promise((resolve) => {
            setTimeout(() => {
                alert('Registered');

                resolve(true);
            }, 2000);
        });
    };

    return (
        <div className="registerCustomer">
            <div className="registerCustomer-form row">
                <div className="col registerCustomer-form-doodle">
                    <img className="img-fluid" src={doodle} alt="" />
                </div>
                <div className="col registerCustomer-form-input">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="registerBusiness-input-header">
                            <LinkButton
                                link={defaultRoute.UnauthenticatedHome}
                                text="&lt; Trang chủ"
                            ></LinkButton>
                            <h1>Đăng ký</h1>
                            <LinkButton
                                link={defaultRoute.RegisterBusiness}
                                text="Doanh nghiệp &gt;"
                            ></LinkButton>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="text"
                                    {...register('surName')}
                                    className="form-control"
                                    placeholder="Họ*"
                                />
                                <p className="text-danger">
                                    {errors.surName?.message}
                                </p>
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    {...register('firstName')}
                                    className="form-control"
                                    placeholder="Tên*"
                                />
                                <p className="text-danger">
                                    {errors.firstName?.message}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="text"
                                    {...register('username')}
                                    className="form-control"
                                    placeholder="Username*"
                                />
                                <p className="text-danger">
                                    {errors.username?.message}
                                </p>
                            </div>
                            <div className="col">
                                <input
                                    type="email"
                                    {...register('email')}
                                    className="form-control"
                                    placeholder="Email*"
                                />
                                <p className="text-danger">
                                    {errors.email?.message}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="phone"
                                    {...register('phone')}
                                    className="form-control"
                                    placeholder="Số điện thoại*"
                                />
                                <p className="text-danger">
                                    {errors.phone?.message}
                                </p>
                            </div>
                            <div className="col">
                                <select
                                    className="form-select"
                                    {...register('gender')}
                                    placeholder="Giới tính"
                                >
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                                <p className="text-danger">
                                    {errors.gender?.message}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="password"
                                    {...register('password')}
                                    className="form-control"
                                    placeholder="Mật khẩu"
                                />
                                <p className="text-danger">
                                    {errors.password?.message}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="password"
                                    {...register('confirmPassword')}
                                    className="form-control"
                                    placeholder="Xác nhận mật khẩu"
                                />
                                <p className="text-danger">
                                    {errors.confirmPassword?.message}
                                </p>
                            </div>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                {...register('agreed')}
                                id="agreePolicy"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="agreePolicy"
                            >
                                Tôi đồng ý với các <span>điều khoản</span>
                            </label>
                        </div>
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="submit">
                                {!isSubmitting ? (
                                    'Đăng ký'
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
                                className="btn btn-dark mb-2"
                                onClick={() => history.push(defaultRoute.Login)}
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
