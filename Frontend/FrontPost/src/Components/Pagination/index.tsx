import React from 'react';

export const Pagination = (props: {
    totalPages?: number | 0;
    query?: any;
    page?: number | 1;
}) => {
    const { totalPages, query, page } = props;
    const [pagination, setPagination] = React.useState(page);
    const handleChangePage = (thisPage: number) => {
        if (thisPage === pagination) return;
        setPagination(thisPage);
        document
            .getElementById(`page-item-${pagination}`)
            ?.classList.remove('active');
        document
            .getElementById(`page-item-${thisPage}`)
            ?.classList.add('active');
        query(thisPage);
    };

    React.useEffect(() => {
        document
            .getElementById(`page-item-${pagination}`)
            ?.classList.add('active');
    }, []);

    return (
        <ul className="pagination">
            {[...Array(totalPages)].map((e: any, i: number) => (
                <li className="page-item" id={`page-item-${i + 1}`} key={i}>
                    <button
                        className="page-link"
                        onClick={() => handleChangePage(i + 1)}
                    >
                        {i + 1}
                    </button>
                </li>
            ))}
        </ul>
    );
};
