import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../App/auth/slice/selector';
import {
    LoadingComponent,
    NoDataView,
    Pagination,
    SearchBar,
} from '../../../../Components';
import { ResultNumber } from '../../../../Components/ResultNumber';
import { ACTIVE_OPTIONS, BRANCH_FILTER } from '../../../../utils/selectOptions';
import { BranchCard } from '../../Components';
import { selectBranches, selectLoading } from '../../slice/selector';
import { queryBranchAsync } from '../../slice/thunk';
import { IQueryBranchApi } from '../../type';

export const BranchList = (props: { business?: string }) => {
    const dispatch = useDispatch();
    const { business } = props;
    const branches = useSelector(selectBranches);
    const loading = useSelector(selectLoading);
    const businessInfo = useSelector(selectUser);
    const [query, setQuery] = React.useState<IQueryBranchApi>({
        isActive: ACTIVE_OPTIONS[0].value,
        filter: BRANCH_FILTER[0].value,
        business: business,
    });

    // console.log(businessInfo);

    React.useEffect(() => {
        dispatch(queryBranchAsync(query));
    }, []);

    const handleSubmit = () => {
        dispatch(queryBranchAsync(query));
    };

    const handleChangeActive = (e: any) => {
        const value = e.target.value;
        dispatch(
            queryBranchAsync({
                ...query,
                isActive: value === 'true' ? true : false,
            })
        );
        setQuery({
            ...query,
            isActive: value === 'true' ? true : false,
        });
    };

    const handleSearch = (data: any) => {
        const { keyword } = data;
        setQuery({ ...query, keyword: keyword });
    };

    const handleChangePage = (page: number) => {
        dispatch(queryBranchAsync({ ...query, page: page }));
    };

    return (
        <div className="container">
            <h4 className="fw-bold">Chi nhánh của tôi</h4>
            <hr />
            <div className="input-group my-3 row">
                <SearchBar
                    className="col-md-7"
                    placeholder="Tìm kiếm chi nhánh theo"
                    submit={handleSearch}
                    formSubmit={(e: any) => e.preventDefault()}
                />
                <select
                    className="form-select col-md-2"
                    onChange={(e: any) =>
                        setQuery({
                            ...query,
                            filter: e.target.value,
                        })
                    }
                >
                    {BRANCH_FILTER.map((e: any, i: number) => (
                        <option value={e.value} key={i}>
                            {e.label}
                        </option>
                    ))}
                </select>
                <select
                    className="form-select col-md-2"
                    onChange={handleChangeActive}
                >
                    {ACTIVE_OPTIONS.map((e: any, i: number) => (
                        <option value={e.value} key={i}>
                            {e.label}
                        </option>
                    ))}
                </select>
                <button
                    className="btn btn-primary col-1"
                    onClick={handleSubmit}
                >
                    Tìm
                </button>
            </div>
            {loading === 'idle' ? (
                <>
                    <ResultNumber
                        number={branches?.totalResults}
                        suffix="chi nhánh"
                    />
                    {/* <div className="my-2">
                        <h5 className="fw-bold">
                            Tìm thấy {branches?.totalResults} chi nhánh
                        </h5>
                    </div> */}
                    <div className="my-3">
                        {branches?.results?.length === 0 ? (
                            <NoDataView />
                        ) : (
                            branches?.results?.map((e: any, i: number) => (
                                <BranchCard
                                    data={e}
                                    key={i}
                                    headquarter={
                                        businessInfo?.business?.headquarter
                                    }
                                />
                            ))
                        )}
                    </div>
                    <div className="my-3">
                        <Pagination
                            totalPages={branches?.totalPages}
                            query={handleChangePage}
                            page={branches?.page}
                        />
                    </div>
                </>
            ) : (
                <LoadingComponent />
            )}
        </div>
    );
};
