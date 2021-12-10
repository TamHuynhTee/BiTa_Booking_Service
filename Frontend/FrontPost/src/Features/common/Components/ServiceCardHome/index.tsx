import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getDetailService } from '../../../Business/slice';

export const ServiceCardHome = (props: { data?: any }) => {
    const { data } = props;
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDetailService = () => {
        dispatch(getDetailService(data));
        history.push(`/service/${data.id}`);
    };

    return (
        <div className="card">
            <img
                src={data.image}
                className="card-img-top"
                alt={data.name}
                height="200"
            />
            <div className="card-body">
                <h5 className="card-title fw-bold text-truncate">
                    {data.name}
                </h5>
                <p className="card-text text-truncate">{data.description}</p>
                <button className="btn btn-link" onClick={handleDetailService}>
                    Chi tiết
                </button>
            </div>
        </div>
    );
};
