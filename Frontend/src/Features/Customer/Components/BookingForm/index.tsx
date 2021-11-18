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

interface BookingFormProps {}

export const BookingForm = (props: BookingFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
    } = useForm({ resolver: yupResolver(CreateBookingSchema) });
    // Stopped here
    const onDayChange = (e: any) => {
        const value = e.target.value;
    };

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

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    onChange={onDayChange}
                />
                <p className="text-danger">{errors.appointmentDate?.message}</p>
            </div>
            <SectionHeader title="Chọn giờ đặt hẹn" order={3} />
            <CustomSelect
                options={APPOINTMENT_TIME}
                placeholder="Chọn giờ hẹn"
                name="appointmentTime"
                control={control}
                errors={errors.appointmentTime}
            />
            <SectionHeader title="Chú thích" order={4} />
            <CustomSelect
                options={TIME_TO_COME}
                placeholder="Chú thích"
                name="customerTime"
                control={control}
                errors={errors.customerTime}
            />
            <button type="submit" className="btn btn-success mt-2">
                Đặt hẹn
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
