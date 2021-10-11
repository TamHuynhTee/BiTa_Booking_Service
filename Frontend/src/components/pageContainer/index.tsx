import React, { ReactChild } from "react";
import "./style.scss";

interface PageContainerProps {
    children?: Array<React.ReactChild> | React.ReactChild;
}

export const PageContainer = (props: PageContainerProps) => {
    return (
        <div className="pageContainer">
            <div className="container">{props.children}</div>
        </div>
    );
};
