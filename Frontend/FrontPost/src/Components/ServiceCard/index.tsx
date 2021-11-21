import React from "react";

interface ServiceCardProps {}

export const ServiceCard = (props: ServiceCardProps) => {
    const image = "https://picsum.photos/200/200";
    return (
        <div className="card col ms-3 me-3">
            <img
                src={image}
                className="card-img-top"
                // height="200"
                // width="200"
                alt=""
            />
            <div className="card-body">
                <h5 className="card-title text-truncate">
                    Dịch vụ lấy hẹn ngay lập tức
                </h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <span className="badge rounded-pill bg-dark">
                        <i className="bi bi-geo-alt"></i>
                    </span>{" "}
                    TP HCM
                </li>
                <li className="list-group-item">
                    <span className="badge rounded-pill bg-dark">
                        <i className="bi bi-cash-coin"></i>
                    </span>{" "}
                    25000
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <button className="btn btn-link">Chi tiết</button>
                    <button className="btn btn-success">Đặt ngay</button>
                </li>
            </ul>
        </div>
    );
};
