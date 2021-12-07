import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router';
import {
    BranchDetail,
    BranchList,
    BusinessInfo,
    BusinessProfile,
    CreateBranch,
    CreateService,
    CustomerDetail,
    CustomerList,
    DashboardHome,
    OrderHistory,
    ServiceDetail,
    ServiceList,
    Statistics,
} from '..';
import { selectUser } from '../../../../App/auth/slice/selector';
import { getCurrentUserAsync } from '../../../../App/auth/slice/thunk';
import { PrivateRoute } from '../../../../routes/privateRoute';
import { AppointmentDetailBusiness, Sidebar } from '../../Components';
import './style.scss';

export const BusinessDashboard = () => {
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const user = useSelector(selectUser);
    React.useEffect(() => {
        dispatch(getCurrentUserAsync());
    }, []);

    return (
        <div className="businessDashboard">
            <Sidebar />
            <div className="businessDashboard-content">
                <Switch>
                    <PrivateRoute
                        path={path}
                        option={true}
                        exact={true}
                        roleRoute={['business']}
                    >
                        <DashboardHome business={user?.business?.id} />
                    </PrivateRoute>
                    <PrivateRoute
                        path={`${path}/services`}
                        option={true}
                        exact={true}
                        roleRoute={['business']}
                    >
                        <ServiceList business={user?.business?.id} />
                    </PrivateRoute>
                    <PrivateRoute
                        path={`${path}/service/:id`}
                        option={true}
                        exact={true}
                        roleRoute={['business']}
                    >
                        <ServiceDetail />
                    </PrivateRoute>
                    <PrivateRoute
                        path={`${path}/create-service`}
                        option={true}
                        exact={true}
                        roleRoute={['business']}
                    >
                        <CreateService business={user?.business?.id} />
                    </PrivateRoute>
                    <PrivateRoute
                        path={`${path}/branches`}
                        option={true}
                        exact={true}
                        roleRoute={['business']}
                    >
                        <BranchList business={user?.business?.id} />
                    </PrivateRoute>
                    <PrivateRoute
                        path={`${path}/branch/:id`}
                        option={true}
                        exact={true}
                        roleRoute={['business']}
                    >
                        <BranchDetail />
                    </PrivateRoute>
                    <PrivateRoute
                        path={`${path}/create-branch`}
                        option={true}
                        exact={true}
                        roleRoute={['business']}
                    >
                        <CreateBranch business={user?.business?.id} />
                    </PrivateRoute>
                    <PrivateRoute
                        path={`${path}/business-profile`}
                        option={true}
                        exact={true}
                        roleRoute={['business']}
                    >
                        <BusinessProfile data={user} />
                    </PrivateRoute>
                    <PrivateRoute
                        path={`${path}/order-history`}
                        option={true}
                        exact={true}
                        roleRoute={['business']}
                    >
                        <OrderHistory />
                    </PrivateRoute>
                    <PrivateRoute
                        path={`${path}/statistics`}
                        option={true}
                        exact={true}
                        roleRoute={['business']}
                    >
                        <Statistics business={user?.business?.id} />
                    </PrivateRoute>
                    {/* <Route exact path={path}>
                        <DashboardHome business={user?.business?.id} />
                    </Route> */}
                    {/* <Route exact path={`${path}/services`}>
                        <ServiceList business={user?.business?.id} />
                    </Route> */}
                    {/* <Route
                        exact
                        path={`${path}/service/:id`}
                        component={ServiceDetail}
                    /> */}
                    {/* <Route exact path={`${path}/create-service`}>
                        <CreateService business={user?.business?.id} />
                    </Route> */}
                    {/* <Route exact path={`${path}/branches`}>
                        <BranchList business={user?.business?.id} />
                    </Route>
                    <Route
                        exact
                        path={`${path}/branch/:id`}
                        component={BranchDetail}
                    />
                    <Route exact path={`${path}/create-branch`}>
                        <CreateBranch business={user?.business?.id} />
                    </Route> */}
                    {/* <Route exact path={`${path}/business-profile`}>
                        <BusinessProfile data={user} />
                    </Route>
                    <Route
                        exact
                        path={`${path}/order-history`}
                        component={OrderHistory}
                    />
                    <Route
                        exact
                        path={`${path}/statistics`}
                        component={Statistics}
                    /> */}
                </Switch>
            </div>
            <AppointmentDetailBusiness />
        </div>
    );
};
