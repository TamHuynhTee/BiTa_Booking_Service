import React from 'react';
import './style.scss';
import logo from '../../../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useHistory, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../slice/selector';
import { logoutUser } from '../../slice';

interface SidebarProps {}

const img = 'https://picsum.photos/seed/picsum/200/300';

export const Sidebar = (props: SidebarProps) => {
    const history = useHistory();
    const { url } = useRouteMatch();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const logOut = () => {
        dispatch(logoutUser());
        history.push('/');
    };
    return (
        <div className="sidebar">
            <div className="sidebar-logo d-flex justify-content-center">
                <img src={logo} alt="" />
            </div>
            <hr />
            <a
                className="profile dropdown-toggle"
                data-bs-toggle="collapse"
                href="#profileCollapse"
            >
                <img
                    src={user?.avatar || img}
                    alt="avatar"
                    className="avatar"
                />{' '}
                <h4 className="text-truncate">{user?.username}</h4>
            </a>
            <div className="collapse mt-2" id="profileCollapse">
                <ul className="sidebar-links-list">
                    <li>
                        <Link to={`${url}/profile`} className="text-truncate">
                            <SidebarIcon type="bi-person-circle" />
                            Tài khoản cá nhân
                        </Link>
                    </li>
                </ul>
            </div>
            <hr />
            <div className="sidebar-links">
                <NavTitle title="Quản lý" />
                <ul className="sidebar-links-list">
                    <li>
                        <Link to={`${url}`} className="text-truncate">
                            <SidebarIcon type="bi-house-door" />
                            Trang chủ
                        </Link>
                    </li>
                    {user?.role === 'manager' ? (
                        <>
                            <li>
                                <Link
                                    to={`${url}/businesses`}
                                    className="text-truncate"
                                >
                                    <SidebarIcon type="bi-building" />
                                    Quản lý doanh nghiệp
                                </Link>
                            </li>
                            <li>
                                <a
                                    data-bs-toggle="collapse"
                                    href="#categoryCollapse"
                                >
                                    <SidebarIcon type="bi-tag" /> Loại dịch vụ
                                </a>
                            </li>
                            <div
                                className="collapse ms-4"
                                id="categoryCollapse"
                            >
                                <ul className="sidebar-links-list">
                                    <li>
                                        <Link
                                            to={`${url}/categories`}
                                            className="text-truncate"
                                        >
                                            <SidebarIcon type="bi-list" />
                                            Tất cả loại dịch vụ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`${url}/create-category`}
                                            className="text-truncate"
                                        >
                                            <SidebarIcon type="bi-plus-lg" />
                                            Tạo loại dịch vụ mới
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <li>
                                <Link
                                    to={`${url}/revenue`}
                                    className="text-truncate"
                                >
                                    <SidebarIcon type="bi-currency-dollar" />
                                    Doanh thu
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <a
                                    data-bs-toggle="collapse"
                                    href="#userCollapse"
                                >
                                    <SidebarIcon type="bi-people" /> Quản lý
                                    người dùng
                                </a>
                            </li>
                            <div className="collapse ms-4" id="userCollapse">
                                <ul className="sidebar-links-list">
                                    <li>
                                        <Link
                                            to={`${url}/users`}
                                            className="text-truncate"
                                        >
                                            <SidebarIcon type="bi-list" />
                                            Tất cả người dùng
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link
                                            to={`${url}/create-user`}
                                            className="text-truncate"
                                        >
                                            <SidebarIcon type="bi-plus-lg" />
                                            Tạo người dùng mới
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                        </>
                    )}
                    <li>
                        <Link
                            to={`${url}/statistics`}
                            className="text-truncate"
                        >
                            <SidebarIcon type="bi-bar-chart-line" />
                            Thống kê
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={logOut}>
                    <i className="bi bi-box-arrow-left me-2" />
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

const NavTitle = (props: { title: string }) => {
    return <h5 className="sidebar-links-title">{props.title}</h5>;
};

const SidebarIcon = (props: { type: string }) => {
    return (
        <i
            className={`bi ${props.type} me-2 fw-bold`}
            style={{ color: '#004a74' }}
        ></i>
    );
};
