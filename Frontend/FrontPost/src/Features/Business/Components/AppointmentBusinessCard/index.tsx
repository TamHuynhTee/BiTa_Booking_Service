import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { moneyFormatter } from '../../../../utils/moneyFormatter';
import { APPOINTMENT_PAID_FILTER } from '../../../../utils/selectOptions';
import { useDispatch } from 'react-redux';
import { getDetailAppointment } from '../../../Customer/slice';
import { doneAppointmentApi } from '../../Apis/business.api';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { queryAppointmentAsync } from '../../../Customer/slice/thunk';
import { ButtonSpinner } from '../../../../Components';
import { cancelAppointmentApi } from '../../../common/Apis/common.api';

dayjs.locale('vi');
dayjs.extend(relativeTime);
dayjs.extend(utc);

export const AppointmentBusinessCard = (props: { data?: any; query?: any }) => {
    const { data, query } = props;
    const dispatch = useDispatch();
    const momentDate = (date: any) => {
        const time = dayjs(date).utc().format('DD/MM/YYYY HH:mm');
        return time;
    };

    const renderPayment = (payment: string) => {
        return (
            <p
                className="card-text"
                style={{
                    color:
                        payment === 'NotPaid'
                            ? 'red'
                            : payment === 'PartialPaid'
                            ? 'blue'
                            : 'green',
                }}
            >
                {' '}
                {
                    APPOINTMENT_PAID_FILTER[
                        APPOINTMENT_PAID_FILTER.findIndex(
                            (e: any) => e.value === payment
                        )
                    ]?.label
                }
            </p>
        );
    };

    const handleGetAppointment = () => {
        dispatch(getDetailAppointment(data));
    };

    const [loading, setLoading] = React.useState(false);
    const handleDoneAppointment = () => {
        if (confirm(`Xác nhận xong cuộc hẹn?`)) {
            setLoading(true);
            return new Promise((res) => {
                setTimeout(async () => {
                    const result = await doneAppointmentApi({
                        appointmentId: data?.id,
                    });
                    if (result.code === 200) {
                        notifySuccess(result.message);
                        dispatch(queryAppointmentAsync(query));
                    } else {
                        notifyError(result.message);
                    }
                    res(() => setLoading(false));
                }, 2000);
            });
        }
    };

    const handleCancelAppointment = () => {
        if (confirm(`Bạn chắc muốn hủy hẹn chứ?`)) {
            setLoading(true);
            return new Promise((res) => {
                setTimeout(async () => {
                    const result = await cancelAppointmentApi({
                        appointmentId: data?.id,
                    });
                    if (result.code === 200) {
                        notifySuccess(result.message);
                        dispatch(queryAppointmentAsync(query));
                    } else {
                        notifyError(result.message);
                    }
                    res(() => setLoading(false));
                }, 2000);
            });
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="fw-bold text-truncate">{data?.service?.name}</h5>
            </div>
            <div className="card-body">
                <h5 className="fw-bold text-truncate">
                    <i className="bi bi-person"></i> {data?.customerName}
                </h5>
                <p className="card-text">
                    <i className="bi bi-phone"></i> {data?.customerPhoneNumber}
                </p>
                <p className="card-text">
                    <i className="bi bi-clock"></i>{' '}
                    {momentDate(data?.startTime)}
                </p>
                <p className="card-text">
                    <i className="bi bi-clock-fill"></i>{' '}
                    {momentDate(data?.endTime)}
                </p>
                {renderPayment(data?.payment)}
                <button
                    className="btn btn-link"
                    data-bs-toggle="modal"
                    data-bs-target="#AppointmentDetailBusiness"
                    onClick={handleGetAppointment}
                >
                    Chi tiết
                </button>
                {data?.state === 'Pending' && (
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-success"
                            onClick={handleDoneAppointment}
                        >
                            {loading ? <ButtonSpinner /> : 'Hoàn tất'}
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={handleCancelAppointment}
                        >
                            {loading ? <ButtonSpinner /> : 'Hủy hẹn'}
                        </button>
                    </div>
                )}
            </div>
            <div className="card-footer">
                {dayjs(data?.startTime).subtract(7, 'hours').fromNow()}
            </div>
        </div>
    );
};
