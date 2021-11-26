import { PageContainer, PageWrapper } from '../../../../Components';
import React from 'react';
import './style.scss';
import { BookingForm } from '../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../App/auth/slice/selector';
import { getServiceDetailAsync } from '../../../common/slice/thunk';
import { useParams } from 'react-router';
import { selectServiceDetail } from '../../../common/slice/selector';
import { Link } from 'react-router-dom';
import { moneyFormatter } from '../../../../utils/moneyFormatter';

interface Props {}

export const Booking = (props: Props) => {
    const dispatch = useDispatch();
    const { id } = useParams<any>();
    const user = useSelector(selectUser);
    const service = useSelector(selectServiceDetail);
    console.log(service, user);

    React.useEffect(() => {
        dispatch(getServiceDetailAsync({ serviceId: id }));
    }, []);

    return (
        <PageContainer>
            <PageWrapper>
                <div className="d-flex justify-content-between">
                    <h2 className="fw-bold">Đặt hẹn</h2>
                    {/* <Link to={history.back()}></Link> */}
                </div>
                <hr />
                <div className="d-flex p-3">
                    <div className="booking-input h-100 p-3">
                        <BookingForm user={user} service={service} />
                    </div>
                    <div className="booking-summary h-100 p-3">
                        <div className="bill p-3">
                            <h4
                                className="fw-bold"
                                style={{ color: '#006d9f' }}
                            >
                                Thông tin cuộc hẹn
                            </h4>
                            <h5 className="fw-bold ms-3">
                                <i className="bi bi-user"></i> Khách hàng
                            </h5>
                            <div className="ms-5">
                                <p>
                                    Tên:{' '}
                                    {`${user?.user?.surName} ${user?.user?.firstName}`}
                                </p>
                                <p>
                                    Số điện thoại liên lạc:{' '}
                                    {user?.user?.phoneNumber}
                                </p>
                            </div>
                            <h5 className="fw-bold ms-3">
                                <i className="bi bi-briefcase-fill"></i> Dịch vụ
                            </h5>
                            <div className="ms-5">
                                <p>Tên: {service?.name}</p>
                                <p>
                                    Giá dịch vụ:{' '}
                                    {moneyFormatter(service?.price)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </PageContainer>
    );
};
