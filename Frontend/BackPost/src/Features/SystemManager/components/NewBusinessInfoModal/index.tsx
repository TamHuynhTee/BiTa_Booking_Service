import React from 'react';
import { useSelector } from 'react-redux';
import { selectBusinessDetail } from '../../slice/selector';

export const NewBusinessInfoModal = () => {
    const data = useSelector(selectBusinessDetail);
    return (
        <div
            className="modal fade"
            aria-hidden="true"
            id="businessInfo"
            tabIndex={-1}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Đối tác mới</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div className="modal-body text-start">
                        <p>
                            <span className="fw-bold">Tên doanh nghiệp:</span>{' '}
                            {data?.businessName}
                        </p>
                        <p>
                            <span className="fw-bold">Tên hiển thị:</span>{' '}
                            {data?.displayName}
                        </p>
                        <p>
                            <span className="fw-bold">Chủ doanh nghiệp:</span>{' '}
                            {data?.ownerName}
                        </p>
                        <p>
                            <span className="fw-bold">Mô tả doanh nghiệp:</span>{' '}
                            {data?.shortDescription}
                        </p>
                        <p>
                            <span className="fw-bold">Tên đăng nhập:</span>{' '}
                            {data?.businessAccount.username}
                        </p>
                        <p>
                            <span className="fw-bold">Email:</span>{' '}
                            {data?.businessAccount.email}
                        </p>
                        <p>
                            <span className="fw-bold">Số điện thoại:</span>{' '}
                            {data?.businessAccount.phoneNumber}
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            data-bs-toggle="modal"
                            data-bs-target="#certificate"
                        >
                            Xem giấy phép kinh doanh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
