import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ButtonSpinner } from '../../../../Components';
import storage from '../../../../firebase';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { updateAvatarApi } from '../../apis/auth.api';
import { getCurrentUserAsync } from '../../slice/thunk';

const thumbnail = 'https://picsum.photos/seed/picsum/200/300';

export const AvatarFrame = (props: { avatar?: string }) => {
    const dispatch = useDispatch();
    const { avatar } = props;
    const avatarInput = React.useRef<any>(null);
    const [editAvatar, setEditAvatar] = React.useState(false);
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();
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

    const uploadAvatar = (data: any, e: any) => {
        e.preventDefault();
        const storageRef = ref(
            storage,
            'avatar/' + avatarInput.current.files[0].name
        );
        const uploadTask = uploadBytesResumable(
            storageRef,
            avatarInput.current.files[0]
        );
        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    async (downloadURL) => {
                        const result = await updateAvatarApi({
                            avatar: downloadURL,
                        });
                        if (result.code === 200) {
                            notifySuccess(result.message);
                            setEditAvatar(false);
                            dispatch(getCurrentUserAsync());
                        } else {
                            notifyError(result.message);
                        }
                    }
                );
            }
        );
    };

    return (
        <form
            className="d-flex flex-column align-items-center"
            onSubmit={handleSubmit(uploadAvatar)}
        >
            <div className="avatar-container my-3">
                <img src={avatar || thumbnail} id="user-avatar" />
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
                <button type="submit" className="btn btn-success">
                    {!isSubmitting ? 'Lưu ảnh' : <ButtonSpinner />}
                </button>
            )}
        </form>
    );
};
