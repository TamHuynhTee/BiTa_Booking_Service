import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import Slider from 'react-slick';
import review1 from '../../../../images/avareview1.jpg';
import review2 from '../../../../images/avareview2.jpg';
import booked from '../../../../images/booked.svg';
import fast from '../../../../images/fast.svg';
import schedule from '../../../../images/online-schedule.svg';
import plan from '../../../../images/plan.svg';
import simple from '../../../../images/simple.svg';
import wallet from '../../../../images/wallet.svg';
import { selectServices } from '../../../Business/slice/selector';
import { queryServiceAsync } from '../../../Business/slice/thunk';
import { BusinessCardHome, ServiceCardHome } from '../../Components';
import { selectQueryBusiness } from '../../slice/selector';
import { queryBusinessAsync } from '../../slice/thunk';
import './style.scss';

export const HomePage = () => {
    const dispatch = useDispatch();
    const services = useSelector(selectServices);
    const businesses = useSelector(selectQueryBusiness);
    React.useEffect(() => {
        dispatch(queryServiceAsync({ limit: 4, isActive: true }));
        dispatch(queryBusinessAsync({ limit: 4, isActive: true }));
    }, []);

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
                <SectionTitle title="Đối tác" />
                <div className="d-flex justify-content-between">
                    <Link to="/businesses">Xem tất cả {' >'}</Link>
                </div>
                <hr />
                <div className="row">
                    {businesses?.results?.map((e: any, i: number) => (
                        <div className="col-lg-3" key={i}>
                            <BusinessCardHome data={e} />
                        </div>
                    ))}
                </div>
                <SectionTitle title="Một số dịch vụ phổ biến" />
                <div className="d-flex justify-content-between">
                    <Link to="/services">Xem tất cả {' >'}</Link>
                </div>
                <hr />
                <div className="row">
                    {services?.results?.map((e: any, i: number) => (
                        <div className="col-lg-3" key={i}>
                            <ServiceCardHome data={e} />
                        </div>
                    ))}
                </div>
                <SectionTitle title="Đánh giá từ khách hàng" />
                <ReviewHome
                    author="Anh Tâm"
                    quote="Việc đặt hẹn để sử dụng dịch vụ đang càng ngày càng
                            phổ biến trên khắp thế giới. Hệ thống đang đáp ứng
                            nhu cầu rất tốt. Nhờ có Bita mà việc đặt hẹn rất
                            nhanh chóng và tiện lợi hơn trước nhiều."
                    avatar={review1}
                />
                <ReviewHome
                    author="Chú Hiếu"
                    quote="Nhờ BiTa mà tôi biết đến nhiều loại hình dịch vụ hơn. Các doanh nghiệp trên BiTa làm việc rất nhanh chóng và tiện lợi, có thể nói BiTa đang dẫn đầu trong xu thế đặt hẹn dịch vụ ở Việt Nam."
                    avatar={review2}
                />
            </div>
        </div>
    );
};

const ReviewHome = (props: {
    avatar: string;
    quote: string;
    author: string;
}) => {
    const { avatar, author, quote } = props;
    return (
        <div className="row homepage-reviews">
            <div className="col-4">
                <img
                    src={avatar}
                    alt="..."
                    className="mx-auto d-block"
                    width={200}
                    height={200}
                    style={{ borderRadius: '50%' }}
                />
            </div>
            <div className="col-8 px-5">
                <blockquote className="callout quote EN">
                    {quote}
                    <cite> - {author}</cite>
                </blockquote>
            </div>
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
