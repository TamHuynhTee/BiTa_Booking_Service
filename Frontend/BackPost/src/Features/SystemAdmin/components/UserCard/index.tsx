import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import tempLogo from '../../../../images/favicon.svg';
import { getDetailUser } from '../../slice';

export const UserCard = (props: { data?: any }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { data } = props;
    const { username, avatar, email, firstName, surName, phoneNumber, id } =
        data;

    const handleChangePage = () => {
        dispatch(getDetailUser(data));
        history.push(`/dashboard/user/${id}`);
    };

    return (
        <div className="col-md-6">
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex mb-3">
                        <img
                            src={avatar || tempLogo}
                            width={50}
                            height={50}
                            alt="avatar"
                            style={{ borderRadius: '50%' }}
                        />
                        <div className="ms-3" style={{ flex: '1' }}>
                            <h5>{username}</h5>
                            <h6 className="m-0">{email}</h6>
                        </div>
                    </div>
                    <p className="card-text">
                        <span className="fw-bold">Họ tên: </span> {surName}{' '}
                        {firstName}
                    </p>
                    <p className="card-text">
                        <span className="fw-bold">Số điện thoại: </span>{' '}
                        {phoneNumber}
                    </p>
                    <a
                        className="card-text text-end"
                        style={{
                            cursor: 'pointer',
                            textDecoration: 'none',
                        }}
                        onClick={handleChangePage}
                    >
                        Chi tiết{' >'}
                    </a>
                </div>
            </div>
        </div>
    );
};
