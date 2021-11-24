import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { changeUserAccessApi } from '../../apis/systemadmin.api';
import { selectDetailUser } from '../../slice/selector';
import { getUserByIdAsync } from '../../slice/thunk';

interface Props {}

const thumbnail = 'https://picsum.photos/seed/picsum/200/300';

export const UserDetail = (props: Props) => {
    const { id } = useParams<any>();
    const dispatch = useDispatch();
    const history = useHistory();
    React.useEffect(() => {
        dispatch(getUserByIdAsync({ userId: id }));
    }, []);
    const user = useSelector(selectDetailUser);

    const handleChangeAccess = async () => {
        const result = await changeUserAccessApi({ userId: user?.id });
        console.log(result);
        if (result.code === 200) {
            notifySuccess(result.message);
            history.push('/dashboard/users');
        } else {
            notifyError(result.message);
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <h4>Thông tin người dùng</h4>
                <a
                    className="card-text text-end"
                    style={{
                        cursor: 'pointer',
                        textDecoration: 'none',
                    }}
                    onClick={() => history.push('/dashboard/users')}
                >
                    {'< '}Trở về
                </a>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center">
                        <div className="avatar-container my-3">
                            <img src={user?.avatar || thumbnail} />
                        </div>
                        <button
                            className={`btn btn-${
                                user?.isActive ? 'danger' : 'success'
                            }`}
                            onClick={handleChangeAccess}
                        >
                            {user?.isActive
                                ? 'Chặn truy cập'
                                : 'Cho phép truy cập'}
                        </button>
                    </div>
                </div>
                <div className="col-md-8">
                    <label>Username</label>
                    <input
                        disabled
                        className="form-control mb-3"
                        value={user?.username}
                        placeholder="Tên đăng nhập"
                    />
                    <div className="input-group gap-3">
                        <div>
                            <label>Họ</label>
                            <input
                                disabled
                                className="form-control mb-3"
                                value={user?.surName}
                                placeholder="Họ"
                            />
                        </div>
                        <div>
                            <label>Tên</label>
                            <input
                                disabled
                                className="form-control mb-3"
                                value={user?.firstName}
                                placeholder="Tên"
                            />
                        </div>
                        <div>
                            <label>Giới tính</label>
                            <input
                                disabled
                                className="form-control mb-3"
                                value={user?.gender === 'male' ? 'Nam' : 'Nữ'}
                                placeholder="Giới tính"
                            />
                        </div>
                    </div>
                    <label>Email</label>
                    <input
                        disabled
                        className="form-control mb-3"
                        value={user?.email}
                        placeholder="Email"
                    />
                    <label>Số điện thoại</label>
                    <input
                        disabled
                        className="form-control mb-3"
                        value={user?.phoneNumber}
                        placeholder="Số điện thoại"
                    />
                    <label>Ngày sinh</label>
                    <input
                        disabled
                        className="form-control mb-3"
                        value={user?.dayOfBirth}
                        placeholder="Ngày sinh"
                    />
                </div>
            </div>
        </div>
    );
};
