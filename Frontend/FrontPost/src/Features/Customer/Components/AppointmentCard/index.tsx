import React from 'react';
import * as dayjs from 'dayjs';
import 'dayjs/locale/vi';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as utc from 'dayjs/plugin/utc';
import { moneyFormatter } from '../../../../utils/moneyFormatter';
import { APPOINTMENT_PAID_FILTER } from '../../../../utils/selectOptions';

dayjs.locale('vi');
dayjs.extend(relativeTime);
dayjs.extend(utc);

export const AppointmentCard = (props: { data?: any }) => {
    const { data } = props;

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
                <button className="btn btn-link">Chi tiết</button>
            </div>
            <div className="card-footer">
                {dayjs(data?.startTime).subtract(7, 'hours').fromNow()}
            </div>
        </div>
    );
};
