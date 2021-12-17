import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateBusinessApi } from '../../../../App/auth/apis/auth.api';
import { getCurrentUserAsync } from '../../../../App/auth/slice/thunk';
import { ButtonSpinner, ColorLabel, CustomInput } from '../../../../Components';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { BusinessInfoSchema } from '../../../../validations/auth';

export const BusinessInfo = (props: { info?: any }) => {
    const { info } = props;
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: yupResolver(BusinessInfoSchema),
        defaultValues: {
            businessName: info?.businessName,
            displayName: info?.displayName,
            ownerName: info?.ownerName,
            shortDescription: info?.shortDescription,
        },
    });

    const onSubmit = (data: any, e: any) => {
        try {
            e.preventDefault();
            data.businessId = info?.id;
            delete data.headquarter;
            return new Promise((resolve) => {
                setTimeout(async () => {
                    console.log(data);
                    const result = await updateBusinessApi(data);
                    if (result.code === 200) {
                        notifySuccess(result.message);
                        dispatch(getCurrentUserAsync());
                    } else notifyError(result.message);
                    resolve(true);
                }, 2000);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
            <CustomInput
                type="text"
                register={register}
                name="businessName"
                errors={errors}
                title="Tên doanh nghiệp"
                placeholder="Tên doanh nghiệp"
            />
            <CustomInput
                type="text"
                register={register}
                name="displayName"
                errors={errors}
                title="Tên hiển thị trên hệ thống"
                placeholder="Tên hiển thị trên hệ thống"
            />
            <CustomInput
                type="text"
                register={register}
                name="ownerName"
                errors={errors}
                title="Tên chủ doanh nghiệp"
                placeholder="Tên chủ doanh nghiệp"
            />
            <div className="mb-3">
                <ColorLabel title="Mô tả doanh nghiệp" for="shortDescription" />
                <textarea
                    id="shortDescription"
                    {...register('shortDescription')}
                    className="form-control rich-text-no-resize"
                    rows={3}
                    placeholder="VD: Cung cấp các dịch vụ cắt tóc, gội đầu, ..."
                ></textarea>
                <p className="text-danger">
                    {errors.shortDescription?.message}
                </p>
            </div>
            <button
                type="submit"
                className="btn btn-success me-3"
                disabled={isSubmitting || !isDirty}
            >
                {!isSubmitting ? 'Cập nhật' : <ButtonSpinner />}
            </button>
        </form>
    );
};
