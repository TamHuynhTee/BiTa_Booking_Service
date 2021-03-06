import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { durationFormatter } from '../../../../utils/durationFormatter';
import { moneyFormatter } from '../../../../utils/moneyFormatter';
import { getDetailService } from '../../slice';

export const ServiceListItem = (props: {
    data?: any;
    withBusiness?: boolean;
}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { data, withBusiness } = props;

    const handleClick = () => {
        dispatch(getDetailService(data));
        history.push(`/book/${data?.id}`);
    };

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
                <Rating ratingValue={data?.rating * 20} readonly />
                <ul className="list-group list-group-flush">
                    {withBusiness && (
                        <li className="list-group-item text-truncate">
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
                        Đã đặt: {data?.usage ? data?.usage : 0}
                    </li>
                    <li className="list-group-item">
                        <Link to={`/service/${data?.id}`}>Chi tiết{' >>'}</Link>
                    </li>
                    <li className="list-group-item">
                        <button
                            className="btn btn-warning"
                            onClick={handleClick}
                        >
                            Đặt ngay
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};
