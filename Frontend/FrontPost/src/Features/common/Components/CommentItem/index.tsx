import React from 'react';
import tempAvatar from '../../../../images/favicon.svg';
import dayjs from 'dayjs';
import { Rating } from 'react-simple-star-rating';
export const CommentItem = (props: { data?: any }) => {
    const { data } = props;
    return (
        <div className="card">
            <div className="card-header">
                <span className="d-flex align-items-center gap-2">
                    <img
                        src={data?.customer?.avatar || tempAvatar}
                        alt="avatar"
                        width="48"
                        height="48"
                        style={{ borderRadius: '50%' }}
                    />
                    <h5 className="fw-bold m-0">{data?.customer?.username}</h5>
                    <span className="text-primary">
                        {dayjs(data?.reviewedAt)
                            .utc()
                            .format('DD/MM/YYYY HH:mm')}
                    </span>
                </span>
            </div>
            <div className="card-body">
                <Rating ratingValue={data?.rating * 20} readonly />
                <p className="fs-5 mt-2">{data?.comment}</p>
            </div>
        </div>
    );
};
