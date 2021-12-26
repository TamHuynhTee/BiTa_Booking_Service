import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../App/auth/slice';
import { selectUser } from '../../App/auth/slice/selector';
import { getCurrentUserAsync } from '../../App/auth/slice/thunk';
import { selectNewReviews } from '../../Features/Customer/slice/selector';
import { countNewReviewsAsync } from '../../Features/Customer/slice/thunk';
import tempAvatar from '../../images/favicon.svg';
import logo from '../../images/logo.svg';
import { defaultRoute } from '../../routes/defaultRoute';
import './style.scss';

export const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const newReviews = useSelector(selectNewReviews);
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(getCurrentUserAsync());
        }
        dispatch(countNewReviewsAsync());
    }, []);

    if (user?.user?.role === 'business') {
        history.push('/business-dashboard');
    }

    const logout = () => {
        dispatch(logoutUser());
        history.push(defaultRoute.UnauthenticatedHome);
    };
    return (
        <div className="header navbar">
            <div className="container-fluid">
                {/* left */}
                <div className="header-left">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="" width="80" />
                    </a>
                </div>
                {/* right */}
                <div className="header-right">
                    <ul className="navbar">
                        <li className="nav-item">
                            <Link to="/services" className="nav-link">
                                Dịch vụ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/businesses" className="nav-link">
                                Doanh nghiệp
                            </Link>
                        </li>
                    </ul>
                    {user ? (
                        <>
                            <div className="dropdown">
                                <a
                                    className="d-flex fw-bold gap-2 align-items-center dropdown-toggle"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    style={{
                                        textDecoration: 'none',
                                        fontSize: '1.25rem',
                                    }}
                                >
                                    <button
                                        className="position-relative"
                                        style={{ background: 'inherit' }}
                                    >
                                        <img
                                            src={
                                                user?.user?.avatar || tempAvatar
                                            }
                                            alt="avatar"
                                            width="48"
                                            height="48"
                                            style={{ borderRadius: '50%' }}
                                        />
                                        {newReviews !== 0 && (
                                            <span className="position-absolute bottom-0 end-0 p-2 bg-danger border border-light rounded-circle" />
                                        )}
                                    </button>
                                    <span>{user?.user?.username}</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link
                                            to="/home"
                                            className="dropdown-item"
                                        >
                                            Lịch hẹn của tôi{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/appointment-history"
                                            className="dropdown-item"
                                        >
                                            Lịch sử cuộc hẹn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/reviews"
                                            className="dropdown-item"
                                        >
                                            Đánh giá{' '}
                                            {newReviews !== 0 && (
                                                <span className="badge bg-danger">
                                                    {newReviews}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/profile"
                                            className="dropdown-item"
                                        >
                                            Thông tin cá nhân
                                        </Link>
                                    </li>
                                    <li>
                                        <hr />
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            onClick={logout}
                                        >
                                            Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={() => history.push(defaultRoute.Login)}
                            >
                                Đăng nhập
                            </button>
                            <button
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#ChooseAccountModal"
                            >
                                Đăng ký
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
