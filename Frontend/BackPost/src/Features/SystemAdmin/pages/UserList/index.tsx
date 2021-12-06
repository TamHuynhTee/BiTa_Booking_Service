import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    LoadingComponent,
    NoDataView,
    Pagination,
    SearchBar,
} from '../../../../Components';
import {
    ACTIVE_OPTIONS,
    GENDER_SEARCH_OPTIONS,
    USER_FILTER,
} from '../../../../static/options';
import { UserCard } from '../../components';
import { selectAdminLoading, selectQueryUser } from '../../slice/selector';
import { queryUserAsync } from '../../slice/thunk';
import { IQueryUserApi } from '../../type';

interface Props {}

export const UserList = (props: Props) => {
    const dispatch = useDispatch();
    const users = useSelector(selectQueryUser);
    const loading = useSelector(selectAdminLoading);
    const [query, setQuery] = React.useState<IQueryUserApi>({
        isActive: true,
        role: 'user',
        filter: USER_FILTER[0].value,
    });

    const handleSubmit = () => {
        console.log(query);
        dispatch(queryUserAsync(query));
    };

    const handleSearch = (data: any) => {
        const { keyword } = data;
        setQuery({ ...query, keyword: keyword });
    };

    const handleChangePage = (page: number) => {
        dispatch(queryUserAsync({ ...query, page: page }));
    };

    const handleChangeGender = (e: any) => {
        const value = e.target.value;
        if (!value) {
            delete query.gender;
            setQuery(query);
        } else setQuery({ ...query, gender: e.target.value });
    };

    React.useEffect(() => {
        dispatch(queryUserAsync(query));
    }, []);

    return (
        <div className="container">
            <h4>Danh sách người dùng</h4>
            <hr />
            <div className="input-group mb-3 row">
                <SearchBar
                    className="col-md-6"
                    placeholder="Tìm kiếm người dùng"
                    submit={handleSearch}
                />
                <select
                    className="form-select col-md-2"
                    onChange={(e: any) =>
                        setQuery({ ...query, filter: e.target.value })
                    }
                >
                    {USER_FILTER.map((e: any, i: number) => (
                        <option value={e.value} key={i}>
                            {e.label}
                        </option>
                    ))}
                </select>
                <select
                    className="form-select col-md-1"
                    onChange={handleChangeGender}
                >
                    {GENDER_SEARCH_OPTIONS.map((e: any, i: number) => (
                        <option value={e.value} key={i}>
                            {e.label}
                        </option>
                    ))}
                </select>
                <select
                    className="form-select col-md-2"
                    onChange={(e: any) =>
                        setQuery({
                            ...query,
                            isActive: e.target.value === 'true' ? true : false,
                        })
                    }
                >
                    {ACTIVE_OPTIONS.map((e: any, i: number) => (
                        <option value={e.value} key={i}>
                            {e.label}
                        </option>
                    ))}
                </select>
                <button
                    className="btn btn-primary col-md-1"
                    onClick={handleSubmit}
                >
                    Tìm
                </button>
            </div>
            {loading === 'idle' ? (
                <>
                    <div className="row my-3">
                        {users?.results?.length === 0 ? (
                            <NoDataView />
                        ) : (
                            users?.results?.map((e: any, i: number) => (
                                <UserCard data={e} key={i} />
                            ))
                        )}
                    </div>
                    <div className="my-3">
                        <Pagination
                            totalPages={users?.totalPages}
                            query={handleChangePage}
                            page={users?.page}
                        />
                    </div>
                </>
            ) : (
                <LoadingComponent />
            )}
            {/* <div className="row my-3">
                {users?.results?.length === 0 ? (
                    <NoDataView />
                ) : (
                    users?.results?.map((e: any, i: number) => (
                        <UserCard data={e} key={i} />
                    ))
                )}
            </div>
            <div className="my-3">
                <Pagination
                    totalPages={users?.totalPages}
                    query={handleChangePage}
                    page={users?.page}
                />
            </div> */}
        </div>
    );
};
