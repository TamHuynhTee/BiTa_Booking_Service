import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Dashboard, HomePage } from '../Features/Common/pages';
import { PrivateRoute } from './privateRoute';

interface Props {}

export const Router = (props: Props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <PrivateRoute
                    path="/dashboard"
                    component={Dashboard}
                    option={true}
                    roleRoute={['admin', 'manager']}
                />
                <Route path="*" />
            </Switch>
        </BrowserRouter>
    );
};
