import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../../../../Components';
import { ServiceCard } from '../../Components';
import { selectServices } from '../../slice/selector';
import { queryServiceAsync } from '../../slice/thunk';

interface Props {
    business?: string;
}

const listPage = [
    { page: 1, name: 'Đang hoạt động' },
    { page: 2, name: 'Ngưng hoạt động' },
];

export const ServiceList = (props: Props) => {
    const dispatch = useDispatch();
    const { business } = props;
    const [page, setPage] = React.useState(1);
    const [pagination, setPagination] = React.useState(1);
    const services = useSelector(selectServices);
    const fetchData = () => {
        dispatch(
            queryServiceAsync({
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

    console.log(services);
    const onSubmit = (data: any) => {
        if (!data.keyword) {
            fetchData();
            return;
        }
        dispatch(
            queryServiceAsync({
                isActive: page === 1 ? true : false,
                business: business,
                name: data.keyword ? data.keyword : null,
            })
        );
    };

    const handleChangeActive = (newPage: number) => {
        if (page === newPage) return;
        setPage(newPage);
        document.getElementById(`nav-link-${page}`)?.classList.remove('active');
        document.getElementById(`nav-link-${newPage}`)?.classList.add('active');
        dispatch(
            queryServiceAsync({
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
            queryServiceAsync({
                isActive: page === 1 ? true : false,
                business: business,
                page: thisPage,
            })
        );
    };

    return (
        <div className="container">
            <h3 className="fw-bold">Dịch vụ của tôi</h3>
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
                <SearchBar placeholder="Tìm kiếm theo tên" submit={onSubmit} />
            </div>
            <div className="d-flex flex-column gap-2">
                {services?.totalResults === 0 ? (
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
                                    {[...Array(services?.totalPages)].map(
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
                        {services?.results?.map((e: any, i: number) => (
                            <ServiceCard key={i} data={e} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
