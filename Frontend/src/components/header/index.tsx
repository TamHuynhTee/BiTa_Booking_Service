import React from 'react';
import './style.scss';
import logo from '../../images/logo.svg';

interface HeaderProps {}

export const Header = (props: HeaderProps) => {
    return (
        <div className="header navbar bg-light">
            <div className="container-fluid">
                {/* left */}
                <div className="header-left">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="" width="80" />
                    </a>
                    <form
                        className="d-flex"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Tìm kiếm dịch vụ"
                            aria-label="Search"
                        />
                        <button
                            className="btn btn-primary header-btn"
                            type="submit"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-search"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </form>
                </div>
                {/* right */}
                <div className="header-right">
                    <div style={{ position: 'relative' }}>
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Dịch vụ
                        </a>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdownMenuLink"
                        >
                            <li>
                                <a className="dropdown-item" href="#">
                                    Cắt tóc
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Làm đẹp
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Sức khỏe
                                </a>
                            </li>
                        </ul>
                    </div>

                    <button
                        type="button"
                        className="btn btn-outline-dark"
                        data-bs-toggle="modal"
                        data-bs-target="#LoginModal"
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
                </div>
            </div>
        </div>
    );
};
