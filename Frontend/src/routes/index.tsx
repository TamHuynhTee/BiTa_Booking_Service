import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import { NotFound } from "../static/404";
import { BusinessInfo } from "../Features/common/Pages/businessInfo";
import { HomePage } from "../Features/common/Pages/home";
import { BookingManagement } from "../Features/Front_Office/Customer/Pages/bookingManagement";
import { Profile } from "../Features/common/Pages/profile";
import { RegisterBusiness } from "../Features/common/Pages/registerBusiness";
import { RegisterCustomer } from "../Features/common/Pages/registerCustomer";
import { SearchResult } from "../Features/common/Pages/search";
import { ServiceDetail } from "../Features/common/Pages/serviceDetail";
import { defaultRoute } from "./defaultRoute";

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
