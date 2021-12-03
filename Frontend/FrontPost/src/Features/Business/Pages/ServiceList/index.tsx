import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    LoadingComponent,
    NoDataView,
    Pagination,
    SearchBar,
} from '../../../../Components';
import { ResultNumber } from '../../../../Components/ResultNumber';
import { ACTIVE_OPTIONS } from '../../../../utils/selectOptions';
import { IQueryServiceApi } from '../../../common/type';
import { ServiceCard } from '../../Components';
import { selectLoading, selectServices } from '../../slice/selector';
import { queryServiceAsync } from '../../slice/thunk';

export const ServiceList = (props: { business?: string }) => {
    const dispatch = useDispatch();
    const { business } = props;
    const services = useSelector(selectServices);
    const loading = useSelector(selectLoading);
    const [query, setQuery] = React.useState<IQueryServiceApi>({
        isActive: ACTIVE_OPTIONS[0].value,
        business: business,
    });

    React.useEffect(() => {
        dispatch(queryServiceAsync(query));
    }, []);

    const handleSubmit = () => {
        dispatch(queryServiceAsync(query));
    };

    const handleSearch = (data: any) => {
        const { keyword } = data;
        setQuery({ ...query, name: keyword });
    };

    const handleChangeActive = (e: any) => {
        const value = e.target.value;
        dispatch(
            queryServiceAsync({
                ...query,
                isActive: value === 'true' ? true : false,
            })
        );
        setQuery({
            ...query,
            isActive: value === 'true' ? true : false,
        });
    };

    const handleChangePage = (page: number) => {
        dispatch(queryServiceAsync({ ...query, page: page }));
    };

    return (
        <div className="container">
            <h4 className="fw-bold">Dịch vụ của tôi</h4>
            <hr />
            <div className="input-group my-3 row">
                <SearchBar
                    className="col-md-7"
                    placeholder="Tìm kiếm tên dịch vụ"
                    submit={handleSearch}
                />
                <select
                    className="form-select col-md-3"
                    onChange={handleChangeActive}
                >
                    {ACTIVE_OPTIONS.map((e: any, i: number) => (
                        <option value={e.value} key={i}>
                            {e.label}
                        </option>
                    ))}
                </select>
                <button
                    className="btn btn-primary col-2"
                    onClick={handleSubmit}
                >
                    Tìm
                </button>
            </div>
            {loading === 'idle' ? (
                <>
                    <ResultNumber
                        number={services?.totalResults}
                        suffix="dịch vụ"
                    />
                    <div className="my-3">
                        {services?.results?.length === 0 ? (
                            <NoDataView />
                        ) : (
                            services?.results?.map((e: any, i: number) => (
                                <ServiceCard data={e} key={i} />
                            ))
                        )}
                    </div>
                    <div className="my-3">
                        <Pagination
                            totalPages={services?.totalPages}
                            query={handleChangePage}
                            page={services?.page}
                        />
                    </div>
                </>
            ) : (
                <LoadingComponent />
            )}
        </div>
    );
};
