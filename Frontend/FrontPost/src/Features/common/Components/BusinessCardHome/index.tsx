import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getDetailBusiness } from '../../slice';
import logo from '../../../../images/logo_200.svg';

export const BusinessCardHome = (props: { data?: any }) => {
    const { data } = props;
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDetailBusiness = () => {
        dispatch(getDetailBusiness(data));
        history.push(`/business/${data.id}`);
    };
    return (
        <div className="card">
            <img
                src={data.businessAccount.avatar || logo}
                className="card-img-top"
                alt={data.displayName}
                height="200"
            />
            <div className="card-body">
                <h5 className="card-title fw-bold text-truncate">
                    {data.displayName}
                </h5>
                <p className="card-text text-truncate">{data.businessName}</p>
                <button className="btn btn-link" onClick={handleDetailBusiness}>
                    Chi tiết
                </button>
            </div>
        </div>
    );
};
