import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ColorLabel } from '../../../../Components';
import { ProfileSchema } from '../../../../validations/auth';
import { IUserInfo } from '../../type';

interface UserInfoFormProps {
    data?: IUserInfo;
}

const thumbnail = 'https://cdn.fakercloud.com/avatars/oktayelipek_128.jpg';

export const UserInfoForm = (props: UserInfoFormProps) => {
    const [editAvatar, setEditAvatar] = React.useState(false);
    const avatarInput = React.useRef<any>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        reset,
    } = useForm({
        resolver: yupResolver(ProfileSchema),
        defaultValues: props.data,
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
                setEditAvatar(true);
                document
                    .getElementById('user-avatar')!
                    .setAttribute('src', e.target.result);
            };
            reader.readAsDataURL(avatarInput.current.files[0]);
        }
    };

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
        <div className="d-flex h-100">
            <div className="profile-avatar d-flex flex-column align-items-center">
                <div className="avatar-container mb-3">
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
                {editAvatar && (
                    <button
                        type="button"
                        className="btn btn-success"
                        // onClick={uploadAvatar}
                    >
                        {!isSubmitting ? (
                            'Lưu ảnh'
                        ) : (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        )}
                    </button>
                )}
            </div>
            <div className="profile-info px-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-2">
                        <ColorLabel title="Username" for="username" />
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            disabled
                        />
                    </div>
                    <div className="form-group mb-2">
                        <ColorLabel title="Họ" for="surName" />
                        <input
                            type="text"
                            className="form-control"
                            {...register('surName')}
                            id="surName"
                            placeholder="Họ"
                        />
                        <p className="text-danger">{errors.surName?.message}</p>
                    </div>
                    <div className="form-group mb-2">
                        <ColorLabel title="Tên" for="firstName" />
                        <input
                            type="text"
                            className="form-control"
                            {...register('firstName')}
                            id="firstName"
                            placeholder="Tên"
                        />
                        <p className="text-danger">
                            {errors.firstName?.message}
                        </p>
                    </div>
                    <div className="form-group mb-2">
                        <ColorLabel title="Email" for="email" />
                        <input
                            type="text"
                            className="form-control"
                            {...register('email')}
                            id="email"
                            placeholder="Email"
                        />
                        <p className="text-danger">{errors.email?.message}</p>
                    </div>
                    <div className="form-group mb-2">
                        <ColorLabel title="Số điện thoại" for="phone" />
                        <input
                            type="text"
                            className="form-control"
                            {...register('phone')}
                            id="phone"
                            placeholder="Số điện thoại"
                        />
                        <p className="text-danger">{errors.phone?.message}</p>
                    </div>
                    <div className="form-group mb-2">
                        <ColorLabel title="Giới tính" for="gender" />
                        <select
                            id="gender"
                            className="form-select"
                            {...register('gender')}
                            placeholder="Giới tính"
                        >
                            <option value="m">Nam</option>
                            <option value="f">Nữ</option>
                        </select>
                        <p className="text-danger">{errors.gender?.message}</p>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success me-3"
                        disabled={!isDirty}
                    >
                        {!isSubmitting ? (
                            'Cập nhật'
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
            </div>
        </div>
    );
};
