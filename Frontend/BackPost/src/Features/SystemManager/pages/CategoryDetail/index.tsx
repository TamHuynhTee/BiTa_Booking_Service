import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ButtonSpinner, CustomInput } from '../../../../Components';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { CreateCategorySchema } from '../../../../validations/category';
import { updateCategoryApi } from '../../apis/systemmanager.api';
import { selectCategoryDetail } from '../../slice/selector';
import { getCategoryByIdAsync } from '../../slice/thunk';

interface Props {}

export const CategoryDetail = (props: Props) => {
    const { id } = useParams<any>();
    const category = useSelector(selectCategoryDetail);
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: yupResolver(CreateCategorySchema),
        defaultValues: category,
    });
    React.useEffect(() => {
        dispatch(getCategoryByIdAsync({ categoryId: id }));
    }, []);

    const onSubmit = (data: any, e: any) => {
        try {
            e.preventDefault();
            return new Promise((resolve) => {
                setTimeout(async () => {
                    data.categoryId = id;
                    delete data.id;
                    const result = await updateCategoryApi(data);
                    if (result.code === 200) {
                        notifySuccess(result.message);
                        history.push('/dashboard/categories');
                    } else {
                        notifyError(result.message);
                    }
                    resolve(true);
                }, 2000);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <h4 className="fw-bold">Th??ng tin lo???i d???ch v???</h4>
                <Link to={'/dashboard/categories'}>{'< '}V??? danh s??ch</Link>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)} className="my-3">
                <CustomInput
                    type="text"
                    register={register}
                    name="name"
                    errors={errors}
                    title="T??n lo???i d???ch v???"
                    placeholder="S???c kh???e"
                />
                <CustomInput
                    type="text"
                    register={register}
                    name="code"
                    errors={errors}
                    title="M?? lo???i d???ch v???"
                    placeholder="VD: health"
                />
                <button
                    type="submit"
                    className="btn btn-success me-3"
                    disabled={isSubmitting || !isDirty}
                >
                    {!isSubmitting ? 'C???p nh???t' : <ButtonSpinner />}
                </button>
            </form>
        </div>
    );
};
