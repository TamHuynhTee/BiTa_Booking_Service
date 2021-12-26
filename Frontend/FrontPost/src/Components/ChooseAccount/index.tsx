import React from 'react';
import user from '../../images/user.svg';
import business from '../../images/business.svg';
import { useHistory } from 'react-router';
import { defaultRoute } from '../../routes/defaultRoute';

export const ChooseAccountDialog = () => {
    const history = useHistory();
    return (
        <div className="modal fade" id="ChooseAccountModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Chọn tài khoản</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body p-4">
                        <h1 style={{ textAlign: 'center', color: '#6c63ff' }}>
                            Bạn muốn trở thành
                        </h1>
                        <div className="chooseAccount">
                            <div
                                className="chooseAccount-card"
                                data-bs-dismiss="modal"
                                onClick={() =>
                                    history.push(defaultRoute.RegisterCustomer)
                                }
                            >
                                <h2>Khách hàng</h2>
                                <div className="chooseAccount-card-image">
                                    <img src={user} alt="" />
                                </div>
                            </div>
                            <div
                                className="chooseAccount-card"
                                data-bs-dismiss="modal"
                                onClick={() =>
                                    history.push(defaultRoute.RegisterBusiness)
                                }
                            >
                                <h2>Đối tác</h2>
                                <div className="chooseAccount-card-image">
                                    <img src={business} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
