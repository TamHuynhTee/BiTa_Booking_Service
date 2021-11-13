import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { BookingManagement } from '../Features/Customer/Pages/BookingManagement';
import { defaultRoute } from './defaultRoute';
import { Booking } from '../Features/Customer/Pages/Booking';
import { Footer, Header } from '../Components';
import {
    BusinessInfo,
    HomePage,
    Login,
    Profile,
    RegisterBusiness,
    RegisterCustomer,
    ResetPassword,
    SearchResult,
    ServiceDetail,
} from '../Features/common/Pages';
import { NotFound } from '../static/404';
import { VerifyEmail } from '../Features/common/Pages/verifyEmail';

interface IRoute {
    exact: Boolean;
    path: string;
    child: React.ReactChild | any;
}

const routes: Array<IRoute> = [
    {
        child: (
            <>
                <Header />
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
    {
        child: (
            <>
                <Login />
            </>
        ),
        path: defaultRoute.Login,
        exact: true,
    },
    {
        child: (
            <>
                <VerifyEmail />
            </>
        ),
        path: defaultRoute.VerifyEmail,
        exact: true,
    },
    {
        child: (
            <>
                <ResetPassword />
            </>
        ),
        path: defaultRoute.ResetPassword,
        exact: true,
    },
    {
        child: (
            <>
                <RegisterBusiness />
            </>
        ),
        path: defaultRoute.RegisterBusiness,
        exact: true,
    },
    {
        child: (
            <>
                <Header />
                <SearchResult />
                <Footer />
            </>
        ),
        path: defaultRoute.Search,
        exact: true,
    },
    {
        child: (
            <>
                <Header />
                <Profile />
            </>
        ),
        path: defaultRoute.Profile,
        exact: true,
    },
    {
        child: (
            <>
                <Header />
                <ServiceDetail />
                <Footer />
            </>
        ),
        path: defaultRoute.Service,
        exact: true,
    },
    {
        child: (
            <>
                <Header />
                <BusinessInfo />
                <Footer />
            </>
        ),
        path: defaultRoute.Company,
        exact: true,
    },
    {
        child: (
            <>
                <Header />
                <BookingManagement />
                <Footer />
            </>
        ),
        path: defaultRoute.BookManagement,
        exact: true,
    },
    {
        child: (
            <>
                <Header />
                <Booking />
                <Footer />
            </>
        ),
        path: defaultRoute.Book,
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
