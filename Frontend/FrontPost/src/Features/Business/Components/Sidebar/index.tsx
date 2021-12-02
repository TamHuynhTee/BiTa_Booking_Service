import React from 'react';
import './style.scss';
import logo from '../../../../images/BiTaBusiness.svg';
import { Link } from 'react-router-dom';
import { useHistory, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../../App/auth/slice';
import { selectUser } from '../../../../App/auth/slice/selector';

interface SidebarProps {}

const img = 'https://picsum.photos/seed/picsum/200/300';

export const Sidebar = (props: SidebarProps) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();
    const { url } = useRouteMatch();
    const logOut = () => {
        dispatch(logoutUser());
        history.push('/');
    };
    // console.log(user);
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
                    src={user?.user?.avatar || img}
                    alt="avatar"
                    className="avatar"
                />{' '}
                <h4 className="text-truncate">{user?.business?.displayName}</h4>
            </a>
            <div className="collapse mt-2" id="profileCollapse">
                <ul className="sidebar-links-list">
                    <li>
                        <Link
                            to={`${url}/business-profile`}
                            className="text-truncate"
                        >
                            <SidebarIcon type="bi-person-circle" />
                            Tài khoản doanh nghiệp
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
                    <li>
                        <a data-bs-toggle="collapse" href="#serviceCollapse">
                            <SidebarIcon type="bi-briefcase" /> Dịch vụ
                        </a>
                    </li>
                    <div className="collapse ms-4" id="serviceCollapse">
                        <ul className="sidebar-links-list">
                            <li>
                                <Link
                                    to={`${url}/services`}
                                    className="text-truncate"
                                >
                                    <SidebarIcon type="bi-list" />
                                    Tất cả dịch vụ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${url}/create-service`}
                                    className="text-truncate"
                                >
                                    <SidebarIcon type="bi-plus-lg" />
                                    Tạo dịch vụ mới
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <li>
                        <a data-bs-toggle="collapse" href="#branchCollapse">
                            <SidebarIcon type="bi-building" />
                            Chi nhánh
                        </a>
                    </li>
                    <div className="collapse ms-4" id="branchCollapse">
                        <ul className="sidebar-links-list">
                            <li>
                                <Link
                                    to={`${url}/branches`}
                                    className="text-truncate"
                                >
                                    <SidebarIcon type="bi-list" />
                                    Tất cả chi nhánh
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${url}/create-branch`}
                                    className="text-truncate"
                                >
                                    <SidebarIcon type="bi-plus-lg" />
                                    Tạo chi nhánh mới
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* <li>
                        <Link to={`${url}/customers`} className="text-truncate">
                            <SidebarIcon type="bi-people" />
                            Khách hàng
                        </Link>
                    </li> */}
                    <li>
                        <Link
                            to={`${url}/order-history`}
                            className="text-truncate"
                        >
                            <SidebarIcon type="bi-clock-history" />
                            Lịch sử hẹn
                        </Link>
                    </li>
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
