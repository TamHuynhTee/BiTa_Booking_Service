import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ButtonSpinner } from '../../../../Components';
import { CreateBranchSchema } from '../../../../validations/branch';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { createBranchApi } from '../../Apis/business.api';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { useHistory } from 'react-router';
interface Props {
    business?: string;
}

export const CreateBranch = (props: Props) => {
    const history = useHistory();
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
                    console.log(result);
                    if (result.code === 201) {
                        notifySuccess('Đã tạo chi nhánh mới');
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
                <div className="mb-3">
                    {/* <div style={{ height: '360px' }}>
                        <MapContainer
                            center={[10.7894725, 106.710327]}
                            key="51.505--0.09"
                            zoom={13}
                            scrollWheelZoom={true}
                            dragging
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[10.7894725, 106.710327]}>
                                <Popup>Test popup</Popup>
                            </Marker>
                        </MapContainer>
                    </div> */}
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
