import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { DefaultAvatar } from '../../../../Components';
import { selectBusinessDetail } from '../../slice/selector';
import { getBusinessByIdAsync } from '../../slice/thunk';
import logo from '../../../../images/favicon.svg';
import { Link } from 'react-router-dom';

interface Props {}

export const BusinessDetail = (props: Props) => {
    const { id } = useParams<any>();
    const dispatch = useDispatch();
    const business = useSelector(selectBusinessDetail);
    React.useEffect(() => {
        dispatch(getBusinessByIdAsync({ businessId: id }));
    }, []);
    console.log(business);
    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <h4 className="fw-bold">Thông tin doanh nghiệp</h4>
                <Link to={'/dashboard/businesses'}>{'< '}Về danh sách</Link>
            </div>
            <hr />
            <div className="card my-3 bg-light">
                <div className="card-body">
                    <p className="card-text">
                        <span className="fw-bold">
                            Tên đăng ký kinh doanh:{' '}
                        </span>
                        {business?.businessName}
                    </p>
                    <p className="card-text">
                        <span className="fw-bold">Tên hiển thị: </span>
                        {business?.displayName}
                    </p>
                    <p className="card-text">
                        <span className="fw-bold">Tên chủ doanh nghiệp: </span>
                        {business?.ownerName}
                    </p>
                    <p className="card-text">
                        <span className="fw-bold">Mô tả doanh nghiệp: </span>
                        {business?.shortDescription}
                    </p>
                    <p className="card-text">
                        <span className="fw-bold">Số khách hàng: </span>
                        {business?.members?.length}
                    </p>
                    <p className="card-text">
                        <span className="fw-bold">Số dịch vụ: </span>
                        {business?.services?.length}
                    </p>
                    <p className="card-text">
                        <span className="fw-bold">Số chi nhánh: </span>
                        {business?.branches?.length}
                    </p>
                    <button
                        className="btn btn-primary me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#certificate"
                    >
                        Xem giấy phép kinh doanh
                    </button>
                    {/* <button className="btn btn-danger">Ngưng hợp tác</button> */}
                </div>
            </div>
            <h4>Tài khoản doanh nghiệp</h4>
            <hr />
            <div className="row mt-3">
                <div className="col-md-3">
                    <div className="d-flex justify-content-center">
                        <img
                            src={business?.businessAccount?.avatar || logo}
                            height="200"
                            width="200"
                            alt="..."
                            style={{ borderRadius: '50%' }}
                        />
                    </div>
                </div>
                <div className="col-md-9">
                    <label>Username</label>
                    <input
                        disabled
                        value={business?.businessAccount?.username}
                        className="form-control mb-2"
                    />
                    <label>Email</label>
                    <input
                        disabled
                        value={business?.businessAccount?.email}
                        className="form-control mb-2"
                    />
                    <label>Số điện thoại</label>
                    <input
                        disabled
                        value={business?.businessAccount?.phoneNumber}
                        className="form-control mb-2"
                    />
                </div>
            </div>
            <div className="modal fade" id="certificate" tabIndex={-1}>
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Giấy phép kinh doanh
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex justify-content-center">
                                <img
                                    src={business?.businessCertificate}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
