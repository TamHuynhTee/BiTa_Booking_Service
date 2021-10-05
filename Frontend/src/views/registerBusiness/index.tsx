import React from "react";
import { LinkButton } from "../../components/linkButton";
import { defaultRoute } from "../../routes/defaultRoute";
import "./style.scss";

interface RegisterBusinessProps {}

export const RegisterBusiness = (props: RegisterBusinessProps) => {
    return (
        <div className="registerBusiness">
            <div className="registerBusiness-input column-2 full-height">
                <div className="registerBusiness-input-header">
                    <LinkButton
                        link={defaultRoute.UnauthenticatedHome}
                        text="&lt; Trang chủ"
                    ></LinkButton>
                    <h1>Đăng ký hợp tác</h1>
                    <LinkButton
                        link={defaultRoute.RegisterCustomer}
                        text="Khách hàng &gt;"
                    ></LinkButton>
                </div>
                <hr />
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                    >
                        Tên doanh nghiệp trên giấy đăng ký kinh doanh *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="VD: Công ty TNHH dịch vụ 30Shine ..."
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                    >
                        Tên muốn hiển thị trên hệ thống *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="VD: 30shine"
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                    >
                        Họ tên chủ doanh nghiệp *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="VD: Nguyễn Văn A"
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                    >
                        Số điện thoại *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                    >
                        Email liên lạc *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                    >
                        Mô tả vắn tắt về doanh nghiệp
                    </label>
                    <textarea
                        className="form-control rich-text-no-resize"
                        rows={3}
                        placeholder="VD: Cung cấp các dịch vụ cắt tóc, gội đầu, ..."
                    ></textarea>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="agreePolicy"
                    />
                    <label className="form-check-label" htmlFor="agreePolicy">
                        Tôi đồng ý với các <span>điều khoản</span>
                    </label>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="button">
                        Gửi
                    </button>
                </div>
            </div>
            <div className="registerBusiness-doodle column-2 full-height"></div>
        </div>
    );
};
