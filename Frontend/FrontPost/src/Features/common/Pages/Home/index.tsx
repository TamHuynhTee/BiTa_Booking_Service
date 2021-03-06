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
import {
    selectServices,
    selectLoading,
} from '../../../Business/slice/selector';
import { queryServiceAsync } from '../../../Business/slice/thunk';
import { BusinessCardHome, ServiceCardHome } from '../../Components';
import { selectQueryBusiness } from '../../slice/selector';
import { queryBusinessAsync } from '../../slice/thunk';
import { LoadingComponent } from '../../../../Components';
import './style.scss';

export const HomePage = () => {
    const dispatch = useDispatch();
    const services = useSelector(selectServices);
    const businesses = useSelector(selectQueryBusiness);
    const loading = useSelector(selectLoading);
    React.useEffect(() => {
        dispatch(
            queryServiceAsync({
                limit: 4,
                isActive: true,
                sortBy: 'usage:desc',
            })
        );
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
                                    'Ch??o m???ng b???n ?????n v???i BiTa Booking.',
                                    'Ch??ng t??i t???o ra nh???ng cu???c h???n nhanh ch??ng v?? ti???n l???i nh???t.',
                                    'S??? h??i l??ng c???a b???n ch??nh l?? ni???m vui ?????i v???i ch??ng t??i.',
                                    'C??ng b???t ?????u th??i n??o!',
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
                            BiTa t???o m??i tr?????ng ????? kh??ch h??ng v?? c??c doanh
                            nghi???p t??m th???y nhau, ?????t h???n v?? thanh to??n ch???
                            trong 5 ph??t.
                        </h5>
                        <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#ChooseAccountModal"
                        >
                            B???t ?????u ngay
                        </button>
                    </div>
                </div>
                <BannerSlider />
            </div>
            <div className="container">
                <SectionTitle title="Ti???n ??ch" />
                <div className="row homepage-utilities">
                    <UtilitiesHome
                        title="Nhanh ch??ng"
                        desc="Ch??? v???i 5 ph??t v?? b???n ???? c?? ngay cu???c g???p v???i nh??
                            cung c???p."
                        image={fast}
                    />
                    <UtilitiesHome
                        title="????n gi???n"
                        desc="Thao t??c ????n gi???n, ti???n l???i, d??? d??ng v?? th??n thi???n
                            v???i ??a s??? m???i ng?????i."
                        image={simple}
                    />
                    <UtilitiesHome
                        title="Ti???t ki???m"
                        desc="V???i vi???c ?????t c???c online, gi?? c??? d???ch v??? ???????c gi???m
                            ????ng k??? v?? r???t nhi???u khuy???n m??i cho kh??ch h??ng."
                        image={wallet}
                    />
                </div>
                <SectionTitle title="Nhanh ch??ng ?????t ???????c cu???c h???n" />
                <InstructionHome
                    title="L???a ch???n d???ch v??? ph?? h???p"
                    desc="Ch??ng t??i cung c???p ??a d???ng lo???i h??nh d???ch v??? cho qu??
                        kh??ch l???a ch???n, v???i nh???ng ?????i t??c uy t??n h??ng ?????u. B???n
                        c?? th??? t??m ki???m d???ch v??? m??nh c???n ch??? v???i v??i thao t??c
                        ????n gi???n."
                />
                <InstructionHome
                    title="Ch???n th???i gian ph?? h???p ????? s???p x???p cu???c h???n"
                    desc="M???i d???ch v??? tr??n h??? th???ng ?????u linh ho???t, c?? th??? thay ?????i
                        theo th???i gian c???a kh??ch h??ng."
                />
                <InstructionHome
                    title="Xem l???i cu???c h???n tr??n d??ng th???i gian"
                    desc="M???i cu???c h???n sau khi ???????c ?????t s??? ???????c canh th???i gian ?????
                        nh???c nh??? kh??ch h??ng, sau khi ho??n t???t cu???c h???n s??? ???????c
                        l??u v??o d??ng th???i gian c???a ng?????i d??ng."
                />
                <SectionTitle title="?????i t??c" />
                <div className="d-flex justify-content-between">
                    <Link to="/businesses">Xem t???t c??? {' >'}</Link>
                </div>
                <hr />
                <div className="row">
                    {loading === 'idle' ? (
                        businesses?.results?.map((e: any, i: number) => (
                            <div className="col-lg-3" key={i}>
                                <BusinessCardHome data={e} />
                            </div>
                        ))
                    ) : (
                        <LoadingComponent />
                    )}
                </div>
                <SectionTitle title="M???t s??? d???ch v??? ph??? bi???n" />
                <div className="d-flex justify-content-between">
                    <Link to="/services">Xem t???t c??? {' >'}</Link>
                </div>
                <hr />
                <div className="row">
                    {loading === 'idle' ? (
                        services?.results?.map((e: any, i: number) => (
                            <div className="col-lg-3" key={i}>
                                <ServiceCardHome data={e} />
                            </div>
                        ))
                    ) : (
                        <LoadingComponent />
                    )}
                </div>
                <SectionTitle title="????nh gi?? t??? kh??ch h??ng" />
                <ReviewHome
                    author="Anh T??m"
                    quote="Vi???c ?????t h???n ????? s??? d???ng d???ch v??? ??ang c??ng ng??y c??ng
                            ph??? bi???n tr??n kh???p th??? gi???i. H??? th???ng ??ang ????p ???ng
                            nhu c???u r???t t???t. Nh??? c?? Bita m?? vi???c ?????t h???n r???t
                            nhanh ch??ng v?? ti???n l???i h??n tr?????c nhi???u."
                    avatar={review1}
                />
                <ReviewHome
                    author="Ch?? Hi???u"
                    quote="Nh??? BiTa m?? t??i bi???t ?????n nhi???u lo???i h??nh d???ch v??? h??n. C??c doanh nghi???p tr??n BiTa l??m vi???c r???t nhanh ch??ng v?? ti???n l???i, c?? th??? n??i BiTa ??ang d???n ?????u trong xu th??? ?????t h???n d???ch v??? ??? Vi???t Nam."
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
