import React from 'react';
import { ReactChild, useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = (props: { children?: ReactChild | Array<ReactChild> }) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>;
};

export default ScrollToTop;
