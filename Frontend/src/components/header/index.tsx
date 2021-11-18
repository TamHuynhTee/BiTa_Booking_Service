import React from 'react';
import './style.scss';
import logo from '../../images/logo.svg';
import { SearchBar } from '..';
import { useHistory } from 'react-router';
import { defaultRoute } from '../../routes/defaultRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../App/auth/slice/selector';
import { getCurrentUserAsync } from '../../App/auth/slice/thunk';
import tempAvatar from '../../images/favicon.svg';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../App/auth/slice';

interface HeaderProps {}

export const Header = (props: HeaderProps) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const onSubmit = (data: any) => {
        history.push({
            pathname: '/search',
            search: `?keyword=${data.keyword}`,
        });
    };
    const user = useSelector(selectUser);
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(getCurrentUserAsync());
        }
    }, []);
    console.log(user);
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
                    {/* <SearchBar placeholder="Tìm kiếm" submit={onSubmit} /> */}
                    {user ? (
                        <div className="dropdown">
                            <a
                                className="d-flex gap-2 align-items-center dropdown-toggle"
                                role="button"
                                id="dropdownMenuLink"
                                data-bs-toggle="dropdown"
                            >
                                <img
                                    src={user?.user?.avatar || tempAvatar}
                                    alt="avatar"
                                    width="48"
                                />
                                <span>{user?.user?.username}</span>
                            </a>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                            >
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
