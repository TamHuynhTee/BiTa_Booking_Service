import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getDetailService } from '../../../Business/slice';

interface Props {
    data?: any;
}

export const ServiceCardHome = (props: Props) => {
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
                <h5 className="card-title fw-bold">{data.name}</h5>
                <p className="card-text">{data.description}</p>
                <button className="btn btn-link" onClick={handleDetailService}>
                    Chi tiết
                </button>
            </div>
        </div>
    );
};
