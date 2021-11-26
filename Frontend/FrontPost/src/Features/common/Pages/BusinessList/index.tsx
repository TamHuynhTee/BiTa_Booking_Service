import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    LoadingComponent,
    NoDataView,
    PageContainer,
    PageWrapper,
    Pagination,
    SearchBar,
} from '../../../../Components';
import { BUSINESS_FILTER } from '../../../../utils/selectOptions';
import { BusinessListItem } from '../../Components';
import { selectCommonLoading, selectQueryBusiness } from '../../slice/selector';
import { queryBusinessAsync } from '../../slice/thunk';
import { IQueryBusinessApi } from '../../type';

interface Props {}

export const BusinessList = (props: Props) => {
    const dispatch = useDispatch();
    const businessesResult = useSelector(selectQueryBusiness);
    const loading = useSelector(selectCommonLoading);
    const [query, setQuery] = React.useState<IQueryBusinessApi>({
        isActive: true,
        filter: BUSINESS_FILTER[0].value,
        limit: 12,
    });

    React.useEffect(() => {
        dispatch(queryBusinessAsync({ isActive: true }));
    }, []);

    const handleSubmitSearch = () => {
        console.log(query);
        // dispatch(queryBusinessAsync(query));
    };

    console.log(businessesResult);

    const handleChangeSearch = (data: { keyword: string }) => {
        const { keyword } = data;
        setQuery({ ...query, keyword: keyword });
    };

    const handleChangeFilter = (e: any) => {
        const value = e.target.value;
        setQuery({ ...query, filter: value });
    };

    const handleChangePage = (page: number) => {
        dispatch(queryBusinessAsync({ ...query, page: page }));
    };

    return (
        <PageContainer>
            <PageWrapper>
                <h3 className="fw-bold">NHÀ CUNG CẤP DỊCH VỤ</h3>
                <hr />
                <div className="row mt-3">
                    <div className="col-md-3">
                        <BusinessSideBar
                            changeSearch={handleChangeSearch}
                            submitSearch={handleSubmitSearch}
                            changeFilter={handleChangeFilter}
                            query={query}
                        />
                    </div>
                    <div className="col-md-9">
                        {loading === 'idle' ? (
                            <>
                                <div className="row g-2">
                                    {businessesResult?.totalResults ? (
                                        businessesResult.results?.map(
                                            (e: any, i: number) => (
                                                <div className="col-4" key={i}>
                                                    <BusinessListItem
                                                        data={e}
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
                                        totalPages={
                                            businessesResult?.totalPages
                                        }
                                        query={handleChangePage}
                                        page={businessesResult?.page}
                                    />
                                    <h5 className="fw-bold">
                                        Tìm thấy{' '}
                                        {businessesResult?.totalResults} kết quả
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

const BusinessSideBar = (props: {
    submitSearch?: any;
    changeSearch?: any;
    changeFilter?: any;
    query?: any;
}) => {
    const { submitSearch, changeSearch, changeFilter } = props;

    return (
        <>
            <h5 className="fw-bold">Tìm kiếm</h5>
            <div className="row mb-3">
                <SearchBar
                    className="col"
                    placeholder="Tìm kiếm tên nhà cung cấp"
                    submit={changeSearch}
                    formSubmit={(e: any) => e.preventDefault()}
                />
            </div>
            <div className="row mb-3">
                <div className="col-8">
                    <select className="form-select" onChange={changeFilter}>
                        {BUSINESS_FILTER.map((e: any, i: number) => (
                            <option value={e.value} key={i}>
                                {e.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="btn btn-primary col-3"
                    onClick={submitSearch}
                >
                    Tìm
                </button>
            </div>
        </>
    );
};
