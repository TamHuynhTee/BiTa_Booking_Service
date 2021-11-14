import React from 'react';
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
    ServiceList,
    Statistics,
} from '..';
import { ServiceDetail } from '../../../common/Pages';
import { Sidebar } from '../../Components';
import './style.scss';

interface BusinessDashboardProps {}

export const BusinessDashboard = (props: BusinessDashboardProps) => {
    const { path } = useRouteMatch();
    return (
        <div className="businessDashboard">
            <Sidebar />
            <div className="businessDashboard-content">
                <Switch>
                    <Route exact path={path} component={DashboardHome} />
                    <Route
                        exact
                        path={`${path}/services`}
                        component={ServiceList}
                    />
                    <Route
                        exact
                        path={`${path}/service/:id`}
                        component={ServiceDetail}
                    />
                    <Route
                        exact
                        path={`${path}/create-service`}
                        component={CreateService}
                    />
                    <Route
                        exact
                        path={`${path}/branches`}
                        component={BranchList}
                    />
                    <Route
                        exact
                        path={`${path}/branch/:id`}
                        component={BranchDetail}
                    />
                    <Route
                        exact
                        path={`${path}/create-branch`}
                        component={CreateBranch}
                    />
                    <Route
                        exact
                        path={`${path}/customers`}
                        component={CustomerList}
                    />
                    <Route
                        exact
                        path={`${path}/customer/:id`}
                        component={CustomerDetail}
                    />
                    <Route
                        exact
                        path={`${path}/business-info`}
                        component={BusinessInfo}
                    />
                    <Route
                        exact
                        path={`${path}/business-profile`}
                        component={BusinessProfile}
                    />
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
