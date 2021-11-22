import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesAsync } from '../../slice/thunk';
import { selectCategories } from '../../slice/selector';
import { CategoryCard } from '../../components';

interface Props {}

export const CategoryList = (props: Props) => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    React.useEffect(() => {
        dispatch(getAllCategoriesAsync());
    }, []);
    console.log(categories);
    return (
        <div className="container">
            <h4>Danh sách loại dịch vụ</h4>
            <hr />
            <div className="my-3 row gap-2 justify-content-center">
                {categories?.map((e: any, i: number) => (
                    <CategoryCard data={e} key={i} />
                ))}
            </div>
        </div>
    );
};
