import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ButtonSpinner } from '../../../../Components';
import { CreateBranchSchema } from '../../../../validations/branch';
import { createBranchApi } from '../../Apis/business.api';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { getCurrentUserAsync } from '../../../../App/auth/slice/thunk';

export const CreateBranch = (props: { business?: string }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { business } = props;
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(CreateBranchSchema) });

    const onSubmit = (data: any, e: any) => {
        try {
            e.preventDefault();
            data.address = {
                street: data.street,
                ward: data.ward,
                district: data.district,
                province: data.province,
            };
            data.business = business;
            const { street, ward, district, province, ...rest } = data;
            return new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await createBranchApi(rest);
                    if (result.code === 201) {
                        notifySuccess('Đã tạo chi nhánh mới');
                        dispatch(getCurrentUserAsync());
                        history.push('/business-dashboard/branches');
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
            <h2 className="fw-bold">Tạo chi nhánh mới</h2>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Tên chi nhánh *
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="form-control"
                        placeholder="VD: Chi nhánh Thủ Đức ..."
                    />
                    <p className="text-danger">{errors.name?.message}</p>
                </div>
                <div className="p-3 bg-light mb-3">
                    <label className="form-label fw-bold">Địa chỉ *</label>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                Số nhà, đường
                            </span>
                            <input
                                type="text"
                                {...register('street')}
                                className="form-control"
                                placeholder="VD: số 1, đường Võ Văn Ngân"
                            />
                        </div>
                        <p className="text-danger">{errors.street?.message}</p>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">Phường, xã</span>
                            <input
                                type="text"
                                {...register('ward')}
                                className="form-control"
                                placeholder="VD: phường Linh Chiểu"
                            />
                        </div>
                        <p className="text-danger">{errors.ward?.message}</p>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                Quận, huyện
                            </span>
                            <input
                                type="text"
                                {...register('district')}
                                className="form-control"
                                placeholder="VD: thành phố Thủ Đức"
                            />
                        </div>
                        <p className="text-danger">
                            {errors.district?.message}
                        </p>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                Tỉnh, thành phố
                            </span>
                            <input
                                type="text"
                                {...register('province')}
                                className="form-control"
                                placeholder="VD: thành phố Hồ Chí Minh"
                            />
                        </div>
                        <p className="text-danger">
                            {errors.province?.message}
                        </p>
                    </div>
                </div>
                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="headquarter"
                        {...register('headquarter')}
                    />
                    <label className="form-check-label" htmlFor="headquarter">
                        Đặt làm trụ sở chính
                    </label>
                </div>
                <button
                    className="btn btn-primary mb-2"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {!isSubmitting ? 'Tạo' : <ButtonSpinner />}
                </button>
            </form>
        </div>
    );
};
