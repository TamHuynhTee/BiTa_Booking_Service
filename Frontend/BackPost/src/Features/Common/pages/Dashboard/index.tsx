import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import { DashboardHome, Profile } from '..';
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
    console.log(user);
    return (
        <div className="businessDashboard">
            <Sidebar />
            <div className="businessDashboard-content">
                <Switch>
                    <Route exact path={`${path}`} component={DashboardHome} />
                    <Route exact path={`${path}/profile`}>
                        <Profile data={user} />
                    </Route>
                    <Route
                        exact
                        path={`${path}/businesses`}
                        component={DashboardHome}
                    />
                    <Route
                        exact
                        path={`${path}/business/:id`}
                        component={DashboardHome}
                    />
                    <Route
                        exact
                        path={`${path}/categories`}
                        component={DashboardHome}
                    />
                    <Route
                        exact
                        path={`${path}/category/:id`}
                        component={DashboardHome}
                    />
                    <Route
                        exact
                        path={`${path}/create-category`}
                        component={DashboardHome}
                    />
                    <Route
                        exact
                        path={`${path}/revenue`}
                        component={DashboardHome}
                    />
                    <Route
                        exact
                        path={`${path}/users`}
                        component={DashboardHome}
                    />
                    <Route
                        exact
                        path={`${path}/user/:id`}
                        component={DashboardHome}
                    />
                    <Route
                        exact
                        path={`${path}/create-user`}
                        component={DashboardHome}
                    />
                    <Route
                        exact
                        path={`${path}/statistics`}
                        component={DashboardHome}
                    />
                </Switch>
            </div>
        </div>
    );
};
