import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ButtonSpinner, CustomInput } from '../../../../Components';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { ChangePasswordSchema } from '../../../../validations/auth';
import { changePasswordApi } from '../../apis/auth.api';

interface Props {}

export const ChangePassForm = (props: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        reset,
    } = useForm({
        resolver: yupResolver(ChangePasswordSchema),
    });

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        delete data.confirmPassword;
        return new Promise((res) => {
            setTimeout(async () => {
                const result = await changePasswordApi(data);
                if (result.code === 200) {
                    notifySuccess(result.message);
                    reset();
                } else {
                    notifyError(result.message);
                }
                res(true);
            }, 2000);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
            <CustomInput
                type="password"
                register={register}
                name="oldPassword"
                errors={errors}
                title="Mật khẩu hiện tại"
                placeholder="Mật khẩu hiện tại"
            />
            <CustomInput
                type="password"
                register={register}
                name="newPassword"
                errors={errors}
                title="Mật khẩu mới"
                placeholder="Mật khẩu mới"
            />
            <CustomInput
                type="password"
                register={register}
                name="confirmPassword"
                errors={errors}
                title="Xác nhận mật khẩu hiện mới"
                placeholder="Xác nhận mật khẩu hiện mới"
            />
            <button
                type="submit"
                className="btn btn-success me-3"
                disabled={isSubmitting || !isDirty}
            >
                {!isSubmitting ? 'Đổi' : <ButtonSpinner />}
            </button>
        </form>
    );
};
