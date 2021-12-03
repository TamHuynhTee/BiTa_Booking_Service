import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { BookingManagement } from '../Features/Customer/Pages/BookingManagement';
import { defaultRoute } from './defaultRoute';
import { Booking } from '../Features/Customer/Pages/Booking';
import { Footer, Header } from '../Components';
import {
    BusinessInfo,
    BusinessList,
    HomePage,
    Login,
    Profile,
    RegisterBusiness,
    RegisterCustomer,
    ResetPassword,
    SearchResult,
    ServiceDetail,
    ServiceList,
    VerifyEmail,
} from '../Features/common/Pages';
import { NotFound } from '../static/404';
import { BusinessDashboard } from '../Features/Business/Pages';
import { CustomerHomepage } from '../Features/Customer/Pages/HomePage';
import { PaymentDenied, PaymentSuccess } from '../Features/Customer/Pages';
import { AppointmentHistory } from '../Features/common/Components';

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
                <CustomerHomepage />
                <Footer />
            </>
        ),
        path: defaultRoute.AuthenticatedHome,
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
        path: defaultRoute.Business,
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
    {
        child: (
            <>
                <Header />
                <ServiceList />
                <Footer />
            </>
        ),
        path: defaultRoute.ServiceList,
        exact: true,
    },
    {
        child: (
            <>
                <Header />
                <BusinessList />
                <Footer />
            </>
        ),
        path: defaultRoute.BusinessList,
        exact: true,
    },
    {
        child: (
            <>
                <PaymentSuccess />
            </>
        ),
        path: defaultRoute.PaymentSuccessfully,
        exact: true,
    },
    {
        child: (
            <>
                <PaymentDenied />
            </>
        ),
        path: defaultRoute.PaymentFailed,
        exact: true,
    },
    {
        child: (
            <>
                <Header />
                <AppointmentHistory />
                <Footer />
            </>
        ),
        path: defaultRoute.AppointmentHistory,
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
                {/* business routes */}
                <Route path="/business-dashboard">
                    <BusinessDashboard />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
export default Router;
