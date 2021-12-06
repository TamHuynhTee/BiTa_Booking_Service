import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, RouteProps, useHistory } from 'react-router';
import { HashLoader } from 'react-spinners';
import { setNeedAuth } from '../Features/Common/slice';
import { selectUser } from '../Features/Common/slice/selector';
import { getCurrentUserAsync } from '../Features/Common/slice/thunk';
import { notifyError } from '../utils/notify';

interface Props extends RouteProps {
    roleRoute?: Array<string>;
    option?: boolean;
}

export const PrivateRoute = (props: Props) => {
    const { roleRoute, option } = props;
    const history = useHistory();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const fetchAuth = async () => {
        const res: any = await dispatch(getCurrentUserAsync());
        console.log(res);
        if (res && !res.payload) {
            if (option) {
                dispatch(setNeedAuth(true));
                history.push('/');
                notifyError('Vui lòng đăng nhập để tiếp tục');
            }
        } else {
            //đã đăng nhập
            if (roleRoute && !roleRoute.includes(res.payload.user.role)) {
                dispatch(setNeedAuth(true));
                history.push('/');
                notifyError('Bạn không được xác thực để vào trang này');
            }
            // else {
            //     if (option === false) {
            //         history.push('/login');
            //     }
            // }
        }
    };
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) fetchAuth();
        else {
            notifyError('Vui lòng đăng nhập để tiếp tục');
            history.push('/');
        }
    }, []);

    if (user) return <Route {...props} />;
    else
        return (
            <div className="loading-container">
                <HashLoader size={50} loading={true} color={'#3fa3db'} />
            </div>
        );
};
