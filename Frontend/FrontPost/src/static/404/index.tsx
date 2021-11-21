import React from 'react';
import { useHistory } from 'react-router';
import notFound from '../../images/not_found.svg';
import { defaultRoute } from '../../routes/defaultRoute';
import './style.scss';

export const NotFound = () => {
    const history = useHistory();
    return (
        <div className="notFound">
            <div className="container">
                <div className="notFound-image">
                    <img src={notFound} alt="" />
                </div>
                <div className="notFound-description">
                    <h2>LỖI !!!</h2>
                    <p>
                        Có vẻ như bạn lạc đường rồi, hãy kiểm tra lại URL của
                        mình.
                    </p>
                    <button
                        className="btn btn-outline-dark"
                        onClick={() =>
                            history.push(defaultRoute.UnauthenticatedHome)
                        }
                    >
                        Trở về trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
};
