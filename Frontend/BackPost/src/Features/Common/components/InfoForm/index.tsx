import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
    ButtonSpinner,
    CustomDateInput,
    CustomInput,
    CustomSelect,
} from '../../../../Components';
import { ProfileInfoSchema } from '../../../../validations/auth';
import { GENDER_OPTIONS } from '../../../../static/options';
import './style.scss';
import { updateProfileApi } from '../../apis/auth.api';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { AvatarFrame } from '..';
import { useDispatch } from 'react-redux';
import { getCurrentUserAsync } from '../../slice/thunk';

interface Props {
    info?: any;
}

export const InfoForm = (props: Props) => {
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
                    console.log(data);
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
                        title="Tên đăng nhập"
                        placeholder="Tên đăng nhập"
                    />
                    <div className="input-group gap-3">
                        <CustomInput
                            type="text"
                            register={register}
                            name="surName"
                            errors={errors}
                            title="Họ"
                            placeholder="Họ"
                        />
                        <CustomInput
                            type="text"
                            register={register}
                            name="firstName"
                            errors={errors}
                            title="Tên"
                            placeholder="Tên"
                        />
                        <CustomSelect
                            options={GENDER_OPTIONS}
                            register={register}
                            name="gender"
                            errors={errors}
                            title="Giới tính"
                            placeholder="Giới tính"
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
                        title="Số điện thoại"
                        placeholder="Số điện thoại"
                    />
                    <CustomDateInput
                        register={register}
                        name="dayOfBirth"
                        errors={errors}
                        title="Ngày sinh"
                        placeholder="Ngày sinh"
                    />
                    <button
                        type="submit"
                        className="btn btn-success me-3"
                        disabled={isSubmitting || !isDirty}
                    >
                        {!isSubmitting ? 'Cập nhật' : <ButtonSpinner />}
                    </button>
                </form>
            </div>
        </div>
    );
};
