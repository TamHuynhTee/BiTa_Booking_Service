import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { DefaultAvatar } from '../../../../Components';
import { getDetailBusiness } from '../../slice';

export const BusinessCard = (props: { data?: any }) => {
    const {
        businessName,
        displayName,
        businessAccount,
        ownerName,
        branches,
        members,
        services,
        shortDescription,
        id,
    } = props.data;
    const { avatar } = businessAccount;
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChangePage = () => {
        dispatch(getDetailBusiness(props.data));
        history.push(`/dashboard/business/${id}`);
    };

    return (
        <div className="card mb-3">
            <div className="card-header">
                <h5>{businessName}</h5>
                <h6 className="fst-italic">{displayName}</h6>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-2">
                        <div className="d-flex justify-content-center">
                            <DefaultAvatar avatar={avatar} />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <p className="card-text">
                            <span className="fw-bold">
                                <i className="bi bi-person-square"></i> Chủ
                                doanh nghiệp:
                            </span>{' '}
                            {ownerName}
                        </p>
                        <p className="card-text">
                            <span className="fw-bold">
                                <i className="bi bi-book-half"></i> Mô tả doanh
                                nghiệp:
                            </span>{' '}
                            {shortDescription}
                        </p>
                        <p className="card-text">
                            <span className="fw-bold">
                                <i className="bi bi-briefcase"></i> Số dịch vụ:
                            </span>{' '}
                            {services.length}
                        </p>
                        {/* <p className="card-text">
                            <span className="fw-bold">
                                <i className="bi bi-people"></i> Số khách hàng:
                            </span>{' '}
                            {members.length}
                        </p> */}
                        <p className="card-text">
                            <span className="fw-bold">
                                <i className="bi bi-building"></i> Số chi nhánh:
                            </span>{' '}
                            {branches.length}
                        </p>
                    </div>
                    <div className="col-md-1">
                        <a
                            className="card-text text-end"
                            onClick={handleChangePage}
                            style={{
                                cursor: 'pointer',
                                textDecoration: 'none',
                            }}
                        >
                            Chi tiết{' >'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
