import React from 'react';
import { useHistory } from 'react-router';
import logo from '../../../../images/logo_200.svg';

interface Props {}

export const PaymentSuccess = (props: Props) => {
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
            <h1 className="fw-bold fs-2 mb-3" style={{ color: 'green' }}>
                Đã thanh toán thành công
            </h1>
            <button className="btn mb-3" onClick={handleHome}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    fill="currentColor"
                    className="bi bi-check-circle"
                    viewBox="0 0 16 16"
                    color="green"
                >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                </svg>
            </button>
            <h4 className="fw-bold">Nhấn để trở về trang chủ</h4>
        </div>
    );
};
