import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    LineChartResponsive,
    LoadingComponent,
    NoDataView,
    Pagination,
} from '../../../../Components';
import { NewBusinessCard } from '../../components';
import {
    selectLoading,
    selectManagerRevenue,
    selectQueryBusiness,
} from '../../slice/selector';
import { getManagerRevenueAsync, queryBusinessAsync } from '../../slice/thunk';
import { IQueryBusinessApi } from '../../type';
import dayjs from 'dayjs';

export const ManagerDashboard = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = React.useState<IQueryBusinessApi>({
        isConfirmed: false,
    });

    const newBusinesses = useSelector(selectQueryBusiness);
    const revenue = useSelector(selectManagerRevenue);
    const loading = useSelector(selectLoading);

    React.useEffect(() => {
        dispatch(queryBusinessAsync(query));
        dispatch(getManagerRevenueAsync({ year: dayjs().year() }));
    }, []);

    const handleChangePage = (page: number) => {
        setQuery({ ...query, page: page });
        dispatch(queryBusinessAsync({ ...query, page: page }));
    };

    return (
        <div className="container">
            <h4>Doanh nghiệp mới</h4>
            <hr />
            {loading === 'idle' ? (
                <>
                    <div className="my-3">
                        {newBusinesses?.results?.length === 0 ? (
                            <NoDataView />
                        ) : (
                            newBusinesses?.results?.map((e: any, i: number) => (
                                <NewBusinessCard data={e} key={i} />
                            ))
                        )}
                    </div>
                    <div className="my-3">
                        <Pagination
                            totalPages={newBusinesses?.totalPages}
                            query={handleChangePage}
                            page={newBusinesses?.page}
                        />
                    </div>
                </>
            ) : (
                <LoadingComponent />
            )}
            <h4>Doanh thu</h4>
            <hr />
            <div className="my-3">
                <LineChartResponsive
                    data={revenue}
                    dataKey="count"
                    title={`Doanh thu của hệ thống trong năm ${dayjs().year()}`}
                    name="month"
                    grid
                />
            </div>
        </div>
    );
};
