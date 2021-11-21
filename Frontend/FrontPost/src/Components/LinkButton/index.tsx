import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

interface LinkButtonProps {
    text: string;
    link: string;
}

export const LinkButton = (props: LinkButtonProps) => {
    return (
        <Link to={props.link} className="linkButton">
            {props.text}
        </Link>
    );
};
