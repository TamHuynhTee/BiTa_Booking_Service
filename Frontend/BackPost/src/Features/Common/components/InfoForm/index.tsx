import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
    ButtonSpinner,
    CustomInput,
    CustomSelect,
} from '../../../../Components';
import { ProfileInfoSchema } from '../../../../validations/auth';
import { GENDER_OPTIONS } from '../../../../static/options';
import './style.scss';

interface Props {
    info?: any;
}

const thumbnail = 'https://picsum.photos/seed/picsum/200/300';

export const InfoForm = (props: Props) => {
    const { info } = props;
    const avatarInput = React.useRef<any>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: yupResolver(ProfileInfoSchema),
        defaultValues: {
            username: info?.username,
            gender: 'female',
            avatar: info?.avatar,
        },
    });

    const onAvatarClick = () => {
        avatarInput.current.click();
    };

    const showNewAvatar = async () => {
        const validImageTypes = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/svg',
        ];
        if (!validImageTypes.includes(avatarInput.current.files[0].type)) {
            alert('File không phải hình ảnh');
        } else if (avatarInput.current.files && avatarInput.current.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e: any) {
                document
                    .getElementById('user-avatar')!
                    .setAttribute('src', e.target.result);
            };
            reader.readAsDataURL(avatarInput.current.files[0]);
        }
    };

    const onSubmit = (data: any, e: any) => {
        try {
            e.preventDefault();
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('e ', data);
                    resolve(true);
                }, 2000);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3 row">
            <div className="col-md-4">
                {/* avatar */}
                <div className="d-flex flex-column align-items-center">
                    <div className="avatar-container my-3">
                        <img src={thumbnail} id="user-avatar" />
                        <input
                            type="file"
                            id="file"
                            accept=".jpg,.png,.jpeg"
                            ref={avatarInput}
                            onChange={showNewAvatar}
                            hidden
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary mb-3"
                        onClick={onAvatarClick}
                    >
                        Chọn ảnh đại diện
                    </button>
                </div>
            </div>
            <div className="col-md-8">
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
                <CustomInput
                    type="date"
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
            </div>
        </form>
    );
};
