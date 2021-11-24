import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NoDataView, Pagination } from '../../../../Components';
import { NewBusinessCard } from '../../components';
import { selectQueryBusiness } from '../../slice/selector';
import { queryBusinessAsync } from '../../slice/thunk';
import { IQueryBusinessApi } from '../../type';

interface Props {}

export const ManagerDashboard = (props: Props) => {
    const dispatch = useDispatch();
    const [query, setQuery] = React.useState<IQueryBusinessApi>({
        isConfirmed: false,
    });

    const newBusinesses = useSelector(selectQueryBusiness);
    React.useEffect(() => {
        dispatch(queryBusinessAsync(query));
    }, []);

    const handleChangePage = (page: number) => {
        setQuery({ ...query, page: page });
        dispatch(queryBusinessAsync({ ...query, page: page }));
    };
    console.log(newBusinesses);
    return (
        <div className="container">
            <h4>Doanh nghiệp mới</h4>
            <hr />
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
                />
            </div>
            <h4>Doanh thu</h4>
            <hr />
        </div>
    );
};
