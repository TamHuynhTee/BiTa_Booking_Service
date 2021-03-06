import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ButtonSpinner, CustomSelect } from '../../../../Components';
import { CreateBranchSchema } from '../../../../validations/branch';
import {
    createBranchApi,
    getVietNamDistrictsApi,
    getVietNamProvincesApi,
    getVietNamWardApi,
} from '../../Apis/business.api';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAsync } from '../../../../App/auth/slice/thunk';
import Select from 'react-select';
import {
    getVietNamDistrictsAsync,
    getVietNamProvincesAsync,
    getVietNamWardAsync,
} from '../../slice/thunk';
import {
    selectDistricts,
    selectProvinces,
    selectWards,
} from '../../slice/selector';

export const CreateBranch = (props: { business?: string }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { business } = props;
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(CreateBranchSchema),
    });

    React.useEffect(() => {
        dispatch(getVietNamProvincesAsync());
        return () => {
            districts;
            provinces;
            wards;
        };
    }, []);

    const provinces = useSelector(selectProvinces);
    const districts = useSelector(selectDistricts);
    const wards = useSelector(selectWards);

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
                        notifySuccess('???? t???o chi nh??nh m???i');
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
            <h2 className="fw-bold">T???o chi nh??nh m???i</h2>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        T??n chi nh??nh *
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="form-control"
                        placeholder="VD: Chi nh??nh Th??? ?????c ..."
                    />
                    <p className="text-danger">{errors.name?.message}</p>
                </div>
                <div className="p-3 bg-light mb-3">
                    <label className="form-label fw-bold">?????a ch??? *</label>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                S??? nh??, ???????ng
                            </span>
                            <input
                                type="text"
                                {...register('street')}
                                className="form-control"
                                placeholder="VD: s??? 1, ???????ng V?? V??n Ng??n"
                            />
                        </div>
                        <p className="text-danger">{errors.street?.message}</p>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                T???nh, th??nh ph???
                            </span>
                            <Controller
                                control={control}
                                name="province"
                                render={({
                                    field: { onChange, value, name },
                                }) => (
                                    <Select
                                        name={name}
                                        className="form-control"
                                        options={provinces}
                                        value={provinces?.find(
                                            (c) => c.value === value
                                        )}
                                        onChange={(val) => {
                                            onChange(val.label);
                                            dispatch(
                                                getVietNamDistrictsAsync({
                                                    provinceId: val.value,
                                                })
                                            );
                                        }}
                                        placeholder="Ch???n t???nh th??nh"
                                    />
                                )}
                            />
                        </div>
                        <p className="text-danger">
                            {errors.province?.message}
                        </p>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                Qu???n, huy???n
                            </span>
                            <Controller
                                control={control}
                                name="district"
                                render={({
                                    field: { onChange, value, name },
                                }) => (
                                    <Select
                                        name={name}
                                        className="form-control"
                                        options={districts}
                                        value={districts?.find(
                                            (c) => c.value === value
                                        )}
                                        onChange={(val) => {
                                            onChange(val.label);
                                            dispatch(
                                                getVietNamWardAsync({
                                                    districtId: val.value,
                                                })
                                            );
                                        }}
                                        placeholder="Ch???n qu???n huy???n"
                                    />
                                )}
                            />
                        </div>
                        <p className="text-danger">
                            {errors.district?.message}
                        </p>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">Ph?????ng, x??</span>
                            <Controller
                                control={control}
                                name="ward"
                                render={({
                                    field: { onChange, value, name },
                                }) => (
                                    <Select
                                        name={name}
                                        className="form-control"
                                        options={wards}
                                        value={wards?.find(
                                            (c) => c.value === value
                                        )}
                                        onChange={(val) => onChange(val.label)}
                                        placeholder="Ch???n ph?????ng x??"
                                    />
                                )}
                            />
                        </div>
                        <p className="text-danger">{errors.ward?.message}</p>
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
                        ?????t l??m tr??? s??? ch??nh
                    </label>
                </div>
                <button
                    className="btn btn-primary mb-2"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {!isSubmitting ? 'T???o' : <ButtonSpinner />}
                </button>
            </form>
        </div>
    );
};
