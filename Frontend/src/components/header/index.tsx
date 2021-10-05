import React from "react";
import "./style.scss";
import logo from "../../images/logo.svg";

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
                </div>
                {/* right */}
                <div className="header-right">
                    <div style={{ position: "relative" }}>
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
