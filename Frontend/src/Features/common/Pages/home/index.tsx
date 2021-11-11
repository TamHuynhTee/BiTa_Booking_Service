import React from 'react';
import Slider from 'react-slick';
import './style.scss';
import schedule from '../../../../images/online-schedule.svg';
import fast from '../../../../images/fast.svg';
import simple from '../../../../images/simple.svg';
import wallet from '../../../../images/wallet.svg';
import user from '../../../../images/user.svg';
import business from '../../../../images/business.svg';
import booked from '../../../../images/booked.svg';
import plan from '../../../../images/plan.svg';
import { LoginDialog } from '../../../../Components/Login';
import { ForgotPassDialog } from '../../../../Components/ForgotPassword';
import { defaultRoute } from '../../../../routes/defaultRoute';
import { useHistory } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';

interface HomePageProps {}

export const HomePage = (props: HomePageProps) => {
    return (
        <div className="homepage">
            <div className="homepage-banner">
                <div className="homepage-banner-description">
                    <div
                        style={{ flex: '1' }}
                        className="d-flex justify-content-center flex-column"
                    >
                        <h1>
                            <Typewriter
                                words={[
                                    'Chào mừng bạn đến với BiTa Booking.',
                                    'Chúng tôi tạo ra những cuộc hẹn nhanh chóng và tiện lợi nhất.',
                                    'Sự hài lòng của bạn chính là niềm vui đối với chúng tôi.',
                                    'Cùng bắt đầu thôi nào!',
                                ]}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                typeSpeed={90}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                        </h1>
                    </div>
                    <div
                        style={{ flex: '1' }}
                        className="d-flex justify-content-center flex-column gap-3"
                    >
                        <h5 style={{ textAlign: 'justify' }}>
                            BiTa tạo môi trường để khách hàng và các doanh
                            nghiệp tìm thấy nhau, đặt hẹn và thanh toán chỉ
                            trong 5 phút.
                        </h5>
                        <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#ChooseAccountModal"
                        >
                            Bắt đầu ngay
                        </button>
                    </div>
                </div>
                <BannerSlider />
            </div>
            <div className="container">
                <SectionTitle title="Tiện ích" />
                <div className="row homepage-utilities">
                    <UtilitiesHome
                        title="Nhanh chóng"
                        desc="Chỉ với 5 phút và bạn đã có ngay cuộc gặp với nhà
                            cung cấp."
                        image={fast}
                    />
                    <UtilitiesHome
                        title="Đơn giản"
                        desc="Thao tác đơn giản, tiện lợi, dễ dùng và thân thiện
                            với đa số mọi người."
                        image={simple}
                    />
                    <UtilitiesHome
                        title="Tiết kiệm"
                        desc="Với việc đặt cọc online, giá cả dịch vụ được giảm
                            đáng kể và rất nhiều khuyến mãi cho khách hàng."
                        image={wallet}
                    />
                </div>
                <SectionTitle title="Nhanh chóng đặt được cuộc hẹn" />
                <InstructionHome
                    title="Lựa chọn dịch vụ phù hợp"
                    desc="Chúng tôi cung cấp đa dạng loại hình dịch vụ cho quý
                        khách lựa chọn, với những đối tác uy tín hàng đầu. Bạn
                        có thể tìm kiếm dịch vụ mình cần chỉ với vài thao tác
                        đơn giản."
                />
                <InstructionHome
                    title="Chọn thời gian phù hợp để sắp xếp cuộc hẹn"
                    desc="Mọi dịch vụ trên hệ thống đều linh hoạt, có thể thay đổi
                        theo thời gian của khách hàng."
                />
                <InstructionHome
                    title="Xem lại cuộc hẹn trên dòng thời gian"
                    desc="Mọi cuộc hẹn sau khi được đặt sẽ được canh thời gian để
                        nhắc nhở khách hàng, sau khi hoàn tất cuộc hẹn sẽ được
                        lưu vào dòng thời gian của người dùng."
                />
                <SectionTitle title="Các loại hình dịch vụ" />
                <div></div>
                <SectionTitle title="Đối tác" />
                <SectionTitle title="Một số dịch vụ" />
                <SectionTitle title="Đánh giá từ khách hàng" />
            </div>
            <LoginDialog />
            <ForgotPassDialog />
            <ChooseAccountDialog />
        </div>
    );
};

const UtilitiesHome = (props: { title: string; desc: string; image: any }) => {
    return (
        <div className="col homepage-utilities-item">
            <h1>{props.title}</h1>
            <div className="homepage-utilities-item-image">
                <img src={props.image} alt="" />
            </div>
            <h5>{props.desc}</h5>
        </div>
    );
};

const InstructionHome = (props: { title: string; desc: string }) => {
    return (
        <div className="row homepage-instruction">
            <h4 className="homepage-instruction-title">{props.title}</h4>
            <h5 className="homepage-instruction-description">{props.desc}</h5>
        </div>
    );
};

const SectionTitle = (props: { title: string }) => {
    return <h1 className="sectionTitle">{props.title}</h1>;
};

const BannerSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
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
    const history = useHistory();
    return (
        <div className="modal fade" id="ChooseAccountModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Chọn tài khoản</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body p-4">
                        <h1 style={{ textAlign: 'center', color: '#6c63ff' }}>
                            Bạn muốn trở thành
                        </h1>
                        <div className="chooseAccount">
                            <div
                                className="chooseAccount-card"
                                data-bs-dismiss="modal"
                                onClick={() =>
                                    history.push(defaultRoute.RegisterCustomer)
                                }
                            >
                                <h2>Khách hàng</h2>
                                <div className="chooseAccount-card-image">
                                    <img src={user} alt="" />
                                </div>
                            </div>
                            <div
                                className="chooseAccount-card"
                                data-bs-dismiss="modal"
                                onClick={() =>
                                    history.push(defaultRoute.RegisterBusiness)
                                }
                            >
                                <h2>Đối tác</h2>
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
