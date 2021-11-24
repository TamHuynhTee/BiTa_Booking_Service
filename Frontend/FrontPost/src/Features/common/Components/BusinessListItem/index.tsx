import React from 'react';
import { Link } from 'react-router-dom';
import tempLogo from '../../../../images/favicon.svg';

export const BusinessListItem = (props: { data?: any }) => {
    const { data } = props;
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <img
                        src={data?.businessAccount?.avatar || tempLogo}
                        alt="..."
                        width={50}
                        height={50}
                        style={{ borderRadius: '50%' }}
                    />
                    <h5
                        className="fw-bold mb-0 text-truncate"
                        style={{ flex: 1 }}
                    >
                        {data?.displayName}
                    </h5>
                </div>
                <h5 className=" fw-bold text-truncate card-title">
                    {data?.businessName}
                </h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-truncate">
                        Chủ doanh nghiệp: {data?.ownerName}
                    </li>
                    <li className="list-group-item text-truncate">
                        Số điện thoại: {data?.businessAccount?.phoneNumber}
                    </li>
                    <li className="list-group-item">
                        <Link to={`/business/${data?.id}`}>
                            Chi tiết{' >>'}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
