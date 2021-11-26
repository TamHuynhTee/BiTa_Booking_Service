import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Slider from 'react-slick';
import { ServiceCard } from '../../../../Components/ServiceCard';
import { PageContainer } from '../../../../Components/PageContainer';
import { PageWrapper } from '../../../../Components/PageWrapper';
import './style.scss';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
    getBranchesByServiceAsync,
    getServiceDetailAsync,
} from '../../slice/thunk';
import { selectServiceBranch, selectServiceDetail } from '../../slice/selector';
import { moneyFormatter } from '../../../../utils/moneyFormatter';
import { weekDayFormatter } from '../../../../utils/weekDayFormatter';
import { timeFormatter } from '../../../../utils/timeFormatter';

interface ServiceDetailProps {}

export const ServiceDetail = (props: ServiceDetailProps) => {
    const history = useHistory();
    const { id } = useParams<any>();
    const dispatch = useDispatch();
    const service = useSelector(selectServiceDetail);
    const branches = useSelector(selectServiceBranch);

    React.useEffect(() => {
        dispatch(getServiceDetailAsync({ serviceId: id }));
        dispatch(getBranchesByServiceAsync({ serviceId: id }));
    }, []);

    const handleBook = () => {
        history.push(`/book/${id}`);
    };

    return (
        <PageContainer>
            <PageWrapper className="serviceDetail-wrapper ps-5 pe-5 pt-3 pb-3 mb-5 bg-body rounded">
                <div className="serviceDetail-wrapper-header">
                    <h1 className="text-truncate fw-bold">Chi tiết dịch vụ</h1>
                    <div className="btn-group flex-grow-1">
                        <button
                            className="btn btn-success"
                            onClick={handleBook}
                        >
                            Đặt hẹn ngay
                        </button>
                    </div>
                </div>
                <div className="serviceDetail-wrapper-body">
                    <ul>
                        <li className="mb-3">
                            <label>
                                <span className="badge bg-primary me-3 fs-5">
                                    <i className="bi bi-bookmark"></i>
                                </span>
                                <span className="badge bg-primary fs-5">
                                    Dịch vụ
                                </span>
                            </label>
                            <h2 className="fw-bold mt-2">{service?.name}</h2>
                            <img
                                src={service?.image}
                                alt="..."
                                className="img-fluid img-thumbnail"
                            />
                        </li>
                        <li>
                            <label>
                                <span className="badge bg-primary me-3 fs-5">
                                    <i className="bi bi-building"></i>
                                </span>
                                <span className="badge bg-primary fs-5">
                                    Nhà cung cấp dịch vụ
                                </span>
                            </label>
                            <Supplier data={service?.business} />
                        </li>
                        <li>
                            <label>
                                <span className="badge bg-primary me-3 fs-5">
                                    <i className="bi bi-bookmark"></i>
                                </span>
                                <span className="badge bg-primary fs-5">
                                    Mô tả dịch vụ
                                </span>
                            </label>
                            <p>{service?.description}</p>
                        </li>
                        <li>
                            <label>
                                <span className="badge bg-primary me-3 fs-5">
                                    <i className="bi bi-list"></i>
                                </span>
                                <span className="badge bg-primary fs-5">
                                    Loại
                                </span>
                            </label>
                            <div className="d-flex mt-3 mb-3 gap-3">
                                <span className="badge rounded-pill bg-secondary">
                                    {service?.category?.name}
                                </span>
                            </div>
                        </li>
                        <li>
                            <label>
                                <span className="badge bg-success me-3 fs-5">
                                    <i className="bi bi-cash-coin"></i>
                                </span>
                                <span className="badge bg-success fs-5">
                                    Giá cả
                                </span>
                            </label>
                            <p>{moneyFormatter(service?.price)}</p>
                        </li>
                        <li>
                            <label>
                                <span className="badge bg-success me-3 fs-5">
                                    <i className="bi bi-credit-card"></i>
                                </span>
                                <span className="badge bg-success fs-5">
                                    Đặt cọc
                                </span>
                            </label>
                            <p>
                                {service?.hasDeposit
                                    ? moneyFormatter(service?.depositPrice)
                                    : 'Không có'}
                            </p>
                        </li>
                        <li>
                            <label>
                                <span className="badge bg-info me-3 fs-5">
                                    <i className="bi bi-calendar-week"></i>
                                </span>
                                <span className="badge bg-info fs-5">
                                    Lịch làm việc
                                </span>
                            </label>
                            {service?.schedule?.map((e: any, i: number) => (
                                <p key={i}>
                                    <label>
                                        {weekDayFormatter(e.weekDay)}:
                                    </label>
                                    {e.time?.map((time: any, index: number) => (
                                        <p
                                            className="badge rounded-pill bg-primary ms-2"
                                            key={index}
                                        >
                                            {timeFormatter(time)}
                                        </p>
                                    ))}
                                </p>
                            ))}
                        </li>
                        <li>
                            <label>
                                <span className="badge bg-dark me-3 fs-5">
                                    <i className="bi bi-geo-alt"></i>
                                </span>
                                <span className="badge bg-dark fs-5">
                                    Các chi nhánh hiện có
                                </span>
                            </label>
                            {branches?.map((e: any, i: number) => (
                                <div key={i} className="mt-3">
                                    <span className="badge rounded-pill bg-danger">
                                        {e.name}
                                    </span>
                                    {` ${e.address.street}, ${e.address.ward}, ${e.address.district}, ${e.address.province}`}
                                </div>
                            ))}
                        </li>
                    </ul>
                </div>
            </PageWrapper>
            <div className=" mb-5 bg-body rounded">
                <OtherService title="Các dịch vụ cùng nhà cung cấp" />
            </div>
            <div className=" mb-5 bg-body rounded">
                <OtherService title="Các dịch vụ liên quan" />
            </div>
        </PageContainer>
    );
};

const OtherService = (props: { title?: string }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    return (
        <div className="card">
            <div className="card-header fs-3">{props.title}</div>
            <div className="card-body pe-5 ps-5">
                <Slider {...settings}>
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                </Slider>
            </div>
        </div>
    );
};

const Supplier = (props: { data?: any }) => {
    const { data } = props;
    const thumbnail = 'https://picsum.photos/200/200';
    return (
        <div className="card mt-2 mb-2">
            <div className="d-flex bd-highlight mh-100">
                <div className="p-2">
                    <img
                        src={data?.businessAccount?.avatar || thumbnail}
                        alt="..."
                        height="200"
                        width="200"
                        className="rounded float-start img-fluid mh-100"
                    />
                </div>
                <div className="p-2 flex-md-grow-1">
                    <h2 className="fw-bold">{data?.displayName}</h2>
                    <p>
                        <i className="bi bi-telephone"></i>{' '}
                        {data?.businessAccount?.phoneNumber}
                    </p>
                    <p>
                        <i className="bi bi-envelope"></i>{' '}
                        {data?.businessAccount?.email}
                    </p>
                    <button type="button" className="btn btn-link fs-5">
                        Chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
};
