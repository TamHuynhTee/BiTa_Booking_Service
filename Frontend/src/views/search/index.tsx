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
                            ""
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
