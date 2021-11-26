import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { durationFormatter } from '../../../../utils/durationFormatter';
import { moneyFormatter } from '../../../../utils/moneyFormatter';

export const ServiceListItem = (props: {
    data?: any;
    withBusiness?: boolean;
}) => {
    const history = useHistory();
    const { data, withBusiness } = props;
    return (
        <div className="card">
            <img
                src={data?.image}
                className="card-img-top"
                alt="..."
                height={200}
            />
            <div className="card-body">
                <h5 className=" fw-bold text-truncate card-title">
                    {data?.name}
                </h5>
                <ul className="list-group list-group-flush">
                    {withBusiness && (
                        <li className="list-group-item">
                            Dịch vụ của:{' '}
                            <Link to={`/business/${data?.business?.id}`}>
                                {data?.business?.displayName}
                            </Link>
                        </li>
                    )}
                    <li className="list-group-item">
                        Giá cả: {moneyFormatter(data?.price)}
                    </li>
                    <li className="list-group-item">
                        Thời lượng: {data?.duration?.quantity}{' '}
                        {durationFormatter(data?.duration?.unit)}
                    </li>
                    <li className="list-group-item">
                        <Link to={`/service/${data?.id}`}>Chi tiết{' >>'}</Link>
                    </li>
                    <li className="list-group-item">
                        <button
                            className="btn btn-warning"
                            onClick={() => history.push(`/book/${data?.id}`)}
                        >
                            Đặt ngay
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};
