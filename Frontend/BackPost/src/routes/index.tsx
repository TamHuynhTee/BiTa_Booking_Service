import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Dashboard, HomePage } from '../Features/Common/pages';

interface Props {}

export const Router = (props: Props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="*" />
            </Switch>
        </BrowserRouter>
    );
};
