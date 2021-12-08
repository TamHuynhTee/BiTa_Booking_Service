import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Profile } from '..';
import { PrivateRoute } from '../../../../routes/privateRoute';
import {
    AdminDashboard,
    AdminStatistics,
    CreateUser,
    UserDetail,
    UserList,
} from '../../../SystemAdmin/pages';
import {
    BusinessDetail,
    BusinessList,
    CategoryDetail,
    CategoryList,
    CreateCategory,
    ManagerDashboard,
    ManagerStatistics,
    Revenue,
} from '../../../SystemManager/pages';
import { Sidebar } from '../../components';
import { selectUser } from '../../slice/selector';
import { getCurrentUserAsync } from '../../slice/thunk';
import './style.scss';

interface Props {}

export const Dashboard = (props: Props) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const { path } = useRouteMatch();
    React.useEffect(() => {
        dispatch(getCurrentUserAsync());
    }, []);
    return (
        <div className="businessDashboard">
            <Sidebar />
            <div className="businessDashboard-content">
                <Switch>
                    <PrivateRoute
                        exact={true}
                        path={`${path}`}
                        option={true}
                        roleRoute={['manager', 'admin']}
                    >
                        {user?.role === 'admin' ? (
                            <AdminDashboard />
                        ) : (
                            <ManagerDashboard />
                        )}
                    </PrivateRoute>
                    <PrivateRoute
                        exact
                        path={`${path}/profile`}
                        option={true}
                        roleRoute={['manager', 'admin']}
                    >
                        <Profile data={user} />
                    </PrivateRoute>
                    <PrivateRoute
                        exact
                        path={`${path}/businesses`}
                        option={true}
                        roleRoute={['manager']}
                    >
                        <BusinessList />
                    </PrivateRoute>
                    <PrivateRoute
                        exact
                        path={`${path}/business/:id`}
                        option={true}
                        roleRoute={['manager']}
                    >
                        <BusinessDetail />
                    </PrivateRoute>
                    <PrivateRoute
                        exact
                        path={`${path}/categories`}
                        option={true}
                        roleRoute={['manager']}
                    >
                        <CategoryList />
                    </PrivateRoute>
                    <PrivateRoute
                        exact
                        path={`${path}/category/:id`}
                        option={true}
                        roleRoute={['manager']}
                    >
                        <CategoryDetail />
                    </PrivateRoute>
                    <PrivateRoute
                        exact
                        path={`${path}/create-category`}
                        option={true}
                        roleRoute={['manager']}
                    >
                        <CreateCategory />
                    </PrivateRoute>
                    <PrivateRoute
                        exact
                        path={`${path}/revenue`}
                        option={true}
                        roleRoute={['manager']}
                    >
                        <Revenue />
                    </PrivateRoute>
                    {/* <Route
                        exact
                        path={`${path}/businesses`}
                        component={BusinessList}
                    /> */}
                    {/* <Route
                        exact
                        path={`${path}/business/:id`}
                        component={BusinessDetail}
                    /> */}
                    {/* <Route
                        exact
                        path={`${path}/categories`}
                        component={CategoryList}
                    />
                    <Route
                        exact
                        path={`${path}/category/:id`}
                        component={CategoryDetail}
                    /> */}
                    {/* <Route
                        exact
                        path={`${path}/create-category`}
                        component={CreateCategory}
                    /> */}
                    {/* <Route exact path={`${path}/revenue`} component={Revenue} /> */}
                    <PrivateRoute
                        exact
                        path={`${path}/users`}
                        option={true}
                        roleRoute={['admin']}
                    >
                        <UserList />
                    </PrivateRoute>
                    <PrivateRoute
                        exact
                        path={`${path}/user/:id`}
                        option={true}
                        roleRoute={['admin']}
                    >
                        <UserDetail />
                    </PrivateRoute>
                    {/* <PrivateRoute
                        exact
                        path={`${path}/create-user`}
                        option={true}
                        roleRoute={['admin']}
                    >
                        <CreateUser />
                    </PrivateRoute> */}
                    {/* <Route exact path={`${path}/users`} component={UserList} /> */}
                    {/* <Route
                        exact
                        path={`${path}/user/:id`}
                        component={UserDetail}
                    />
                    <Route
                        exact
                        path={`${path}/create-user`}
                        component={CreateUser}
                    /> */}
                    <PrivateRoute
                        path={`${path}/statistics`}
                        exact={true}
                        option={true}
                        roleRoute={['manager', 'admin']}
                    >
                        {user?.role === 'admin' ? (
                            <AdminStatistics />
                        ) : (
                            <ManagerStatistics />
                        )}
                    </PrivateRoute>
                </Switch>
            </div>
        </div>
    );
};
