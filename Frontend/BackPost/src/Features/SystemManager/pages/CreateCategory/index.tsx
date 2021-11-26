import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { ButtonSpinner, CustomInput } from '../../../../Components';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { CreateCategorySchema } from '../../../../validations/category';
import { createCategoryApi } from '../../apis/systemmanager.api';

interface Props {}

export const CreateCategory = (props: Props) => {
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: yupResolver(CreateCategorySchema),
    });

    const onSubmit = (data: any, e: any) => {
        try {
            e.preventDefault();
            return new Promise((resolve) => {
                setTimeout(async () => {
                    console.log(data);
                    const result = await createCategoryApi(data);
                    if (result.code === 201) {
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
            <h4>Tạo loại dịch vụ mới</h4>
            <hr />
            <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                    type="text"
                    register={register}
                    name="name"
                    errors={errors}
                    title="Tên loại dịch vụ"
                    placeholder="Sức khỏe"
                />
                <CustomInput
                    type="text"
                    register={register}
                    name="code"
                    errors={errors}
                    title="Mã loại dịch vụ"
                    placeholder="VD: health"
                />
                <button
                    type="submit"
                    className="btn btn-success me-3"
                    disabled={isSubmitting || !isDirty}
                >
                    {!isSubmitting ? 'Tạo' : <ButtonSpinner />}
                </button>
            </form>
        </div>
    );
};
