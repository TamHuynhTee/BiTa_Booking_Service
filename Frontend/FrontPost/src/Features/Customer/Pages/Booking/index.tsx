import * as dayjs from 'dayjs';
import 'dayjs/locale/vi';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { selectUser } from '../../../../App/auth/slice/selector';
import { PageContainer, PageWrapper } from '../../../../Components';
import { durationFormatter } from '../../../../utils/durationFormatter';
import { moneyFormatter } from '../../../../utils/moneyFormatter';
import { TIME_TO_COME } from '../../../../utils/selectOptions';
import { thisDay } from '../../../../utils/thisDay';
import { timeFormatter } from '../../../../utils/timeFormatter';
import { weekDayFormatter } from '../../../../utils/weekDayFormatter';
import { selectServiceDetail } from '../../../common/slice/selector';
import { getServiceDetailAsync } from '../../../common/slice/thunk';
import { BookingForm } from '../../Components';
import './style.scss';

dayjs.locale('vi');
dayjs.extend(localizedFormat);

export const Booking = () => {
    const dispatch = useDispatch();
    const { id } = useParams<any>();
    const user = useSelector(selectUser);
    const service = useSelector(selectServiceDetail);

    const [payment, setPayment] = React.useState({
        customerName: `${user?.user?.surName} ${user?.user?.firstName}`,
        customerPhone: user?.user?.phoneNumber,
        totalMoney: service?.depositPrice,
        startDate: thisDay(),
        startTime: 'Chưa chọn',
        notify: 'Chưa chọn',
    });

    const handleChangePayment = (type?: any, value?: any) => {
        setPayment({ ...payment, [type]: value });
    };

    React.useEffect(() => {
        dispatch(getServiceDetailAsync({ serviceId: id }));
    }, []);

    return (
        <PageContainer>
            <PageWrapper>
                <div className="d-flex justify-content-between">
                    <h2 className="fw-bold">Đặt hẹn</h2>
                    <Link to={'/services'}>{'< '}Về danh sách</Link>
                </div>
                <hr />
                <div className="d-flex p-3 fs-5">
                    <div className="booking-input h-100 p-3">
                        <BookingForm
                            user={user}
                            serviceId={id}
                            service={service}
                            thisDay={thisDay()}
                            handleChange={handleChangePayment}
                        />
                    </div>
                    <div className="booking-summary h-100 p-3">
                        <div className="bill p-3 mb-4">
                            <h4
                                className="fw-bold"
                                style={{ color: '#006d9f' }}
                            >
                                Thông tin dịch vụ
                            </h4>
                            {/* Service */}
                            <h5 className="fw-bold ms-3">
                                <i className="bi bi-briefcase-fill"></i> Dịch vụ
                            </h5>
                            <div className="ms-5">
                                <p>
                                    <span className="badge bg-dark me-2">
                                        Tên dịch vụ
                                    </span>
                                    {service?.name}
                                </p>
                                <p>
                                    <span className="badge bg-dark me-2">
                                        Giá dịch vụ
                                    </span>
                                    {moneyFormatter(service?.price)}
                                </p>
                                <p>
                                    <span className="badge bg-dark me-2">
                                        Giá đặt cọc
                                    </span>
                                    {service?.hasDeposit
                                        ? moneyFormatter(service?.depositPrice)
                                        : 'Không có'}
                                </p>
                                <p>
                                    <span className="badge bg-dark me-2">
                                        Thời lượng
                                    </span>
                                    {service?.duration?.quantity}{' '}
                                    {durationFormatter(service?.duration?.unit)}
                                </p>
                                <p>
                                    <span className="badge bg-dark me-2">
                                        Lịch làm việc
                                    </span>
                                </p>
                                {service?.schedule?.map((e: any, i: number) => (
                                    <div key={i}>
                                        <label className="text-primary fw-bold">
                                            {weekDayFormatter(e.weekDay)}:
                                        </label>
                                        {e.time?.length !== 0
                                            ? e.time?.map(
                                                  (
                                                      time: any,
                                                      index: number
                                                  ) => (
                                                      <p
                                                          className="badge rounded-pill bg-primary ms-2"
                                                          key={index}
                                                      >
                                                          {timeFormatter(time)}
                                                      </p>
                                                  )
                                              )
                                            : ' Không có'}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-3 bg-light">
                            <h4
                                className="fw-bold"
                                style={{ color: '#006d9f' }}
                            >
                                Thông tin thanh toán
                            </h4>
                            <h5 className="fw-bold ms-3">
                                <i className="bi bi-person-fill"></i> Khách hàng
                            </h5>
                            <div className="ms-5">
                                <p>
                                    <span className="badge bg-info text-dark me-2">
                                        Họ tên
                                    </span>
                                    {payment.customerName}
                                </p>
                                <p>
                                    <span className="badge bg-info text-dark me-2">
                                        Số điện thoại liên lạc
                                    </span>
                                    {payment.customerPhone}
                                </p>
                            </div>
                            <h5 className="fw-bold ms-3 mt-3">
                                <i className="bi bi-cash"></i> Thanh toán
                            </h5>
                            <div className="ms-5">
                                <p>
                                    <span className="badge bg-success me-2">
                                        Số tiền
                                    </span>
                                    {moneyFormatter(payment.totalMoney)}
                                </p>
                            </div>
                            <h5 className="fw-bold ms-3 mt-3">
                                <i className="bi bi-clock"></i> Thời gian
                            </h5>
                            <div className="ms-5">
                                <p>
                                    <span className="badge bg-secondary me-2">
                                        Ngày hẹn
                                    </span>
                                    {dayjs(payment.startDate).format('LL')}
                                </p>
                                <p>
                                    <span className="badge bg-secondary me-2">
                                        Giờ hẹn
                                    </span>
                                    {payment.startTime === 'Chưa chọn'
                                        ? 'Chưa chọn'
                                        : timeFormatter(payment.startTime)}
                                </p>
                                <p>
                                    <span className="badge bg-secondary me-2">
                                        Lưu ý
                                    </span>
                                    {payment.notify === 'Chưa chọn'
                                        ? 'Chưa chọn'
                                        : TIME_TO_COME[
                                              TIME_TO_COME.findIndex(
                                                  (e: any) =>
                                                      e.value === payment.notify
                                              )
                                          ]?.label}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </PageContainer>
    );
};
