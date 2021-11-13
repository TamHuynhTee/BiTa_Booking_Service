import { yupResolver } from '@hookform/resolvers/yup';
import React, { ReactChild } from 'react';
import { useForm } from 'react-hook-form';
import { InputCustom } from '../../../../Components';
import { LinkButton } from '../../../../Components/LinkButton';
import { defaultRoute } from '../../../../routes/defaultRoute';
import { NewBusinessSchema } from '../../../../validations/auth';
import './style.scss';

interface RegisterBusinessProps {}

export const RegisterBusiness = (props: RegisterBusinessProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: yupResolver(NewBusinessSchema) });

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        console.log(data);
        return new Promise((resolve) => {
            setTimeout(() => {
                alert('Registered B');

                resolve(true);
            }, 2000);
        });
    };

    return (
        <div className="registerBusiness">
            <div className="registerBusiness-input column-2 full-height">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="registerBusiness-input-header">
                        <LinkButton
                            link={defaultRoute.UnauthenticatedHome}
                            text="&lt; Trang chủ"
                        ></LinkButton>
                        <h1>Đăng ký hợp tác</h1>
                        <LinkButton
                            link={defaultRoute.RegisterCustomer}
                            text="Khách hàng &gt;"
                        ></LinkButton>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="registeredName" className="form-label">
                            Tên doanh nghiệp trên giấy đăng ký kinh doanh *
                        </label>
                        <input
                            type="text"
                            id="registeredName"
                            {...register('registeredName')}
                            className="form-control"
                            placeholder="VD: Công ty TNHH dịch vụ 30Shine ..."
                        />
                        <p className="text-danger">
                            {errors.registeredName?.message}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="displayName" className="form-label">
                            Tên muốn hiển thị trên hệ thống *
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            {...register('displayName')}
                            className="form-control"
                            placeholder="VD: 30shine"
                        />
                        <p className="text-danger">
                            {errors.displayName?.message}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ownerName" className="form-label">
                            Họ tên chủ doanh nghiệp *
                        </label>
                        <input
                            type="text"
                            id="ownerName"
                            {...register('ownerName')}
                            className="form-control"
                            placeholder="VD: Nguyễn Văn A"
                        />
                        <p className="text-danger">
                            {errors.ownerName?.message}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="shortDescription"
                            className="form-label"
                        >
                            Mô tả vắn tắt về doanh nghiệp
                        </label>
                        <textarea
                            id="shortDescription"
                            {...register('shortDescription')}
                            className="form-control rich-text-no-resize"
                            rows={3}
                            placeholder="VD: Cung cấp các dịch vụ cắt tóc, gội đầu, ..."
                        ></textarea>
                    </div>
                    <div
                        className="p-3 mb-1"
                        style={{ backgroundColor: 'rgb(241 241 241)' }}
                    >
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username đăng nhập *
                            </label>
                            <input
                                type="text"
                                id="username"
                                {...register('username')}
                                className="form-control"
                                placeholder=""
                            />
                            <p className="text-danger">
                                {errors.username?.message}
                            </p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">
                                Số điện thoại *
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                {...register('phoneNumber')}
                                className="form-control"
                                placeholder=""
                            />
                            <p className="text-danger">
                                {errors.phoneNumber?.message}
                            </p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email liên lạc *
                            </label>
                            <input
                                type="text"
                                id="email"
                                {...register('email')}
                                className="form-control"
                                placeholder=""
                            />
                            <p className="text-danger">
                                {errors.email?.message}
                            </p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Mật khẩu *
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register('password')}
                                className="form-control"
                                placeholder=""
                            />
                            <p className="text-danger">
                                {errors.password?.message}
                            </p>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="confirmPassword"
                                className="form-label"
                            >
                                Xác nhận mật khẩu *
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                {...register('confirmPassword')}
                                className="form-control"
                                placeholder=""
                            />
                            <p className="text-danger">
                                {errors.confirmPassword?.message}
                            </p>
                        </div>
                    </div>
                    <div className="form-check mb-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="agreePolicy"
                            {...register('agreed')}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="agreePolicy"
                        >
                            Tôi đồng ý với các <span>điều khoản</span>
                        </label>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="submit">
                            {!isSubmitting ? (
                                'Gửi'
                            ) : (
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <div className="registerBusiness-doodle column-2 full-height">
                <CollapseMenu
                    name="collapsePolicy"
                    btnName="Mở để xem chính sách"
                >
                    <ol className="list-group list-group-flush">
                        <li className="list-group-item">A list item</li>
                        <li className="list-group-item">A list item</li>
                        <li className="list-group-item">A list item</li>
                    </ol>
                </CollapseMenu>
                <CollapseMenu
                    name="collapseRights"
                    btnName="Mở để xem quyền sử dụng"
                >
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">An item</li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                        <li className="list-group-item">A fourth item</li>
                        <li className="list-group-item">And a fifth one</li>
                    </ul>
                </CollapseMenu>
            </div>
        </div>
    );
};

const CollapseMenu = (props: {
    name: string;
    btnName: string;
    children: ReactChild | Array<ReactChild>;
}) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <button
                className="btn btn-secondary mb-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${props.name}`}
            >
                {props.btnName}
            </button>
            <div className="collapse" id={props.name} style={{ opacity: '.8' }}>
                <div className="card card-body">{props.children}</div>
            </div>
        </div>
    );
};
