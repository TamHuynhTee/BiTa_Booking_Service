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
import { Sidebar } from '../../Components';
import './style.scss';

interface BusinessDashboardProps {}

export const BusinessDashboard = (props: BusinessDashboardProps) => {
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
                    <Route exact path={path}>
                        <DashboardHome business={user?.business?.id} />
                    </Route>
                    <Route exact path={`${path}/services`}>
                        <ServiceList business={user?.business?.id} />
                    </Route>
                    <Route
                        exact
                        path={`${path}/service/:id`}
                        component={ServiceDetail}
                    />
                    <Route exact path={`${path}/create-service`}>
                        <CreateService business={user?.business?.id} />
                    </Route>
                    <Route exact path={`${path}/branches`}>
                        <BranchList business={user?.business?.id} />
                    </Route>
                    <Route
                        exact
                        path={`${path}/branch/:id`}
                        component={BranchDetail}
                    />
                    <Route exact path={`${path}/create-branch`}>
                        <CreateBranch business={user?.business?.id} />
                    </Route>
                    <Route exact path={`${path}/business-profile`}>
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
                    />
                </Switch>
            </div>
        </div>
    );
};
