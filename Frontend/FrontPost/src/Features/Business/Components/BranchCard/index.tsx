import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getDetailBranch } from '../../slice';

export const BranchCard = (props: { data?: any; headquarter?: any | '' }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { headquarter } = props;
    const { address, name, id, services, isActive } = props.data;
    const { street, ward, district, province } = address;
    console.log(props.data);
    const handleToDetail = (e: any) => {
        dispatch(getDetailBranch(props.data));
        history.push(`/business-dashboard/branch/${id}`);
    };

    return (
        <div className="card bg-light mb-3">
            <div className="card-body position-relative">
                <ActiveDot active={isActive} />
                <h5 className="card-title fw-bold">
                    {name}{' '}
                    {id === headquarter && (
                        <span className="badge rounded-pill bg-primary">
                            Trụ sở chính
                        </span>
                    )}
                </h5>
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

const ActiveDot = (props: { active?: boolean }) => {
    const { active } = props;
    return (
        <i
            className="bi bi-dot position-absolute end-0 top-0"
            style={{ fontSize: '3rem', color: `${active ? 'green' : 'red'}` }}
        ></i>
    );
};
