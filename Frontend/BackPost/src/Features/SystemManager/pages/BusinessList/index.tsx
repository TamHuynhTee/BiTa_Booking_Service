import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NoDataView, Pagination, SearchBar } from '../../../../Components';
import { BUSINESS_FILTER } from '../../../../static/options';
import { BusinessCard } from '../../components';
import { selectQueryBusiness } from '../../slice/selector';
import { queryBusinessAsync } from '../../slice/thunk';
import { IQueryBusinessApi } from '../../type';

interface Props {}

export const BusinessList = (props: Props) => {
    const dispatch = useDispatch();
    const businesses = useSelector(selectQueryBusiness);
    const [query, setQuery] = React.useState<IQueryBusinessApi>({
        isActive: true,
        filter: BUSINESS_FILTER[0].value,
    });

    const handleSearch = (data: any) => {
        const { keyword } = data;
        setQuery({ ...query, keyword: keyword });
        dispatch(queryBusinessAsync({ ...query, keyword: keyword }));
    };

    const handleChangePage = (page: number) => {
        dispatch(queryBusinessAsync({ ...query, page: page }));
    };

    React.useEffect(() => {
        dispatch(queryBusinessAsync(query));
    }, []);

    return (
        <div className="container">
            <h4>Tất cả nhà cung cấp dịch vụ trên hệ thống</h4>
            <hr />
            <div className="input-group mb-3 row">
                <SearchBar
                    className="col-md-8"
                    placeholder="Tìm kiếm nhà cung cấp"
                    submit={handleSearch}
                />
                <select
                    className="form-select col-md-4"
                    placeholder="Bộ lọc"
                    onChange={(e: any) =>
                        setQuery({ ...query, filter: e.target.value })
                    }
                >
                    {BUSINESS_FILTER.map((e: any, i: number) => (
                        <option value={e.value} key={i}>
                            {e.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="my-3">
                {businesses?.results?.length === 0 ? (
                    <NoDataView />
                ) : (
                    businesses?.results?.map((e: any, i: number) => (
                        <BusinessCard data={e} key={i} />
                    ))
                )}
            </div>
            <div className="my-3">
                <Pagination
                    totalPages={businesses?.totalPages}
                    query={handleChangePage}
                />
            </div>
        </div>
    );
};
