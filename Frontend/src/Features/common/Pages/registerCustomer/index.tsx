import React from "react";
import "./style.scss";
import doodle from "../../../../images/doodle.svg";
import { LinkButton } from "../../../../Components/LinkButton";
import { defaultRoute } from "../../../../routes/defaultRoute";

interface RegisterCustomerProps {}

export const RegisterCustomer = (props: RegisterCustomerProps) => {
    const refFirstName = React.useRef<any>(null);
    const refLastName = React.useRef<any>(null);
    const refUsername = React.useRef<any>(null);
    const refEmail = React.useRef<any>(null);
    const refPhone = React.useRef<any>(null);
    const refPassword = React.useRef<any>(null);
    const refConfirm = React.useRef<any>(null);
    const refGender = React.useRef<any>(null);

    const handleSubmit = () => {
        console.log(refGender.current.value);
    };

    return (
        <div className="registerCustomer">
            <div className="registerCustomer-form row">
                <div className="col registerCustomer-form-doodle">
                    <img src={doodle} alt="" />
                </div>
                <div className="col registerCustomer-form-input">
                    <form onSubmit={(e) => e.preventDefault()}>
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
                                    className="form-control"
                                    placeholder="Họ*"
                                    ref={refLastName}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên*"
                                    ref={refFirstName}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username*"
                                    ref={refUsername}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email*"
                                    ref={refEmail}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="phone"
                                    className="form-control"
                                    placeholder="Số điện thoại*"
                                    ref={refPhone}
                                />
                            </div>
                            <div className="col">
                                <select className="form-select" ref={refGender}>
                                    <option defaultValue="">Giới tính</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Mật khẩu"
                                    ref={refPassword}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Xác nhận mật khẩu"
                                    ref={refConfirm}
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
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleSubmit}
                            >
                                Đăng ký
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
