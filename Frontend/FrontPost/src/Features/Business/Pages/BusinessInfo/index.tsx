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
                title="T??n doanh nghi???p"
                placeholder="T??n doanh nghi???p"
            />
            <CustomInput
                type="text"
                register={register}
                name="displayName"
                errors={errors}
                title="T??n hi???n th??? tr??n h??? th???ng"
                placeholder="T??n hi???n th??? tr??n h??? th???ng"
            />
            <CustomInput
                type="text"
                register={register}
                name="ownerName"
                errors={errors}
                title="T??n ch??? doanh nghi???p"
                placeholder="T??n ch??? doanh nghi???p"
            />
            <div className="mb-3">
                <ColorLabel title="M?? t??? doanh nghi???p" for="shortDescription" />
                <textarea
                    id="shortDescription"
                    {...register('shortDescription')}
                    className="form-control rich-text-no-resize"
                    rows={3}
                    placeholder="VD: Cung c???p c??c d???ch v??? c???t t??c, g???i ?????u, ..."
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
                {!isSubmitting ? 'C???p nh???t' : <ButtonSpinner />}
            </button>
        </form>
    );
};
