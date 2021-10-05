import React from 'react';

interface Props {}

export const LoginDialog = (props: Props) => {
    return (
        <div className="modal fade" id="LoginModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Đăng nhập
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Tài khoản</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username/Phone/Email"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Mật khẩu"
                            />
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexCheckDefault"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                            >
                                Duy trì đăng nhập
                            </label>
                        </div>
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
                        <button type="button" className="btn btn-primary">
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};