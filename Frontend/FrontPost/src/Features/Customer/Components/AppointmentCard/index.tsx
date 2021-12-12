import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { moneyFormatter } from '../../../../utils/moneyFormatter';
import { APPOINTMENT_PAID_FILTER } from '../../../../utils/selectOptions';
import { useDispatch } from 'react-redux';
import { getDetailAppointment } from '../../slice';
import { cancelAppointmentApi } from '../../../common/Apis/common.api';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { queryAppointmentAsync } from '../../slice/thunk';
import { ButtonSpinner } from '../../../../Components';

dayjs.locale('vi');
dayjs.extend(relativeTime);
dayjs.extend(utc);

export const AppointmentCard = (props: { data?: any; query?: any }) => {
    const { data, query } = props;
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);
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
                    {data?.business?.displayName}
                </h5>
                <p className="card-text">
                    <i className="bi bi-cash-coin"></i>{' '}
                    {moneyFormatter(data?.price)}
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
                    data-bs-target="#AppointmentDetailCustomer"
                    onClick={handleGetAppointment}
                >
                    Chi tiết
                </button>
                {data?.state === 'Pending' && (
                    <button
                        className="btn btn-danger"
                        onClick={handleCancelAppointment}
                    >
                        {loading ? <ButtonSpinner /> : 'Hủy hẹn'}
                    </button>
                )}
            </div>
            <div className="card-footer">
                {dayjs(data?.startTime).subtract(7, 'hours').fromNow()}
            </div>
        </div>
    );
};
