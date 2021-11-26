import { Form, Formik } from 'formik';
import React from 'react';
import './style.scss';
import { CustomSelect } from '../../../../Components';
import {
    APPOINTMENT_TIME,
    TIME_TO_COME,
} from '../../../../utils/selectOptions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateBookingSchema } from '../../../../validations/booking';
import { createAppointmentApi } from '../../Apis/customer.api';
import moment from 'moment';
import { timeFormatter } from '../../../../utils/timeFormatter';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { getBranchesByServiceForSelectAsync } from '../../slice/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { selectBranchesForSelect } from '../../slice/selector';
import { useHistory } from 'react-router';

const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export const BookingForm = (props: { service?: any; user?: any }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { service, user } = props;
    const thisDay = () => {
        const date = new Date();
        const now =
            date.getFullYear() +
            '-' +
            ('0' + (date.getMonth() + 1)).slice(-2) +
            '-' +
            date.getDate();
        return now;
    };
    const date = new Date(thisDay());
    const weekday = date.getDay();
    const key = service?.schedule?.find(
        (x: any) => x.weekDay === weekdays[weekday]
    );
    const refPaymentUrl = React.useRef<any>(null);
    const [bookingTime, setBookingTime] = React.useState<any>(
        key?.time?.map((e: any) => {
            return { value: e, label: timeFormatter(e) };
        })
    );
    const branches = useSelector(selectBranchesForSelect);

    React.useEffect(() => {
        dispatch(
            getBranchesByServiceForSelectAsync({ serviceId: service?.id })
        );
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
    } = useForm({
        resolver: yupResolver(CreateBookingSchema),
    });

    const onDayChange = (e: any) => {
        const value = e.target.value;
        const date = new Date(value);
        const weekday = date.getDay();
        const key = service?.schedule?.find(
            (x: any) => x.weekDay === weekdays[weekday]
        );
        setBookingTime(
            key.time.map((e: any) => {
                return { value: e, label: timeFormatter(e) };
            })
        );
    };

    console.log(branches);

    const handleCreateApp = async (data: any, e: any) => {
        e.preventDefault();
        data.appointmentTime = timeFormatter(data.appointmentTime);
        const startTime = moment
            .utc(data.appointmentDate + ' ' + data.appointmentTime)
            .toDate();
        const minutes =
            service?.duration?.unit === 'hour'
                ? moment
                      .duration(service?.duration?.quantity, 'hour')
                      .asMinutes()
                : service?.duration?.quantity;
        const result = await createAppointmentApi({
            business: service?.business?.id,
            customerName: data.customerName,
            customerPhoneNumber: data.customerPhone,
            service: service?.id,
            branch: data.appointmentBranch,
            price: service?.price,
            hasDeposit: service?.hasDeposit,
            depositPrice: service?.depositPrice,
            notify: data.customerTime,
            paid: data.payNow,
            duration: minutes,
            startTime: startTime,
        });
        console.log(result);
        if (result.code === 200) {
            window.location.href = result.data;
        }
    };

    return (
        <form onSubmit={handleSubmit(handleCreateApp)}>
            <SectionHeader title="Thông tin khách hàng" order={1} />
            <div className="form-group mb-2">
                <label
                    htmlFor="customerName"
                    className="fs-5 fw-bold text-muted"
                >
                    Tên khách hàng
                </label>
                <input
                    type="text"
                    className="form-control"
                    {...register('customerName')}
                    id="customerName"
                    placeholder="Jesse Lingard ..."
                />
                <p className="text-danger">{errors.customerName?.message}</p>
            </div>
            <div className="form-group">
                <label
                    htmlFor="customerPhone"
                    className="fs-5 fw-bold text-muted"
                >
                    Số điện thoại
                </label>
                <input
                    type="text"
                    className="form-control"
                    {...register('customerPhone')}
                    id="customerPhone"
                    placeholder="0347933844"
                />
                <p className="text-danger">{errors.customerPhone?.message}</p>
            </div>
            <SectionHeader title="Chọn ngày đặt hẹn" order={2} />
            <div className="form-group">
                <input
                    type="date"
                    {...register('appointmentDate')}
                    id="appointmentDate"
                    className="form-control"
                    min={thisDay()}
                    defaultValue={thisDay()}
                    onChange={onDayChange}
                />
                <p className="text-danger">{errors.appointmentDate?.message}</p>
            </div>
            <SectionHeader title="Chọn giờ đặt hẹn" order={3} />
            <CustomSelect
                options={bookingTime}
                placeholder="Chọn giờ hẹn"
                name="appointmentTime"
                control={control}
                errors={errors.appointmentTime}
            />
            <SectionHeader title="Chọn nơi hẹn" order={4} />
            <CustomSelect
                options={branches}
                placeholder="Chọn nơi hẹn"
                name="appointmentBranch"
                control={control}
                errors={errors.appointmentBranch}
            />
            <SectionHeader title="Chú thích" order={5} />
            <CustomSelect
                options={TIME_TO_COME}
                placeholder="Chú thích"
                name="customerTime"
                control={control}
                errors={errors.customerTime}
            />
            <div className="form-check">
                <input
                    className="form-check-input"
                    {...register('payNow')}
                    type="checkbox"
                    id="payNow"
                />
                <label className="form-check-label" htmlFor="payNow">
                    Thanh toán dịch vụ
                </label>
            </div>
            <button type="submit" className="btn btn-success mt-2">
                Đặt hẹn
            </button>
            <button
                type="button"
                className="btn btn-success mt-2"
                onClick={() => {
                    history.push(refPaymentUrl.current);
                }}
            >
                Thanh toán
            </button>
        </form>
    );
};

const SectionHeader = (props: { title: string; order: number }) => {
    const { title, order } = props;
    return (
        <h3 className="fw-bold mb-3 section-header">
            <span className="badge bg-primary">{order}</span> {title}
        </h3>
    );
};
