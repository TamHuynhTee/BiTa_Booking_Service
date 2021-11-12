import React, { ReactChild } from 'react';
import './style.scss';

interface PageContainerProps {
    children?: Array<React.ReactChild> | React.ReactChild;
}

export const PageContainer = (props: PageContainerProps) => {
    return (
        <div className="pageContainer d-flex">
            <div className="container d-flex flex-column">{props.children}</div>
        </div>
    );
};
