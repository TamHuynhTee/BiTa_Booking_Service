import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moneyFormatter } from '../../../../utils/moneyFormatter';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import {
    APPOINTMENT_PAID_FILTER,
    APPOINTMENT_STATE_FILTER,
    TIME_TO_COME,
} from '../../../../utils/selectOptions';
import { updateAppointmentApi } from '../../Apis/customer.api';
import { selectAppointmentDetail } from '../../slice/selector';

dayjs.locale('vi');
dayjs.extend(relativeTime);
dayjs.extend(utc);

export const AppointmentDetailCustomer = () => {
    const appointment = useSelector(selectAppointmentDetail);
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

    const renderNotify = () => {
        return (
            <select
                className="form-select"
                defaultValue={
                    TIME_TO_COME[
                        TIME_TO_COME.findIndex(
                            (e: any) => e.value === appointment?.notify
                        )
                    ]?.label
                }
                onChange={handleChangeNotify}
            >
                {TIME_TO_COME.map((e: any, i: number) => (
                    <option value={e.value} key={i}>
                        {e.label}
                    </option>
                ))}
            </select>
        );
    };
    console.log(appointment?.notify);

    const handleChangeNotify = async (e: any) => {
        const value = e.target.value;
        const result = await updateAppointmentApi({
            notify: value,
            appointmentId: appointment?.id,
        });
        if (result.code === 200) notifySuccess(result.message);
        else notifyError(result.message);
    };

    return (
        <div
            className="modal fade"
            id="AppointmentDetailCustomer"
            tabIndex={-1}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold">
                            Chi tiết cuộc hẹn
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
                                    Nhà cung cấp dịch vụ
                                </h5>
                                <p className="card-text">
                                    {appointment?.business?.displayName}
                                </p>
                                {/*  */}
                                <h5 className="fw-bold mt-2">Khách hàng</h5>
                                <p className="card-text">
                                    <i className="bi bi-person"></i>{' '}
                                    {appointment?.customerName}
                                </p>
                                <p className="card-text">
                                    <i className="bi bi-phone"></i>{' '}
                                    {appointment?.customerPhoneNumber}
                                </p>
                                {/*  */}
                                <h5 className="fw-bold mt-2">Dịch vụ</h5>
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
                                    {`${appointment?.branch?.address?.street}, ${appointment?.branch?.address?.ward}, ${appointment?.branch?.address?.district}, ${appointment?.branch?.address?.province}`}
                                </p>
                                {/*  */}
                                <h5 className="fw-bold mt-2">
                                    Thông tin cuộc hẹn
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
                                    {appointment?.state === 'Pending' &&
                                        renderNotify()}
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
