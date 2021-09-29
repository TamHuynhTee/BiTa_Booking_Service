import React from 'react';
import './style.scss';
import doodle from '../../images/doodle.svg';
import { LinkButton } from '../../components/linkButton';

interface RegisterCustomerProps {}

export const RegisterCustomer = (props: RegisterCustomerProps) => {
    return (
        <div className="registerCustomer">
            <LinkButton text="Trang chủ" link="/" />
            <div className="registerCustomer-form row">
                <div className="col registerCustomer-form-doodle">
                    <img src={doodle} alt="" />
                </div>
                <div className="col registerCustomer-form-input">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h2>ĐĂNG KÝ</h2>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Họ"
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="phone"
                                    className="form-control"
                                    placeholder="Số điện thoại"
                                />
                            </div>
                            <div className="col">
                                <select className="form-select">
                                    <option defaultValue="">Giới tính</option>
                                    <option value="1">Nam</option>
                                    <option value="2">Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Mật khẩu"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Xác nhận mật khẩu"
                                />
                            </div>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="agreePolicy"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="agreePolicy"
                            >
                                Tôi đồng ý với các <span>điều khoản</span>
                            </label>
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary" type="button">
                                Đăng ký
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
