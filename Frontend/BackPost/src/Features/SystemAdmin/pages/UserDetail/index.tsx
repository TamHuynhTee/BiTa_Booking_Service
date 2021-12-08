import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { ButtonSpinner } from '../../../../Components';
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
    const [loading, setLoading] = React.useState(false);
    const handleChangeAccess = () => {
        if (confirm('Bạn chắc muốn thay đổi quyền truy cập chứ?')) {
            setLoading(true);
            return new Promise((res) => {
                setTimeout(async () => {
                    const result = await changeUserAccessApi({
                        userId: user?.id,
                    });
                    if (result.code === 200) {
                        notifySuccess(result.message);
                        history.push('/dashboard/users');
                    } else {
                        notifyError(result.message);
                    }
                }, 2000);
                res(() => setLoading(false));
            });
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
                            {loading ? (
                                <ButtonSpinner />
                            ) : user?.isActive ? (
                                'Chặn truy cập'
                            ) : (
                                'Cho phép truy cập'
                            )}
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
