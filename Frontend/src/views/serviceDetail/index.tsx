import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Slider from "react-slick";
import { ServiceCard } from "../../components/serviceCard";
import "./style.scss";

interface ServiceDetailProps {}

export const ServiceDetail = (props: ServiceDetailProps) => {
    const [location, setLocation] = useState<any>([null, null]);

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLocation([latitude, longitude]);
        });
        return () => {};
    }, []);
    return (
        <div className="container">
            <div className="serviceDetail">
                <div className="serviceDetail-wrapper shadow-lg p-3 mb-5 bg-body rounded">
                    <div className="serviceDetail-wrapper-header">
                        <h1>
                            Dịch vụ khám tổng hợp, chụp xét nghiệm lấy ngay
                            trong 20 phút
                        </h1>
                        <button className="btn btn-danger">Lấy hẹn ngay</button>
                    </div>
                    <div className="serviceDetail-wrapper-body">
                        <ul>
                            <li>
                                <label>
                                    <span className="badge bg-primary me-3 fs-5">
                                        <i className="bi bi-building"></i>
                                    </span>
                                    <span className="badge bg-primary fs-5">
                                        Nhà cung cấp dịch vụ
                                    </span>
                                </label>
                                <Supplier />
                            </li>
                            <li>
                                <label>
                                    <span className="badge bg-primary me-3 fs-5">
                                        <i className="bi bi-bookmark"></i>
                                    </span>
                                    <span className="badge bg-primary fs-5">
                                        Dịch vụ
                                    </span>
                                </label>
                                <p>Khám nội soi</p>
                                <p>Khám tổng thể</p>
                                <p>Chữa chấn thương chỉnh hình</p>
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
                                    <span className="badge rounded-pill bg-light text-dark">
                                        Y tế
                                    </span>
                                    <span className="badge rounded-pill bg-light text-dark">
                                        Sức khỏe
                                    </span>
                                </div>
                            </li>
                            <li>
                                <label>
                                    <span className="badge bg-dark me-3 fs-5">
                                        <i className="bi bi-geo-alt"></i>
                                    </span>
                                    <span className="badge bg-dark fs-5">
                                        Địa chỉ đặt hẹn
                                    </span>
                                </label>
                                <p>
                                    📍 31 Nguyễn Du, phường Tân Phú, thành phố
                                    Thủ Đức, thành phố Hồ Chí Minh
                                </p>
                                <div className="card mt-2 mb-2 p-2">
                                    <div style={{ height: "360px" }}>
                                        <MapContainer
                                            center={
                                                !location[0] || !location[1]
                                                    ? [51.505, -0.09]
                                                    : [location[0], location[1]]
                                            }
                                            key={`${location[0]}-${location[1]}`}
                                            zoom={16}
                                            scrollWheelZoom={false}
                                        >
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                            <Marker
                                                position={
                                                    !location[0] || !location[1]
                                                        ? [51.505, -0.09]
                                                        : [
                                                              location[0],
                                                              location[1],
                                                          ]
                                                }
                                            >
                                                <Popup>
                                                    A pretty CSS3 popup. <br />{" "}
                                                    Easily customizable.
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>
                                    <span className="text-end">
                                        Chi tiết hơn trên{" "}
                                        <a
                                            href={`https://www.google.com/maps/@${location[0]},${location[1]}`}
                                            target="_blank"
                                        >
                                            Google map
                                        </a>
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
                                <p>Miễn phí</p>
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
                                <p>50.000</p>
                            </li>
                            <li>
                                <label>
                                    <span className="badge bg-info me-3 fs-5">
                                        <i className="bi bi-info-square"></i>
                                    </span>
                                    <span className="badge bg-info fs-5">
                                        Tiện ích
                                    </span>
                                </label>
                                <p>Hủy hẹn không mất phí</p>
                                <p>Đổi giờ hẹn</p>
                                <p>Liên hệ nhanh chóng</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="shadow-lg mb-5 bg-body rounded">
                    <OtherService title="Các dịch vụ cùng nhà cung cấp" />
                </div>
                <div className="shadow-lg mb-5 bg-body rounded">
                    <OtherService title="Các dịch vụ liên quan" />
                </div>
            </div>
        </div>
    );
};

interface OtherService {
    title?: string;
}

const OtherService = (props: OtherService) => {
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

const Supplier = () => {
    const thumbnail = "https://picsum.photos/200/200";
    return (
        <div className="card mt-2 mb-2">
            <div className="d-flex bd-highlight mh-100">
                <div className="p-2">
                    <img
                        src={thumbnail}
                        alt=""
                        height="200"
                        width="200"
                        className="rounded float-start img-fluid mh-100"
                    />
                </div>
                <div className="p-2 flex-md-grow-1">
                    <h2>Phòng khám đa khoa Tân Đức</h2>
                    <p>
                        <i className="bi bi-telephone"></i> 0347933844
                    </p>
                    <p>
                        <i className="bi bi-building"></i> Tân Bình, Thành Phố
                        Hồ Chí Minh
                    </p>
                    <button type="button" className="btn btn-link fs-5">
                        Chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
};
