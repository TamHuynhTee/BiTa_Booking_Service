import React from 'react';
import './style.scss';

interface BusinessInfoProps {}

export const BusinessInfo = (props: BusinessInfoProps) => {
    const thumbnail = 'https://picsum.photos/200/200';
    return (
        <div className="container">
            <div className="businessInfo">
                <div className="businessInfo-wrapper p-3 mb-5 bg-body rounded">
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <img
                                src={thumbnail}
                                className="img-thumbnail"
                                alt=""
                            />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h2>Công ty tư nhân hữu hạn MTV</h2>
                            <button className="btn btn-outline-primary">
                                {' '}
                                Thêm vào danh sách yêu thích
                            </button>
                        </div>
                    </div>
                    <div className="mt-5 mb-5 fs-4">
                        <h2 className="fw-bold">Thông tin cơ bản</h2>
                        <ul className="ms-5">
                            <li>
                                <span className="badge bg-secondary">
                                    Tên công ty
                                </span>
                                <p>Công ty tư nhân hữu hạn MTV</p>
                            </li>
                            <li>
                                <span className="badge bg-secondary">
                                    Trụ sở
                                </span>
                                <p>TPHCM</p>
                            </li>
                            <li>
                                <span className="badge bg-secondary">
                                    Số điện thoại liên lạc
                                </span>
                                <p>0347933844</p>
                            </li>
                            <li>
                                <span className="badge bg-secondary">
                                    Email
                                </span>
                                <p>huynhthanhtam2605@gmail.com</p>
                            </li>
                            <li>
                                <span className="badge bg-secondary">
                                    Chủ sở hữu
                                </span>
                                <p>Công ty tư nhân hữu hạn MTV</p>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-5 mb-5 fs-4">
                        <h2 className="fw-bold">Chi nhánh</h2>
                        <ul className="ms-5 businessInfo-wrapper-branch">
                            <li>
                                <p>
                                    <span className="badge bg-secondary">
                                        Chi nhánh 1
                                    </span>{' '}
                                    số 6 Nguyễn Du, Phước Hiệp, BRVT
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="badge bg-secondary">
                                        Chi nhánh 2
                                    </span>{' '}
                                    số 6 Nguyễn Du, Phước Hiệp, BRVT
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
