import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getDetailBranch } from '../../slice';

interface Props {
    data?: any;
}

export const BranchCard = (props: Props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { address, name, id, services } = props.data;
    const { street, ward, district, province } = address;

    const handleToDetail = (e: any) => {
        dispatch(getDetailBranch(props.data));
        history.push(`/business-dashboard/branch/${id}`);
    };

    return (
        <div className="card bg-light">
            <div className="card-body">
                <h5 className="card-title fw-bold">{name}</h5>
                <p className="card-text">
                    <i
                        className="bi bi-geo-alt-fill"
                        style={{ color: 'royalblue' }}
                    ></i>{' '}
                    {`${street}, ${ward}, ${district}, ${province}`}
                </p>
                <p className="card-text">
                    <i
                        className="bi bi-briefcase-fill"
                        style={{ color: 'tomato' }}
                    ></i>{' '}
                    Số dịch vụ: {services.length}
                </p>
                <button
                    type="button"
                    className="btn btn-link"
                    onClick={handleToDetail}
                >
                    Chi tiết
                </button>
            </div>
        </div>
    );
};
