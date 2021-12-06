import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesAsync } from '../../slice/thunk';
import { selectCategories, selectLoading } from '../../slice/selector';
import { CategoryCard } from '../../components';
import { LoadingComponent } from '../../../../Components';

interface Props {}

export const CategoryList = (props: Props) => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const loading = useSelector(selectLoading);
    React.useEffect(() => {
        dispatch(getAllCategoriesAsync());
    }, []);
    return (
        <div className="container">
            <h4>Danh sách loại dịch vụ</h4>
            <hr />
            {loading === 'idle' ? (
                <div className="my-3 row gap-2 justify-content-center">
                    {categories?.map((e: any, i: number) => (
                        <CategoryCard data={e} key={i} />
                    ))}
                </div>
            ) : (
                <LoadingComponent />
            )}
        </div>
    );
};
