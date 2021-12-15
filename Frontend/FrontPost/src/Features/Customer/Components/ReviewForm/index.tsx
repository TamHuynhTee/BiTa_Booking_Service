import React from 'react';
import { Rating } from 'react-simple-star-rating';
import dayjs from 'dayjs';
import { moneyFormatter } from '../../../../utils/moneyFormatter';
import { useForm } from 'react-hook-form';
import { ButtonSpinner } from '../../../../Components';
import { customerReviewApi } from '../../Apis/customer.api';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { useDispatch } from 'react-redux';
import { countNewReviewsAsync, queryReviewsAsync } from '../../slice/thunk';

const tooltipArray = [
    'Rất tệ',
    'Tệ',
    'Không tốt',
    'Cần cải thiện',
    'Trung bình',
    'Khá',
    'Tốt',
    'Rất tốt',
    'Hài lòng',
    'Vô cùng hài lòng',
];

export const ReviewForm = (props: { data?: any; query?: any }) => {
    const { data, query } = props;
    const dispatch = useDispatch();
    const [payload, setPayload] = React.useState({
        rating: 0,
        comment: '',
        reviewId: data.id,
        review: true,
    });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const submit = (data: any, e: any) => {
        e.preventDefault();
        payload.comment = data.comment;
        return new Promise((res) => {
            setTimeout(async () => {
                console.log(payload);
                const result = await customerReviewApi(payload);
                if (result.code === 200) {
                    notifySuccess('Cảm ơn sự đánh giá của bạn.');
                    dispatch(countNewReviewsAsync());
                    dispatch(queryReviewsAsync(query));
                } else {
                    notifyError(result.message);
                }
                res(true);
            }, 2000);
        });
    };

    return (
        <div className="card">
            <div className="card-body row">
                <div className="col-sm-5 px-3">
                    <h5 className="fw-bold">
                        {data?.service?.name}{' '}
                        <span className="badge bg-secondary">
                            {data?.service?.business?.displayName}
                        </span>
                    </h5>
                    <ul>
                        <li className="mb-1">
                            <h5 className="card-text d-flex align-items-center">
                                <span className="badge bg-primary me-3">
                                    <i className="bi bi-person"></i>
                                </span>
                                {data?.appointment?.customerName}
                            </h5>
                        </li>
                        <li className="mb-1">
                            <h5 className="card-text d-flex align-items-center">
                                <span className="badge bg-primary me-3">
                                    <i className="bi bi-telephone"></i>
                                </span>
                                {data?.appointment?.customerPhoneNumber}
                            </h5>
                        </li>
                        <li className="mb-1">
                            <h5 className="card-text d-flex align-items-center">
                                <span className="badge bg-primary me-3">
                                    <i className="bi bi-clock"></i>
                                </span>
                                {dayjs(data?.appointment?.startTime)
                                    .utc()
                                    .format('DD/MM/YYYY HH:mm')}
                            </h5>
                        </li>
                        <li className="mb-1">
                            <h5 className="card-text d-flex align-items-center">
                                <span className="badge bg-primary me-3">
                                    <i className="bi bi-clock-fill"></i>
                                </span>
                                {dayjs(data?.appointment?.endTime)
                                    .utc()
                                    .format('DD/MM/YYYY HH:mm')}
                            </h5>
                        </li>
                        <li className="mb-1">
                            <h5 className="card-text d-flex align-items-center">
                                <span className="badge bg-success me-3">
                                    <i className="bi bi-cash"></i>
                                </span>
                                {moneyFormatter(data?.appointment?.price)}
                                {/* {data?.appointment?.price} */}
                            </h5>
                        </li>
                    </ul>
                </div>
                <div className="col-sm-7 bg-light p-3">
                    <h4 className="fw-bold">Đánh giá của bạn về dịch vụ này</h4>
                    <form onSubmit={handleSubmit(submit)}>
                        <Rating
                            ratingValue={payload.rating}
                            allowHalfIcon
                            transition
                            showTooltip
                            tooltipArray={tooltipArray}
                            onClick={(rate: number) =>
                                setPayload({ ...payload, rating: rate / 20 })
                            }
                        />
                        <textarea
                            rows={3}
                            {...register('comment')}
                            className="form-control rich-text-no-resize my-3"
                            value={payload.comment}
                            placeholder="Hãy cho chúng tôi biết đánh giá của bạn để làm tốt hơn trong những lần sau"
                            onChange={(e: any) =>
                                setPayload({
                                    ...payload,
                                    comment: e.target.value,
                                })
                            }
                        ></textarea>
                        <button
                            type="submit"
                            className="btn btn-success me-3"
                            disabled={isSubmitting || payload.rating === 0}
                        >
                            {!isSubmitting ? 'Gửi' : <ButtonSpinner />}
                        </button>
                        <button
                            type="submit"
                            className="btn btn-secondary"
                            onClick={() =>
                                setPayload({ ...payload, review: false })
                            }
                            disabled={isSubmitting}
                        >
                            {!isSubmitting ? (
                                'Không đánh giá'
                            ) : (
                                <ButtonSpinner />
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <div className="card-footer bg-primary text-light">
                <p className="card-text">
                    Cập nhật lúc{' '}
                    {dayjs(data?.appointment?.reviewAt)
                        .utc()
                        .format('DD/MM/YYYY HH:mm')}
                </p>
            </div>
        </div>
    );
};
