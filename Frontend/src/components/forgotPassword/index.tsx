import React from 'react';

interface ForgotPassDialogProps {}

export const ForgotPassDialog = (props: ForgotPassDialogProps) => {
    return (
        <div className="modal fade" id="ForgotPassModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Quên mật khẩu
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
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="example@gmail.com"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            data-bs-target="#LoginModal"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                        >
                            Đăng nhập
                        </button>
                        <button type="button" className="btn btn-primary">
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
