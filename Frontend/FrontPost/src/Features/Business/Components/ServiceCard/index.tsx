import React from 'react';
import './style.scss';
import { moneyFormatter } from '../../../../utils/moneyFormatter';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { getDetailService } from '../../slice';
import { durationFormatter } from '../../../../utils/durationFormatter';
import { Rating } from 'react-simple-star-rating';

export const ServiceCard = (props: { data?: any }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { data } = props;
    const {
        price,
        name,
        image,
        description,
        hasDeposit,
        depositPrice,
        id,
        rating,
        usage,
    } = data;
    const { quantity, unit } = data?.duration;

    const handleToDetail = (e: any) => {
        dispatch(getDetailService(data));
        history.push(`/business-dashboard/service/${id}`);
    };

    return (
        <div className="card bg-light mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={image}
                        className="img-fluid rounded-start"
                        alt={name}
                        style={{ height: '300px', width: '410px' }}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title fw-bold">{name}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">
                            <i className="bi bi-clock"></i>{' '}
                            {`Thời hạn: ${quantity} ${durationFormatter(unit)}`}
                        </p>
                        <p className="card-text">
                            <i className="bi bi-cash"></i>{' '}
                            {`Phí dịch vụ: ${moneyFormatter(price)}`}
                        </p>
                        <p className="card-text">
                            <i className="bi bi-chat-left-quote"></i>{' '}
                            {`Đánh giá trung bình: `}
                            <Rating ratingValue={rating * 20} readonly />
                        </p>
                        <p className="card-text">
                            <i className="bi bi-pause-circle"></i>{' '}
                            {`Đã sử dụng: ${usage || 0}`}
                        </p>
                        {hasDeposit && (
                            <p className="card-text">
                                <i className="bi bi-cash-coin"></i>{' '}
                                {`Phí đặt trước: ${moneyFormatter(
                                    depositPrice
                                )}`}
                            </p>
                        )}
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={handleToDetail}
                        >
                            Chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
