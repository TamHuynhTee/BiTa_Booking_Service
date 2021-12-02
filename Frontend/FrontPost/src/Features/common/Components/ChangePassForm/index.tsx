import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ColorLabel } from '../../../../Components';
import { ChangePassSchema } from '../../../../validations/auth';

interface Props {}

export const ChangePassForm = (props: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        reset,
    } = useForm({
        resolver: yupResolver(ChangePassSchema),
    });

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        return new Promise((resolve) => {
            setTimeout(() => {
                alert('Changed');
                resolve(true);
            }, 2000);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-2">
                <ColorLabel title="Mật khẩu hiện tại" for="oldPassword" />
                <input
                    type="password"
                    className="form-control"
                    {...register('oldPassword')}
                    id="oldPassword"
                    placeholder="Mật khẩu hiện tại"
                />
                <p className="text-danger">{errors.oldPassword?.message}</p>
            </div>
            <div className="form-group mb-2">
                <ColorLabel title="Mật khẩu mới" for="newPassword" />
                <input
                    type="password"
                    className="form-control"
                    {...register('newPassword')}
                    id="newPassword"
                    placeholder="Mật khẩu mới"
                />
                <p className="text-danger">{errors.newPassword?.message}</p>
            </div>
            <div className="form-group mb-2">
                <ColorLabel
                    title="Xác nhận mật khẩu mới"
                    for="confirmPassword"
                />
                <input
                    type="password"
                    className="form-control"
                    {...register('confirmPassword')}
                    id="confirmPassword"
                    placeholder="Xác nhận mật khẩu mới"
                />
                <p className="text-danger">{errors.confirmPassword?.message}</p>
            </div>
            <button
                type="submit"
                className="btn btn-success me-3"
                disabled={!isDirty}
            >
                {!isSubmitting ? (
                    'Cập nhật mật khẩu'
                ) : (
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                )}
            </button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => reset()}
                disabled={!isDirty}
            >
                <i className="bi bi-arrow-repeat"></i> Reset
            </button>
        </form>
    );
};
