import React from 'react';
import Slider from 'react-slick';
import './style.scss';
import schedule from '../../images/online-schedule.svg';
import fast from '../../images/fast.svg';
import simple from '../../images/simple.svg';
import wallet from '../../images/wallet.svg';
import user from '../../images/user.svg';
import business from '../../images/business.svg';
import booked from '../../images/booked.svg';
import plan from '../../images/plan.svg';
import { LoginDialog } from '../../components/login';
import { ForgotPassDialog } from '../../components/forgotPassword';

interface HomePageProps {}

export const HomePage = (props: HomePageProps) => {
    return (
        <div className="homepage">
            <div className="homepage-banner">
                <div className="homepage-banner-description">
                    <h1>Đặt lịch hẹn nhanh chóng và đơn giản</h1>
                    <p>
                        BiTa tạo môi trường để khách hàng và các doanh nghiệp
                        tìm thấy nhau, đặt hẹn và thanh toán chỉ trong 5 phút.
                    </p>
                    <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#ChooseAccountModal"
                    >
                        Bắt đầu ngay
                    </button>
                </div>
                <BannerSlider />
            </div>
            <div className="container">
                <div className="row homepage-utilities">
                    <div className="col homepage-utilities-item">
                        <h1>Nhanh chóng</h1>
                        <div className="homepage-utilities-item-image">
                            <img src={fast} alt="" />
                        </div>
                        <p>
                            Chỉ với 5 phút và bạn đã có ngay cuộc gặp với nhà
                            cung cấp.
                        </p>
                    </div>
                    <div className="col homepage-utilities-item">
                        <h1>Đơn giản</h1>
                        <div className="homepage-utilities-item-image">
                            <img src={simple} alt="" />
                        </div>
                        <p>
                            Thao tác đơn giản, tiện lợi, dễ dùng và thân thiện
                            với đa số mọi người.
                        </p>
                    </div>
                    <div className="col homepage-utilities-item">
                        <h1>Tiết kiệm</h1>
                        <div className="homepage-utilities-item-image">
                            <img src={wallet} alt="" />
                        </div>
                        <p>
                            Với việc đặt cọc online, giá cả dịch vụ được giảm
                            đáng kể và rất nhiều khuyến mãi cho khách hàng.
                        </p>
                    </div>
                </div>
            </div>
            <LoginDialog />
            <ForgotPassDialog />
            <ChooseAccountDialog />
        </div>
    );
};

const BannerSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
    };
    return (
        <div className="homepage-banner-image">
            <Slider {...settings}>
                <div className="homepage-banner-image-container">
                    <img src={schedule} alt="" />
                </div>
                <div className="homepage-banner-image-container">
                    <img src={booked} alt="" />
                </div>
                <div className="homepage-banner-image-container">
                    <img src={plan} alt="" />
                </div>
            </Slider>
        </div>
    );
};

const ChooseAccountDialog = () => {
    return (
        <div className="modal fade" id="ChooseAccountModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Chọn tài khoản
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <h1 style={{ textAlign: 'center', color: '#6c63ff' }}>
                            Bạn muốn trở thành
                        </h1>
                        <div className="chooseAccount">
                            <div className="chooseAccount-card">
                                <h2>Khách hàng</h2>
                                <div className="chooseAccount-card-image">
                                    <img src={user} alt="" />
                                </div>
                            </div>
                            <div className="chooseAccount-card">
                                <h2>Đối tác dịch vụ</h2>
                                <div className="chooseAccount-card-image">
                                    <img src={business} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
