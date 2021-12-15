import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { selectCategories } from '../../../../App/category/slice/selector';
import { getAllCategoriesAsync } from '../../../../App/category/slice/thunk';
import {
    LoadingComponent,
    NoDataView,
    PageContainer,
    PageWrapper,
    Pagination,
    SearchBar,
} from '../../../../Components';
import { moneyFormatter } from '../../../../utils/moneyFormatter';
import {
    selectLoading,
    selectServices,
} from '../../../Business/slice/selector';
import { queryServiceAsync } from '../../../Business/slice/thunk';
import { ServiceListItem } from '../../Components';
import { IQueryServiceApi } from '../../type';

const limit = 12;

export const ServiceList = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const servicesResult = useSelector(selectServices);
    const loading = useSelector(selectLoading);
    const [query, setQuery] = React.useState<IQueryServiceApi>({
        isActive: true,
        limit: limit,
    });
    React.useEffect(() => {
        dispatch(getAllCategoriesAsync());
        dispatch(queryServiceAsync(query));
    }, []);

    const handleSubmitSearch = () => {
        dispatch(queryServiceAsync(query));
    };

    const handleChangeSearch = (data: { keyword: string }) => {
        const { keyword } = data;
        setQuery({ ...query, name: keyword });
    };

    const handleChangeCategory = (category: any) => {
        if (category) {
            dispatch(
                queryServiceAsync({
                    isActive: true,
                    limit: limit,
                    category: category,
                })
            );
            setQuery({ isActive: true, limit: limit, category: category });
        } else {
            dispatch(queryServiceAsync({ isActive: true, limit: limit }));
            setQuery({ isActive: true, limit: limit });
        }
    };

    const handleChangeMaxPrice = (e: any) => {
        const value = ~~e.target.value;
        if (value <= (query.minPrice || 1000000)) e.preventDefault();
        else setQuery({ ...query, maxPrice: value });
    };

    const handleChangeMinPrice = (e: any) => {
        const value = ~~e.target.value;
        if (value >= (query.maxPrice || 1000000)) e.preventDefault();
        else setQuery({ ...query, minPrice: value });
    };

    const handleChangeRating = (rate: number) => {
        dispatch(queryServiceAsync({ ...query, rating: rate }));
        setQuery({ ...query, rating: rate });
    };

    const handleChangePage = (page: number) => {
        dispatch(queryServiceAsync({ ...query, page: page }));
    };

    return (
        <PageContainer>
            <PageWrapper>
                <h3 className="fw-bold">DỊCH VỤ</h3>
                <hr />
                <div className="row mt-3">
                    <div className="col-md-3">
                        <ServiceSideBar
                            categories={categories}
                            submitSearch={handleSubmitSearch}
                            changeCategory={handleChangeCategory}
                            changeSearch={handleChangeSearch}
                            changeMaxPrice={handleChangeMaxPrice}
                            changeMinPrice={handleChangeMinPrice}
                            changeRating={handleChangeRating}
                            query={query}
                        />
                    </div>
                    <div className="col-md-9">
                        {loading === 'idle' ? (
                            <>
                                <div className="row g-2">
                                    {servicesResult?.totalResults ? (
                                        servicesResult.results?.map(
                                            (e: any, i: number) => (
                                                <div className="col-4" key={i}>
                                                    <ServiceListItem
                                                        data={e}
                                                        withBusiness={true}
                                                    />
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <NoDataView />
                                    )}
                                </div>
                                <hr />
                                <div className="my-3 d-flex justify-content-between align-items-center">
                                    <Pagination
                                        totalPages={servicesResult?.totalPages}
                                        query={handleChangePage}
                                        page={servicesResult?.page}
                                    />
                                    <h5 className="fw-bold">
                                        Tìm thấy {servicesResult?.totalResults}{' '}
                                        kết quả
                                    </h5>
                                </div>
                            </>
                        ) : (
                            <LoadingComponent />
                        )}
                    </div>
                </div>
            </PageWrapper>
        </PageContainer>
    );
};

const ServiceSideBar = (props: {
    categories?: any;
    submitSearch?: any;
    changeSearch?: any;
    changeCategory?: any;
    changeMinPrice?: any;
    changeMaxPrice?: any;
    changeRating?: any;
    query?: any;
}) => {
    const {
        categories,
        submitSearch,
        changeSearch,
        changeCategory,
        changeMinPrice,
        changeMaxPrice,
        changeRating,
        query,
    } = props;
    const [rate, setRate] = React.useState(0);

    return (
        <>
            <h5 className="fw-bold">Tìm kiếm</h5>
            <div className="row mb-3">
                <SearchBar
                    className="col-9"
                    placeholder="Tìm kiếm tên dịch vụ"
                    submit={changeSearch}
                    formSubmit={(e: any) => e.preventDefault()}
                />
                <button
                    className="btn btn-primary col-3"
                    onClick={submitSearch}
                >
                    Tìm
                </button>
            </div>
            <h5 className="fw-bold mt-3">Bộ lọc</h5>
            <div className="row">
                <div data-role="range">
                    <label>
                        Giá thấp nhất: {moneyFormatter(query.minPrice || 0)}
                    </label>
                    <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="500000"
                        step="1000"
                        onChange={changeMinPrice}
                    />
                </div>
                <div data-role="range">
                    <label>
                        Giá cao nhất: {moneyFormatter(query.maxPrice || 0)}
                    </label>
                    <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="2000000"
                        step="1000"
                        onChange={changeMaxPrice}
                    />
                </div>
            </div>
            <h5 className="fw-bold mt-3">Đánh giá</h5>
            <div className="my-2">
                <Rating
                    ratingValue={rate}
                    onClick={(rate: number) => {
                        setRate(rate);
                        changeRating(rate / 20);
                    }}
                />{' '}
                {`${rate / 20}/5`}
            </div>
            <h5 className="fw-bold mt-3">Loại dịch vụ</h5>
            <ul>
                <li className="ms-5">
                    <a
                        className="sidebar-li"
                        onClick={() => changeCategory('')}
                    >
                        Tất cả
                    </a>
                </li>
                {categories?.map((e: any, i: number) => (
                    <li className="ms-5" key={i}>
                        <a
                            className="sidebar-li"
                            onClick={() => changeCategory(e.value)}
                        >
                            {e.label}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
};
