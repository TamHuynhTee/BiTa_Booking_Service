import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { moneyFormatter } from '../../../../utils/moneyFormatter';
import {
    APPOINTMENT_PAID_FILTER,
    APPOINTMENT_STATE_FILTER,
    TIME_TO_COME,
} from '../../../../utils/selectOptions';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { selectAppointmentDetail } from '../../../Customer/slice/selector';

dayjs.locale('vi');
dayjs.extend(relativeTime);
dayjs.extend(utc);

export const AppointmentDetailBusiness = () => {
    const appointment = useSelector(selectAppointmentDetail);

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
    const renderState = (state: string) => {
        return (
            <p
                className="fw-bold"
                style={{
                    color:
                        state === 'Pending'
                            ? '#e3b44b'
                            : state === 'Canceled'
                            ? 'red'
                            : 'green',
                }}
            >
                {' '}
                {
                    APPOINTMENT_STATE_FILTER[
                        APPOINTMENT_STATE_FILTER.findIndex(
                            (e: any) => e.value === state
                        )
                    ]?.label
                }
            </p>
        );
    };

    return (
        <div
            className="modal fade"
            id="AppointmentDetailBusiness"
            tabIndex={-1}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold">
                            Chi ti???t cu???c h???n
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {renderState(appointment?.state)}
                        <div className="card fs-5">
                            <div className="card-body">
                                <h5 className="fw-bold mt-2">
                                    Nh?? cung c???p d???ch v???
                                </h5>
                                <p className="card-text">
                                    {appointment?.business?.displayName}
                                </p>
                                {/*  */}
                                <h5 className="fw-bold mt-2">Kh??ch h??ng</h5>
                                <p className="card-text">
                                    <i className="bi bi-person"></i>{' '}
                                    {appointment?.customerName}
                                </p>
                                <p className="card-text">
                                    <i className="bi bi-phone"></i>{' '}
                                    {appointment?.customerPhoneNumber}
                                </p>
                                {/*  */}
                                <h5 className="fw-bold mt-2">D???ch v???</h5>
                                <p className="card-text">
                                    <i className="bi bi-briefcase"></i>{' '}
                                    {appointment?.service?.name}
                                </p>
                                <p className="card-text">
                                    <i className="bi bi-cash"></i>{' '}
                                    {moneyFormatter(appointment?.price)}
                                </p>
                                <p className="card-text">
                                    <i className="bi bi-cash-coin"></i>{' '}
                                    {moneyFormatter(appointment?.depositPrice)}
                                </p>
                                <p className="card-text">
                                    <i className="bi bi-geo-alt"></i>{' '}
                                    <span className="fw-bold">
                                        {appointment?.branch?.name}:
                                    </span>{' '}
                                    {`${appointment?.branch?.address?.street}, ${appointment?.branch?.address?.ward}, ${appointment?.branch?.address?.district}, ${appointment?.branch?.address?.province}`}
                                </p>
                                {/*  */}
                                <h5 className="fw-bold mt-2">
                                    Th??ng tin cu???c h???n
                                </h5>
                                <p className="card-text">
                                    <i className="bi bi-clock"></i>{' '}
                                    {momentDate(appointment?.startTime)}
                                </p>
                                <p className="card-text">
                                    <i className="bi bi-clock-fill"></i>{' '}
                                    {momentDate(appointment?.endTime)}
                                </p>
                                <p className="card-text">
                                    <i className="bi bi-clipboard"></i>{' '}
                                    {
                                        TIME_TO_COME[
                                            TIME_TO_COME.findIndex(
                                                (e: any) =>
                                                    e.value ===
                                                    appointment?.notify
                                            )
                                        ]?.label
                                    }
                                </p>
                                {renderPayment(appointment?.payment)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
