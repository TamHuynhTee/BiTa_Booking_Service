import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { selectCategories } from '../../../../App/category/slice/selector';
import { getAllCategoriesAsync } from '../../../../App/category/slice/thunk';
import { ButtonSpinner, CustomSelect } from '../../../../Components';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { renderOptions } from '../../../../utils/renderOptions';
import {
    APPOINTMENT_TIME,
    DURATION_UNIT,
} from '../../../../utils/selectOptions';
import { CreateServiceSchema } from '../../../../validations/service';
import { selectServiceDetail } from '../../slice/selector';
import { getServiceByIdAsync } from '../../slice/thunk';
import defaultImage from '../../../../images/logo_200.svg';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from '@firebase/storage';
import storage from '../../../../firebase';
import {
    updateServiceActivationApi,
    updateServiceApi,
} from '../../Apis/business.api';
interface Props {}

const getNumber = (money: any) => {
    return typeof money === 'string' ? ~~money.replaceAll('.', '') : money;
};

export const ServiceDetail = (props: Props) => {
    const { id } = useParams<any>();
    const dispatch = useDispatch();
    const history = useHistory();
    const service = useSelector(selectServiceDetail);
    const categories = useSelector(selectCategories);
    const avatarInput = React.useRef<any>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm({
        resolver: yupResolver(CreateServiceSchema),
        defaultValues: {
            name: service?.name,
            category: service?.category.id,
            price: service?.price,
            depositPrice: service?.depositPrice,
            description: service?.description,
            quantity: service?.duration.quantity,
            unit: service?.duration.unit,
        },
    });

    React.useEffect(() => {
        dispatch(getServiceByIdAsync({ serviceId: id }));
    }, []);

    React.useEffect(() => {
        dispatch(getAllCategoriesAsync());
    }, []);

    const onUpload = (data: any) => {
        const storageRef = ref(
            storage,
            'services/' + avatarInput.current?.files[0].name
        );
        const uploadTask = uploadBytesResumable(
            storageRef,
            avatarInput.current?.files[0]
        );
        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    async (downloadURL) => {
                        const payload = data;
                        payload.image = downloadURL;
                        const result = await updateServiceApi(payload);
                        if (result.code === 200) {
                            notifySuccess('Đã cập nhật dịch vụ');
                            history.push('/business-dashboard/services');
                        } else {
                            notifyError(result.message);
                        }
                    }
                );
            }
        );
    };

    const [list, setList] = React.useState<any>(service?.schedule);
    const schedule = service?.schedule.map((e: any, i: number) => (
        <div key={i} className="input-group mb-3">
            <span className="input-group-text">{e.weekDay}</span>
            <Select
                options={APPOINTMENT_TIME}
                isMulti
                closeMenuOnSelect={false}
                className="form-control"
                defaultValue={e.time.map((time: any) =>
                    APPOINTMENT_TIME.find(({ value }) => value === time)
                )}
                onChange={(value: any) => {
                    const newList = value.map((e: any) => e.value);
                    setList(
                        [...list].map((obj: any) => {
                            if (obj.weekDay === e.weekDay)
                                return {
                                    ...obj,
                                    time: newList,
                                };
                            else return obj;
                        })
                    );
                }}
            />
        </div>
    ));

    const onSubmit = (data: any, e: any) => {
        try {
            e.preventDefault();
            data.price = getNumber(data.price);
            data.depositPrice = getNumber(data.depositPrice);
            data.quantity = getNumber(data.quantity);
            if (data.price <= data.depositPrice) {
                notifyError('Phí cọc phải bé hơn phí dịch vụ');
                return;
            }
            data.hasDeposit = !!data.depositPrice;
            data.duration = { quantity: data.quantity, unit: data.unit };
            delete data.quantity;
            delete data.unit;
            data.schedule = list.map((e: any) => {
                return { weekDay: e.weekDay, time: e.time };
            });
            data.serviceId = service?.id;
            console.log(data);
            return new Promise((resolve) => {
                setTimeout(async () => {
                    if (avatarInput.current?.files[0]) onUpload(data);
                    else {
                        const result = await updateServiceApi(data);
                        if (result.code === 200) {
                            notifySuccess('Đã cập nhật dịch vụ');
                            history.push('/business-dashboard/services');
                        } else {
                            notifyError(result.message);
                        }
                    }
                    resolve(true);
                }, 2000);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onAvatarClick = () => {
        avatarInput.current.click();
    };
    const showNewAvatar = async () => {
        const validImageTypes = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/svg',
        ];
        if (!validImageTypes.includes(avatarInput.current.files[0].type)) {
            notifyError('File không phải hình ảnh');
        } else if (avatarInput.current.files && avatarInput.current.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e: any) {
                document
                    .getElementById('user-avatar')!
                    .setAttribute('src', e.target.result);
            };
            reader.readAsDataURL(avatarInput.current.files[0]);
        }
    };

    const handleChangeActivation = async () => {
        if (
            confirm(
                `Bạn chắc muốn ${
                    service?.isActive ? 'ngưng' : 'tiếp tục'
                } dịch vụ chứ?`
            )
        ) {
            const result = await updateServiceActivationApi({ serviceId: id });
            if (result.code === 200) {
                notifySuccess(result.message);
                history.push('/business-dashboard/services');
            } else {
                notifyError(result.message);
            }
        }
    };

    return (
        <div className="container">
            <Link to="/business-dashboard/services">{'< '}Trở về</Link>
            <hr />
            <div className="row">
                <div className="col-lg-4">
                    <img
                        src={service?.image || defaultImage}
                        alt={service?.name}
                        id="user-avatar"
                        className="rounded mx-auto d-block img-thumbnail"
                    />
                    <input
                        type="file"
                        id="file"
                        accept=".jpg,.png,.jpeg"
                        ref={avatarInput}
                        onChange={showNewAvatar}
                        hidden
                    />
                    <button
                        className="d-block mx-auto btn btn-success mt-3"
                        onClick={onAvatarClick}
                    >
                        Đổi ảnh
                    </button>
                </div>
                <div className="col-lg-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Tên dịch vụ *
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register('name')}
                                className="form-control"
                                placeholder="VD: Tư vấn dịch vụ ..."
                            />
                            <p className="text-danger">
                                {errors.name?.message}
                            </p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Loại dịch vụ *
                            </label>
                            <CustomSelect
                                options={categories}
                                name="category"
                                placeholder="Loại"
                                errors={errors}
                                control={control}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Phí dịch vụ (VND)
                            </label>
                            <CurrencyInput
                                id="price"
                                groupSeparator="."
                                {...register('price')}
                                allowNegativeValue={false}
                                className="form-control"
                                defaultValue={service?.price}
                                min={0}
                            />
                            <p className="text-danger">
                                {errors.price?.message}
                            </p>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="depositPrice"
                                className="form-label"
                            >
                                Phí đặt cọc (VND)
                            </label>
                            <CurrencyInput
                                id="depositPrice"
                                groupSeparator="."
                                {...register('depositPrice')}
                                allowNegativeValue={false}
                                className="form-control"
                                defaultValue={service?.depositPrice}
                                min={0}
                            />
                            <p className="text-danger">
                                {errors.depositPrice?.message}
                            </p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Mô tả dịch vụ
                            </label>
                            <input
                                type="text"
                                id="description"
                                {...register('description')}
                                className="form-control"
                                placeholder="VD: Tư vấn dịch vụ ..."
                            />
                            <p className="text-danger">
                                {errors.description?.message}
                            </p>
                        </div>
                        <label htmlFor="quantity" className="form-label">
                            Thời gian sử dụng dịch vụ
                        </label>
                        <div className="input-group mb-3">
                            <CurrencyInput
                                id="quantity"
                                groupSeparator="."
                                {...register('quantity')}
                                allowNegativeValue={false}
                                className="form-control"
                                defaultValue={service?.duration.quantity}
                                min={0}
                            />
                            <select
                                className="form-select"
                                {...register('unit')}
                            >
                                {renderOptions(DURATION_UNIT)}
                            </select>
                        </div>
                        <label
                            className="form-label fw-bold"
                            style={{ color: 'royalblue' }}
                        >
                            Lịch phục vụ
                        </label>
                        <div className="mb-3">{schedule}</div>
                        <div className="g-2">
                            <button
                                className="btn btn-primary me-2"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {!isSubmitting ? 'Cập nhật' : <ButtonSpinner />}
                            </button>
                            <button
                                className={`btn btn-${
                                    service?.isActive ? 'danger' : 'success'
                                }`}
                                type="button"
                                onClick={handleChangeActivation}
                            >
                                {service?.isActive
                                    ? 'Ngưng dịch vụ'
                                    : 'Tiếp tục dịch vụ'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
