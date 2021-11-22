import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../../../../Components';
import { BranchCard } from '../../Components';
import { selectBranches } from '../../slice/selector';
import { queryBranchAsync } from '../../slice/thunk';

interface Props {
    business?: string;
}

const listPage = [
    { page: 1, name: 'Đang hoạt động' },
    { page: 2, name: 'Ngưng hoạt động' },
];

export const BranchList = (props: Props) => {
    const dispatch = useDispatch();
    const { business } = props;
    const [page, setPage] = React.useState(1);
    const [pagination, setPagination] = React.useState(1);
    const branches = useSelector(selectBranches);
    const fetchData = () => {
        dispatch(
            queryBranchAsync({
                isActive: page === 1 ? true : false,
                business: business,
            })
        );
    };
    React.useEffect(() => {
        fetchData();
        document.getElementById(`nav-link-${page}`)?.classList.add('active');
        document
            .getElementById(`page-item-${pagination}`)
            ?.classList.add('active');
    }, [dispatch, page]);

    console.log(branches);
    const onSubmit = (data: any) => {
        if (!data.keyword) {
            fetchData();
            return;
        }
        dispatch(
            queryBranchAsync({
                isActive: page === 1 ? true : false,
                business: business,
                name: data.keyword,
            })
        );
    };

    const handleChangeActive = (newPage: number) => {
        if (page === newPage) return;
        setPage(newPage);
        document.getElementById(`nav-link-${page}`)?.classList.remove('active');
        document.getElementById(`nav-link-${newPage}`)?.classList.add('active');
        dispatch(
            queryBranchAsync({
                isActive: newPage === 1 ? true : false,
                business: business,
            })
        );
    };

    const handleChangePage = (thisPage: number) => {
        if (thisPage === pagination) return;
        setPagination(thisPage);
        document
            .getElementById(`page-item-${pagination}`)
            ?.classList.remove('active');
        document
            .getElementById(`page-item-${thisPage}`)
            ?.classList.add('active');
        dispatch(
            queryBranchAsync({
                isActive: page === 1 ? true : false,
                business: business,
                page: thisPage,
            })
        );
    };

    return (
        <div className="container">
            <h3 className="fw-bold">Chi nhánh của tôi</h3>
            <hr />
            {/* Navbar */}
            <ul className="nav nav-tabs">
                {listPage.map((e: any, i: number) => (
                    <li className="nav-item" key={i}>
                        <button
                            className="nav-link"
                            id={`nav-link-${i + 1}`}
                            onClick={() => handleChangeActive(i + 1)}
                        >
                            {e.name}
                        </button>
                    </li>
                ))}
            </ul>
            {/* Search bar */}
            <div className="my-3">
                <SearchBar
                    placeholder="Tìm kiếm theo tên chi nhánh"
                    submit={onSubmit}
                />
            </div>
            <div className="d-flex flex-column gap-2">
                {branches?.totalResults === 0 ? (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: '10rem' }}
                    >
                        <h5>Không có dữ liệu</h5>
                    </div>
                ) : (
                    <>
                        <div className="mb-3">
                            {/* Pagination */}
                            <nav>
                                <ul className="pagination">
                                    {[...Array(branches?.totalPages)].map(
                                        (e: any, i: number) => (
                                            <li
                                                className="page-item"
                                                id={`page-item-${i + 1}`}
                                                key={i}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() =>
                                                        handleChangePage(i + 1)
                                                    }
                                                >
                                                    {i + 1}
                                                </button>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </nav>
                        </div>
                        {/* Results */}
                        {branches?.results.map((e: any, i: number) => (
                            <BranchCard key={i} data={e} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
