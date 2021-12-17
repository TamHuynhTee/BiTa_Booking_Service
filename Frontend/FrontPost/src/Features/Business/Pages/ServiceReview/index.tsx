import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
    LoadingComponent,
    NoDataView,
    Pagination,
    ResultNumber,
} from '../../../../Components';
import { CommentItem } from '../../../common/Components';
import {
    selectCustomerLoading,
    selectQueryReviews,
} from '../../../Customer/slice/selector';
import { queryReviewsAsync } from '../../../Customer/slice/thunk';
import { IQueryReview } from '../../../Customer/type';

export const ServiceReview = () => {
    const { id } = useParams<any>();
    const dispatch = useDispatch();
    const query: IQueryReview = {
        service: id,
        state: 'Reviewed',
    };
    const reviews = useSelector(selectQueryReviews);
    const loading = useSelector(selectCustomerLoading);
    React.useEffect(() => {
        dispatch(queryReviewsAsync(query));
    }, []);

    const handleChangePage = (page: number) => {
        dispatch(queryReviewsAsync({ ...query, page: page }));
    };

    return (
        <div className="container">
            <Link to={`/business-dashboard/service/${id}`}>{'< '}Trở về</Link>
            <hr />
            <div className="my">
                <ResultNumber
                    number={reviews?.totalResults}
                    suffix="đánh giá"
                />
            </div>
            <div className="my-2">
                {loading === 'idle' ? (
                    <>
                        <div className="p-2">
                            {reviews?.totalResults ? (
                                reviews.results?.map((e: any, i: number) => (
                                    <div className="mb-3" key={i}>
                                        <CommentItem data={e} />
                                    </div>
                                ))
                            ) : (
                                <NoDataView />
                            )}
                        </div>
                        {/* <hr /> */}
                        <div className="my-3">
                            <Pagination
                                totalPages={reviews?.totalPages}
                                query={handleChangePage}
                                page={reviews?.page}
                            />
                        </div>
                    </>
                ) : (
                    <LoadingComponent />
                )}
            </div>
        </div>
    );
};
