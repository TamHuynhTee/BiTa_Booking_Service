import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AvatarFrame } from '..';
import { updateProfileApi } from '../../../../App/auth/apis/auth.api';
import { getCurrentUserAsync } from '../../../../App/auth/slice/thunk';
import {
    ButtonSpinner,
    CustomDateInput,
    CustomInput,
    SelectCustom,
} from '../../../../Components';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { GENDER_OPTIONS } from '../../../../utils/selectOptions';
import { ProfileInfoSchema } from '../../../../validations/auth';
import './style.scss';

export const UserInfoForm = (props: { info?: any }) => {
    const { info } = props;
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: yupResolver(ProfileInfoSchema),
        defaultValues: {
            username: info?.username,
            surName: info?.surName,
            firstName: info?.firstName,
            phoneNumber: info?.phoneNumber,
            email: info?.email,
            gender: info?.gender,
            dayOfBirth: info?.dayOfBirth,
        },
    });

    const onSubmit = (data: any, e: any) => {
        try {
            e.preventDefault();
            return new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await updateProfileApi(data);
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
        <div className="row">
            <div className="col-md-4">
                {/* avatar */}
                <AvatarFrame avatar={info?.avatar} />
            </div>
            <div className="col-md-8">
                <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                    <CustomInput
                        type="text"
                        register={register}
                        name="username"
                        errors={errors}
                        title="T??n ????ng nh???p"
                        placeholder="T??n ????ng nh???p"
                    />
                    <div className="input-group gap-3">
                        <CustomInput
                            type="text"
                            register={register}
                            name="surName"
                            errors={errors}
                            title="H???"
                            placeholder="H???"
                        />
                        <CustomInput
                            type="text"
                            register={register}
                            name="firstName"
                            errors={errors}
                            title="T??n"
                            placeholder="T??n"
                        />
                        <SelectCustom
                            options={GENDER_OPTIONS}
                            register={register}
                            name="gender"
                            errors={errors}
                            title="Gi???i t??nh"
                            placeholder="Gi???i t??nh"
                        />
                    </div>
                    <CustomInput
                        type="email"
                        register={register}
                        name="email"
                        errors={errors}
                        title="Email"
                        placeholder="Email"
                    />
                    <CustomInput
                        type="text"
                        register={register}
                        name="phoneNumber"
                        errors={errors}
                        title="S??? ??i???n tho???i"
                        placeholder="S??? ??i???n tho???i"
                    />
                    <CustomDateInput
                        register={register}
                        name="dayOfBirth"
                        errors={errors}
                        title="Ng??y sinh"
                        placeholder="Ng??y sinh"
                    />
                    <button
                        type="submit"
                        className="btn btn-success me-3"
                        disabled={isSubmitting || !isDirty}
                    >
                        {!isSubmitting ? 'C???p nh???t' : <ButtonSpinner />}
                    </button>
                </form>
            </div>
        </div>
    );
};
