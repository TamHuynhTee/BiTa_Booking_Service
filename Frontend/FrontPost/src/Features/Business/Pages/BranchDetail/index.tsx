import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { selectUser } from '../../../../App/auth/slice/selector';
import { getCurrentUserAsync } from '../../../../App/auth/slice/thunk';
import { ButtonSpinner } from '../../../../Components';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { UpdateBranchSchema } from '../../../../validations/branch';
import {
    setHeadquarterApi,
    updateBranchActivationApi,
    updateBranchApi,
} from '../../Apis/business.api';
import {
    selectBranchDetail,
    selectServicesForSelect,
} from '../../slice/selector';
import { getAllServiceAsync, getBranchByIdAsync } from '../../slice/thunk';

interface Props {}

export const BranchDetail = (props: Props) => {
    const { id } = useParams<any>();
    const history = useHistory();
    const dispatch = useDispatch();
    const branch = useSelector(selectBranchDetail);
    const business = useSelector(selectUser);
    const services = useSelector(selectServicesForSelect);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(UpdateBranchSchema),
        defaultValues: {
            name: branch?.name,
            street: branch?.address.street,
            ward: branch?.address.ward,
            district: branch?.address.district,
            province: branch?.address.province,
        },
    });
    React.useEffect(() => {
        dispatch(getBranchByIdAsync({ branchId: id }));
    }, []);
    React.useEffect(() => {
        dispatch(getAllServiceAsync({ businessId: business?.business?.id }));
    }, []);

    const [list, setList] = React.useState<any>(branch?.services || []);

    const onSubmit = (data: any, e: any) => {
        try {
            e.preventDefault();
            const { street, ward, district, province, ...rest } = data;
            data.address = {
                street: street,
                ward: ward,
                district: district,
                province: province,
            };
            rest.services = list;
            rest.branchId = id;
            console.log(rest);
            return new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await updateBranchApi(rest);
                    if (result.code === 200) {
                        notifySuccess('???? c???p nh???t chi nh??nh');
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

    const handleChangeActivation = async () => {
        if (
            confirm(
                `B???n ch???c mu???n ${
                    branch?.isActive ? 'ng??ng' : 'ti???p t???c'
                } ho???t ?????ng c???a chi nh??nh ch????`
            )
        ) {
            const result = await updateBranchActivationApi({ branchId: id });
            if (result.code === 200) {
                notifySuccess(result.message);
                history.push('/business-dashboard/branches');
            } else {
                notifyError(result.message);
            }
        }
    };

    const [loading, setLoading] = React.useState(false);

    const handleSetHeadquarter = () => {
        if (confirm(`B???n ch???c mu???n c???p nh???t chi nh??nh n??y l??m tr??? s??? ch????`)) {
            setLoading(true);
            return new Promise((res) => {
                setTimeout(async () => {
                    const result = await setHeadquarterApi({
                        businessId: business?.business?.id,
                        branchId: id,
                    });
                    if (result.code === 200) {
                        notifySuccess(result.message);
                        dispatch(getCurrentUserAsync());
                        history.push('/business-dashboard/branches');
                    } else {
                        notifyError(result.message);
                    }
                    res(true);
                }, 2000);
            });
        }
    };

    return (
        <div className="container">
            <Link to="/business-dashboard/branches">{'< '}Tr??? v???</Link>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                {business?.business?.headquarter === id ? (
                    <span className="badge rounded-pill bg-primary">
                        Tr??? s??? ch??nh
                    </span>
                ) : (
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={handleSetHeadquarter}
                    >
                        {loading ? <ButtonSpinner /> : '?????t tr??? s??? ch??nh'}
                    </button>
                )}
                <div className="my-3">
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
                            <span className="input-group-text">Ph?????ng, x??</span>
                            <input
                                type="text"
                                {...register('ward')}
                                className="form-control"
                                placeholder="VD: ph?????ng Linh Chi???u"
                            />
                        </div>
                        <p className="text-danger">{errors.ward?.message}</p>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                Qu???n, huy???n
                            </span>
                            <input
                                type="text"
                                {...register('district')}
                                className="form-control"
                                placeholder="VD: th??nh ph??? Th??? ?????c"
                            />
                        </div>
                        <p className="text-danger">
                            {errors.district?.message}
                        </p>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                T???nh, th??nh ph???
                            </span>
                            <input
                                type="text"
                                {...register('province')}
                                className="form-control"
                                placeholder="VD: th??nh ph??? H??? Ch?? Minh"
                            />
                        </div>
                        <p className="text-danger">
                            {errors.province?.message}
                        </p>
                    </div>
                </div>
                <label
                    className="form-label fw-bold"
                    style={{ color: 'royalblue' }}
                >
                    C??c d???ch v??? ??? chi nh??nh
                </label>
                <div className="mb-3">
                    <Select
                        options={services}
                        isMulti
                        closeMenuOnSelect={false}
                        className="form-control"
                        defaultValue={list.map((service: any) => {
                            return { label: service.name, value: service.id };
                        })}
                        onChange={(value: any) => {
                            const newList = value.map((e: any) => e.value);
                            setList(newList);
                        }}
                    />
                </div>
                <div className="g-2">
                    <button
                        className="btn btn-primary me-2"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {!isSubmitting ? 'C???p nh???t' : <ButtonSpinner />}
                    </button>
                    <button
                        className={`btn btn-${
                            branch?.isActive ? 'danger' : 'success'
                        }`}
                        type="button"
                        onClick={handleChangeActivation}
                    >
                        {branch?.isActive ? 'Ng??ng ho???t ?????ng' : 'K??ch ho???t l???i'}
                    </button>
                </div>
            </form>
        </div>
    );
};
