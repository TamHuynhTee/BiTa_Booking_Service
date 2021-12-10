import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ButtonSpinner, CustomSelect } from '../../../../Components';
import { moneyFormatter } from '../../../../utils/moneyFormatter';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { TIME_TO_COME } from '../../../../utils/selectOptions';
import { timeFormatter } from '../../../../utils/timeFormatter';
import { CreateBookingSchema } from '../../../../validations/booking';
import { createAppointmentApi } from '../../Apis/customer.api';
import { selectBranchesForSelect } from '../../slice/selector';
import { getBranchesByServiceForSelectAsync } from '../../slice/thunk';
import './style.scss';

const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export const BookingForm = (props: {
    serviceId?: any;
    service?: any;
    user?: any;
    thisDay?: any;
    handleChange?: any;
}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { service, user, thisDay, handleChange, serviceId } = props;

    const date = new Date(thisDay);
    const weekday = date.getDay();
    const key = service?.schedule?.find(
        (x: any) => x.weekDay === weekdays[weekday]
    );
    const [bookingTime, setBookingTime] = React.useState<any>(
        key?.time?.map((e: any) => {
            return { value: e, label: timeFormatter(e) };
        })
    );
    const branches = useSelector(selectBranchesForSelect);

    React.useEffect(() => {
        dispatch(getBranchesByServiceForSelectAsync({ serviceId: serviceId }));
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
    } = useForm({
        resolver: yupResolver(CreateBookingSchema),
        defaultValues: {
            customerName: `${user?.user?.surName} ${user?.user?.firstName}`,
            customerPhone: user?.user?.phoneNumber,
            appointmentDate: thisDay,
            appointmentTime: null,
            appointmentBranch: null,
            customerTime: '',
            payNow: false,
        },
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
        handleChange('startDate', value);
    };

    const handleCreateApp = async (data: any, e: any) => {
        e.preventDefault();
        const date = data.appointmentDate;
        const now =
            date.getFullYear() +
            '-' +
            ('0' + (date.getMonth() + 1)).slice(-2) +
            '-' +
            date.getDate();
        data.appointmentDate = now;
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
        console.log(data);
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
            payNow: data.payNow,
            duration: minutes,
            startTime: startTime,
        });
        console.log(result);
        if (result.code === 200) {
            window.location.href = result.data;
        } else if (result.code === 201) {
            history.push('/home');
            notifySuccess('Đã đặt hẹn');
        } else {
            notifyError(result.message);
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
                    onChange={(e: any) =>
                        handleChange('customerName', e.target.value)
                    }
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
                    onChange={(e: any) =>
                        handleChange('customerPhone', e.target.value)
                    }
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
                    min={thisDay}
                    // defaultValue={thisDay}
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
                noOptionsMessage={() => 'Không có lịch làm việc!'}
                handleChange={handleChange}
                objKey="startTime"
            />
            <p className="text-danger">{errors?.appointmentTime?.message}</p>
            <SectionHeader title="Chọn nơi hẹn" order={4} />
            <CustomSelect
                options={branches}
                placeholder="Chọn nơi hẹn"
                name="appointmentBranch"
                control={control}
                errors={errors.appointmentBranch}
                handleChange={() => {}}
                objKey=""
            />
            <p className="text-danger">{errors?.appointmentBranch?.message}</p>
            <SectionHeader title="Chú thích" order={5} />
            <CustomSelect
                options={TIME_TO_COME}
                placeholder="Chú thích"
                name="customerTime"
                control={control}
                errors={errors.customerTime}
                handleChange={handleChange}
                objKey="notify"
            />
            <div className="form-check mt-2">
                <input
                    className="form-check-input"
                    {...register('payNow')}
                    type="checkbox"
                    onChange={(e: any) =>
                        handleChange(
                            'totalMoney',
                            e.target.checked
                                ? service?.price
                                : service?.depositPrice
                        )
                    }
                    id="payNow"
                />
                <label className="form-check-label" htmlFor="payNow">
                    Thanh toán dịch vụ với Paypal
                </label>
            </div>
            {service?.hasDeposit && (
                <p className="text-primary">
                    Nếu bạn không thanh toán phí dịch vụ thì phải đặt cọc với
                    phí cọc {moneyFormatter(service?.depositPrice)}.
                </p>
            )}
            <button type="submit" className="btn btn-success mt-2">
                {isSubmitting ? <ButtonSpinner /> : 'Đặt hẹn'}
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
