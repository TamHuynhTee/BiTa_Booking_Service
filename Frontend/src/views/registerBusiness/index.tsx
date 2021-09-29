import React from 'react';
import './style.scss';

interface RegisterBusinessProps {}

export const RegisterBusiness = (props: RegisterBusinessProps) => {
    return (
        <div className="registerBusiness">
            <div className="registerBusiness-input column-2 full-height"></div>
            <div className="registerBusiness-doodle column-2 full-height"></div>
        </div>
    );
};
