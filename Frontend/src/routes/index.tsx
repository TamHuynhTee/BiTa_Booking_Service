import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { NotFound } from '../static/404';
import { HomePage } from '../views/home';
import { RegisterCustomer } from '../views/registerCustomer';
import { defaultRoute } from './defaultRoute';

interface IRoute {
    exact: Boolean;
    path: string;
    child: React.ReactChild | any;
}

const routes: Array<IRoute> = [
    {
        child: (
            <>
                <HomePage />
                <Footer />
            </>
        ),
        path: defaultRoute.UnauthenticatedHome,
        exact: true,
    },
    {
        child: (
            <>
                <RegisterCustomer />
            </>
        ),
        path: defaultRoute.RegisterCustomer,
        exact: true,
    },
];

const renderRoutes = (routes: Array<IRoute>) => {
    return routes.map((r, i) => {
        if (r.exact) {
            return (
                <Route path={r.path} exact key={i}>
                    {r.child}
                </Route>
            );
        } else {
            <Route path={r.path} key={i}>
                {r.child}
            </Route>;
        }
    });
};

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                {renderRoutes(routes)}
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
export default Router;
