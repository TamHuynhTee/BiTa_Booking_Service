import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { selectCategories } from '../../../../App/category/slice/selector';
import { getAllCategoriesAsync } from '../../../../App/category/slice/thunk';
import { CustomSelect, RequiredSign } from '../../../../Components';
import { ButtonSpinner } from '../../../../Components/ButtonSpinner';
import { weekDays } from '../../../../static/Weekdays';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { renderOptions } from '../../../../utils/renderOptions';
import {
    APPOINTMENT_TIME,
    DURATION_UNIT,
} from '../../../../utils/selectOptions';
import { CreateServiceSchema } from '../../../../validations/service';
import { createServiceApi } from '../../Apis/business.api';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from '@firebase/storage';
import storage from '../../../../firebase';

export const CreateService = (props: { business?: string }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const { business } = props;
    const [file, setFile] = React.useState<any>();
    React.useEffect(() => {
        dispatch(getAllCategoriesAsync());
    }, []);

    const onFileChange = (e: any) => {
        if (!e.target.files[0]) {
            setFile(undefined);
            return;
        }
        if (e.target.files[0]?.size > 1048576) {
            alert('Size ảnh quá lớn');
            return;
        }
        const validImageType = ['image/png', 'image/jpg', 'image/jpeg'];
        if (!validImageType.includes(e.target.files[0]?.type)) {
            alert('Ảnh không đúng định dạng');
            return;
        }
        setFile(e.target.files[0]);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm({ resolver: yupResolver(CreateServiceSchema) });

    const [list, setList] = React.useState<any>(weekDays);

    const schedule = weekDays.map((e: any, i: number) => (
        <div key={i} className="input-group mb-3">
            <span className="input-group-text">{e.weekDay}</span>
            <Select
                options={APPOINTMENT_TIME}
                isMulti
                closeMenuOnSelect={false}
                className="form-control"
                defaultValue={e.time}
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

    const onUpload = (data: any) => {
        const storageRef = ref(storage, 'services/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
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
                        const result = await createServiceApi(payload);
                        if (result.code === 201) {
                            notifySuccess('Đã tạo dịch vụ mới');
                            history.push('/business-dashboard/services');
                        } else {
                            notifyError(result.message);
                        }
                    }
                );
            }
        );
    };

    const onSubmit = (data: any, e: any) => {
        try {
            e.preventDefault();
            data.price = ~~data.price.replaceAll(',', '');
            data.depositPrice = ~~data.depositPrice.replaceAll(',', '');
            data.quantity = ~~data.quantity.replaceAll(',', '');
            if (data.price <= data.depositPrice) {
                notifyError('Phí cọc phải bé hơn phí dịch vụ');
                return;
            }
            data.hasDeposit = !!data.depositPrice;
            data.duration = { quantity: data.quantity, unit: data.unit };
            delete data.quantity;
            delete data.unit;
            data.schedule = list;
            data.business = business;
            return new Promise((resolve) => {
                setTimeout(async () => {
                    if (file) onUpload(data);
                    else {
                        const result = await createServiceApi(data);
                        if (result.code === 201) {
                            notifySuccess('Đã tạo dịch vụ mới');
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

    return (
        <div className="container">
            <h2 className="fw-bold">Tạo dịch vụ mới</h2>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Tên dịch vụ <RequiredSign />
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="form-control"
                        placeholder="VD: Tư vấn dịch vụ ..."
                    />
                    <p className="text-danger">{errors.name?.message}</p>
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Loại dịch vụ <RequiredSign />
                    </label>
                    <CustomSelect
                        options={categories}
                        name="category"
                        placeholder="Loại"
                        errors={errors}
                        control={control}
                        handleChange={() => {}}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Phí dịch vụ (VND) <RequiredSign />
                    </label>
                    <CurrencyInput
                        id="price"
                        groupSeparator=","
                        decimalSeparator="."
                        {...register('price')}
                        allowNegativeValue={false}
                        className="form-control"
                        placeholder="Nhập phí dịch vụ"
                        defaultValue={0}
                        min={0}
                    />
                    <p className="text-danger">{errors.price?.message}</p>
                </div>
                <div className="mb-3">
                    <a data-bs-toggle="collapse" href="#hasDeposit">
                        Bao gồm phí đặt cọc
                    </a>
                    <div className="collapse ms-4" id="hasDeposit">
                        <label htmlFor="depositPrice" className="form-label">
                            Phí đặt cọc (VND)
                        </label>
                        <CurrencyInput
                            id="depositPrice"
                            groupSeparator=","
                            decimalSeparator="."
                            {...register('depositPrice')}
                            allowNegativeValue={false}
                            className="form-control"
                            placeholder="Nhập phí đặt cọc"
                            defaultValue={0}
                            min={0}
                        />
                        <p className="text-danger">
                            {errors.depositPrice?.message}
                        </p>
                    </div>
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
                    <p className="text-danger">{errors.description?.message}</p>
                </div>
                <label htmlFor="quantity" className="form-label">
                    Thời gian sử dụng dịch vụ <RequiredSign />
                </label>
                <div className="input-group mb-3">
                    <CurrencyInput
                        id="quantity"
                        groupSeparator=","
                        decimalSeparator="."
                        {...register('quantity')}
                        allowNegativeValue={false}
                        className="form-control"
                        placeholder="Nhập thời gian cho dịch vụ"
                        defaultValue={0}
                        min={0}
                    />
                    <select className="form-select" {...register('unit')}>
                        {renderOptions(DURATION_UNIT)}
                    </select>
                </div>
                <p className="text-danger">{errors.quantity?.message}</p>
                <label
                    className="form-label fw-bold"
                    style={{ color: 'royalblue' }}
                >
                    Lịch phục vụ <RequiredSign />
                </label>
                <div className="mb-3">{schedule}</div>
                <label
                    className="form-label fw-bold"
                    style={{ color: 'royalblue' }}
                >
                    Ảnh dịch vụ
                </label>
                <div className="mb-3">
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        className="form-control"
                        onChange={onFileChange}
                    />
                    <p style={{ color: 'blue' }}>
                        Dùng ảnh .png hoặc .jpg hoặc .jpeg, giới hạn 1MB. Nên
                        chọn ảnh kích thước 300 x 300
                    </p>
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
