import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { ButtonSpinner } from '../../../../Components';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { CreateBranchSchema } from '../../../../validations/branch';
import { updateBranchApi } from '../../Apis/business.api';
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
    const services = useSelector(selectServicesForSelect);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(CreateBranchSchema),
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
        dispatch(getAllServiceAsync({ businessId: branch?.business }));
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
                        notifySuccess('Đã cập nhật chi nhánh');
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
            <Link to="/business-dashboard/branches">{'< '}Trở về</Link>
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
                <label
                    className="form-label fw-bold"
                    style={{ color: 'royalblue' }}
                >
                    Các dịch vụ ở chi nhánh
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
                <button
                    className="btn btn-primary mb-2"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {!isSubmitting ? 'Cập nhật' : <ButtonSpinner />}
                </button>
            </form>
        </div>
    );
};
