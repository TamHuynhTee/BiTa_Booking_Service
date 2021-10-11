import React from "react";
import "./style.scss";

interface PageWrapperProps {
    children?: Array<React.ReactChild> | React.ReactChild;
}

export const PageWrapper = (props: PageWrapperProps) => {
    return <div className="pageWrapper">{props.children}</div>;
};
