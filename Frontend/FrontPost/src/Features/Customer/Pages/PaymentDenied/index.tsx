import React from 'react';
import { useHistory } from 'react-router';
import logo from '../../../../images/logo_200.svg';

interface Props {}

export const PaymentDenied = (props: Props) => {
    const history = useHistory();

    const handleHome = () => {
        history.push('/home');
    };

    return (
        <div
            className="container d-flex flex-column align-items-center p-5"
            style={{ height: '100vh' }}
        >
            <img src={logo} alt="..." className="mb-5" />
            <h1 className="fw-bold fs-2 mb-3" style={{ color: 'red' }}>
                Thanh toán thất bại
            </h1>
            <button className="btn mb-3" onClick={handleHome}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    fill="currentColor"
                    className="bi bi-x-circle"
                    viewBox="0 0 16 16"
                    color="red"
                >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>
            <h4 className="fw-bold">Nhấn để trở về trang chủ</h4>
        </div>
    );
};
