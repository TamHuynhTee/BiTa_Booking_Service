import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Profile } from '..';
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
                    <Route exact path={`${path}`}>
                        {user?.role === 'admin' ? (
                            <AdminDashboard />
                        ) : (
                            <ManagerDashboard />
                        )}
                    </Route>
                    <Route exact path={`${path}/profile`}>
                        <Profile data={user} />
                    </Route>
                    <Route
                        exact
                        path={`${path}/businesses`}
                        component={BusinessList}
                    />
                    <Route
                        exact
                        path={`${path}/business/:id`}
                        component={BusinessDetail}
                    />
                    <Route
                        exact
                        path={`${path}/categories`}
                        component={CategoryList}
                    />
                    <Route
                        exact
                        path={`${path}/category/:id`}
                        component={CategoryDetail}
                    />
                    <Route
                        exact
                        path={`${path}/create-category`}
                        component={CreateCategory}
                    />
                    <Route exact path={`${path}/revenue`} component={Revenue} />
                    <Route exact path={`${path}/users`} component={UserList} />
                    <Route
                        exact
                        path={`${path}/user/:id`}
                        component={UserDetail}
                    />
                    <Route
                        exact
                        path={`${path}/create-user`}
                        component={CreateUser}
                    />
                    <Route exact path={`${path}/statistics`}>
                        {user?.role === 'admin' ? (
                            <AdminStatistics />
                        ) : (
                            <ManagerStatistics />
                        )}
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
