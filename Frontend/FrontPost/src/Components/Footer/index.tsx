import React from 'react';
import './style.scss';
import facebook from '../../images/facebook-icon.svg';
import twitter from '../../images/twitter-icon.svg';
import instagram from '../../images/instagram-icon.svg';
import pinterest from '../../images/pinterest-icon.svg';

interface FooterProps {}

export const Footer = (props: FooterProps) => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer-content">
                    <h1 className="footer-content-logo fw-bold">
                        BITA Booking
                    </h1>
                    <ul className="footer-content-links">
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Services</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                        <li>
                            <a href="#">FAQ</a>
                        </li>
                    </ul>
                    <p className="footer-content-social">Stay in touch</p>
                    <ul className="footer-content-links">
                        <li>
                            <a
                                href="https://www.facebook.com/tamhuynh.260500/"
                                target={'_blank'}
                            >
                                <img src={facebook} alt="" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://twitter.com/_thanhtamhuynh_"
                                target={'_blank'}
                            >
                                {' '}
                                <img src={twitter} alt="" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.instagram.com/tamhuynh2605/"
                                target={'_blank'}
                            >
                                <img src={instagram} alt="" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.pinterest.com/huynhthanhtam2605/_saved/"
                                target={'_blank'}
                            >
                                <img src={pinterest} alt="" />
                            </a>
                        </li>
                    </ul>
                    <p className="footer-content-copyright">
                        &copy; BITA Booking. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};
