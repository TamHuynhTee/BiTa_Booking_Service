import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../App/auth/slice/selector';
import {
    LoadingComponent,
    NoDataView,
    Pagination,
} from '../../../../Components';
import { PageContainer } from '../../../../Components/PageContainer';
import { PageWrapper } from '../../../../Components/PageWrapper';
import { ReviewForm } from '../../Components';
import {
    selectNewReviews,
    selectCustomerLoading,
    selectQueryReviews,
} from '../../slice/selector';
import { queryReviewsAsync } from '../../slice/thunk';
import { IQueryReview } from '../../type';

export const Review = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userId = localStorage.getItem('userId');
    const query: IQueryReview = {
        customer: userId || user?.user?.id,
        state: 'Pending',
    };
    React.useEffect(() => {
        dispatch(queryReviewsAsync(query));
    }, []);
    const newReviews = useSelector(selectNewReviews);
    const loading = useSelector(selectCustomerLoading);
    const reviews = useSelector(selectQueryReviews);

    const handleChangePage = (page: number) => {
        dispatch(queryReviewsAsync({ ...query, page: page }));
    };

    return (
        <PageContainer>
            <PageWrapper>
                <h4 className="fw-bold">
                    Bạn có <span className="badge bg-danger">{newReviews}</span>{' '}
                    đánh giá mới
                </h4>
                <hr />
                <div className="my-3">
                    {loading === 'idle' ? (
                        <>
                            <div>
                                {reviews?.totalResults ? (
                                    <>
                                        {reviews.results?.map(
                                            (e: any, i: number) => (
                                                <div className="mb-3" key={i}>
                                                    <ReviewForm
                                                        data={e}
                                                        query={query}
                                                    />
                                                </div>
                                            )
                                        )}
                                        <hr />
                                    </>
                                ) : (
                                    <NoDataView />
                                )}
                            </div>

                            <div className="my-3 d-flex justify-content-between align-items-center">
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
            </PageWrapper>
        </PageContainer>
    );
};
