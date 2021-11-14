import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {}

export const CreateService = (props: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        console.log(data);
    };

    return (
        <div className="container">
            <h2 className="fw-bold">Tạo dịch vụ mới</h2>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="businessName" className="form-label">
                        Tên dịch vụ *
                    </label>
                    <input
                        type="text"
                        id="businessName"
                        {...register('businessName')}
                        className="form-control"
                        placeholder="VD: Tư vấn dịch vụ ..."
                    />
                    <p className="text-danger">
                        {errors.businessName?.message}
                    </p>
                </div>
                <div className="mb-3">
                    <label htmlFor="businessName" className="form-label">
                        Tên dịch vụ *
                    </label>
                    <input
                        type="text"
                        id="businessName"
                        {...register('businessName')}
                        className="form-control"
                        placeholder="VD: Tư vấn dịch vụ ..."
                    />
                    <p className="text-danger">
                        {errors.businessName?.message}
                    </p>
                </div>
            </form>
        </div>
    );
};
