import React from 'react';
import './style.scss';
import logo from '../../../../images/logo.svg';
import { LoginForm } from '../../components';

interface Props {}

export const HomePage = (props: Props) => {
    return (
        <div className="homePage container d-flex flex-column align-items-center p-5">
            <div className="my-3">
                <img src={logo} alt="logo" width={200} />
            </div>
            <div className="my-2">
                <h3 className="text-center my-3">ĐĂNG NHẬP</h3>
            </div>
            <LoginForm />
        </div>
    );
};
