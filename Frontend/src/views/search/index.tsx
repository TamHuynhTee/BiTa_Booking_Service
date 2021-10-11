import React from "react";
import "./style.scss";
import noData from "../../images/no-data.svg";

interface SearchResultProps {}

export const SearchResult = (props: SearchResultProps) => {
    const found = true;
    return (
        <div className="searchResult">
            <div className="container">
                <form
                    className="d-flex searchResult-input"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Tìm kiếm theo từ khóa"
                        aria-label="Search"
                    />
                    <select
                        className="form-select me-2"
                        aria-label="Default select example"
                    >
                        <option defaultValue="">Tất cả</option>
                        <option value="1">Công ty</option>
                        <option value="2">Dịch vụ</option>
                    </select>
                    <button
                        className="btn btn-primary header-btn"
                        type="submit"
                    >
                        Tìm
                    </button>
                </form>
                <div className="searchResult-result">
                    <div className="searchResult-result-count">
                        <h2>Có 0 kết quả tìm thấy</h2>
                    </div>
                    <div className="searchResult-result-show">
                        {found ? (
                            <>
                                <SearchCard />
                                <SearchCard />
                                <SearchCard />
                                <SearchCard />
                                <SearchCard />
                                <SearchCard />
                                <SearchCard />
                                <SearchCard />
                                <SearchCard />
                                <SearchCard />
                            </>
                        ) : (
                            <div className="no-data">
                                <div className="no-data-container">
                                    <img src={noData} alt="" />
                                </div>
                                <h3>Không tìm thấy</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SearchCard = () => {
    const thumbnail = "https://cdn.fakercloud.com/avatars/oktayelipek_128.jpg";
    return (
        <>
            <div className="searchResult-card">
                <div className="searchResult-card-image">
                    <img src={thumbnail} className="img-thumbnail" alt="..." />
                </div>
                <div className="searchResult-card-info">
                    <h2>
                        <a href="#">Phòng khám răng nha khoa Trương Đức</a>
                    </h2>
                    <div className="searchResult-card-info-service">
                        <span className="badge rounded-pill bg-primary">
                            Nha khoa
                        </span>
                        <span className="badge rounded-pill bg-primary">
                            Y tế
                        </span>
                    </div>
                    <div className="searchResult-card-info-utilities">
                        <div>
                            <span className="badge bg-light text-dark">
                                $ Tiền cọc
                            </span>
                            <p>26.500</p>
                        </div>
                        <div>
                            <span className="badge bg-light text-dark">
                                * Địa điểm
                            </span>
                            <p>TP.HCM</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
