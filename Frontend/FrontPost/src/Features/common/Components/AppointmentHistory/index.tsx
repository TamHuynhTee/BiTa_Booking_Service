import React from 'react';
import {
    LoadingComponent,
    NoDataView,
    PageContainer,
    PageWrapper,
    Pagination,
} from '../../../../Components';
import {
    APPOINTMENT_PAID_FILTER,
    APPOINTMENT_STATE_FILTER,
} from '../../../../utils/selectOptions';
import { thisDay } from '../../../../utils/thisDay';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { selectUser } from '../../../../App/auth/slice/selector';
import { useDispatch, useSelector } from 'react-redux';
import { IQueryAppointment } from '../../../Customer/type';
import {
    selectCustomerLoading,
    selectQueryAppointments,
} from '../../../Customer/slice/selector';
import { queryAppointmentAsync } from '../../../Customer/slice/thunk';
import {
    AppointmentCard,
    AppointmentDetailCustomer,
} from '../../../Customer/Components';
dayjs.extend(utc);

const startOfDay = dayjs().startOf('day').toDate();
const endOfDay = dayjs()
    .startOf('day')
    .add(1, 'day')
    .subtract(1, 'minute')
    .toDate();

export const AppointmentHistory = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    const [query, setQuery] = React.useState<IQueryAppointment>({
        customer: userId || user?.user?.id,
        startTime: startOfDay,
        endTime: endOfDay,
    });
    const loading = useSelector(selectCustomerLoading);
    const appointments = useSelector(selectQueryAppointments);

    React.useEffect(() => {
        dispatch(queryAppointmentAsync(query));
    }, []);

    const handleChangePage = (page: number) => {
        dispatch(queryAppointmentAsync({ ...query, page: page }));
    };

    const handleChangeDate = (e: any, type?: 'start' | 'end') => {
        const date = dayjs(e.target.value).utc().toDate();
        // console.log(date);
        if (type === 'start') {
            setQuery({ ...query, startTime: date });
            dispatch(queryAppointmentAsync({ ...query, startTime: date }));
        }
        if (type === 'end') {
            setQuery({ ...query, endTime: date });
            dispatch(queryAppointmentAsync({ ...query, endTime: date }));
        }
    };

    const handleChangeToday = () => {
        dispatch(
            queryAppointmentAsync({
                ...query,
                startTime: startOfDay,
                endTime: endOfDay,
            })
        );
        setQuery({
            ...query,
            startTime: startOfDay,
            endTime: endOfDay,
        });
    };

    const handleChangePayment = (e: any) => {
        const value = e.target.value;
        if (!value) {
            delete query.payment;
            dispatch(queryAppointmentAsync(query));
            setQuery(query);
        } else {
            dispatch(queryAppointmentAsync({ ...query, payment: value }));
            setQuery({ ...query, payment: value });
        }
    };

    const handleChangeState = (e: any) => {
        const value = e.target.value;
        if (!value) {
            delete query.payment;
            dispatch(queryAppointmentAsync(query));
            setQuery(query);
        } else {
            dispatch(queryAppointmentAsync({ ...query, state: value }));
            setQuery({ ...query, state: value });
        }
    };

    return (
        <PageContainer>
            <PageWrapper>
                <h2 className="fw-bold">Lịch sử đặt hẹn</h2>
                <hr />
                <AppointmentFiler
                    changeDate={handleChangeDate}
                    changeToday={handleChangeToday}
                    changePayment={handleChangePayment}
                    changeState={handleChangeState}
                />
                <div className="my-3">
                    {loading === 'idle' ? (
                        <>
                            <div className="row g-2">
                                {appointments?.totalResults ? (
                                    <>
                                        {appointments.results?.map(
                                            (e: any, i: number) => (
                                                <div
                                                    className="col-sm-3"
                                                    key={i}
                                                >
                                                    <AppointmentCard
                                                        data={e}
                                                        query={query}
                                                    />
                                                </div>
                                            )
                                        )}
                                        <hr />
                                    </>
                                ) : (
                                    <NoDataView />
                                )}
                            </div>

                            <div className="my-3 d-flex justify-content-between align-items-center">
                                <Pagination
                                    totalPages={appointments?.totalPages}
                                    query={handleChangePage}
                                    page={appointments?.page}
                                />
                            </div>
                        </>
                    ) : (
                        <LoadingComponent />
                    )}
                </div>
            </PageWrapper>
            <AppointmentDetailCustomer />
        </PageContainer>
    );
};

const AppointmentFiler = (props: {
    changeDate?: any;
    changeToday?: any;
    changePayment?: any;
    changeState?: any;
}) => {
    const { changeDate, changeToday, changePayment, changeState } = props;
    return (
        <>
            <div className="input-group mb-2">
                <div className="me-3 row">
                    <label className="col-form-label col-sm-2">Từ</label>
                    <div className="col-sm-10">
                        <input
                            type="date"
                            className="form-control"
                            defaultValue={thisDay()}
                            onChange={(e: any) => changeDate(e, 'start')}
                        />
                    </div>
                </div>
                <div className="me-3 row">
                    <label className="col-form-label col-sm-2">Đến</label>
                    <div className="col-sm-10">
                        <input
                            type="date"
                            className="form-control"
                            defaultValue={thisDay()}
                            onChange={(e: any) => changeDate(e, 'end')}
                        />
                    </div>
                </div>
                <div className="me-3">
                    <button className="btn btn-light" onClick={changeToday}>
                        Hôm nay
                    </button>
                </div>
                <select className="form-select" onChange={changePayment}>
                    {APPOINTMENT_PAID_FILTER.map((e: any, i: number) => (
                        <option value={e.value} key={i}>
                            {e.label}
                        </option>
                    ))}
                </select>
                <select className="form-select" onChange={changeState}>
                    {APPOINTMENT_STATE_FILTER.map((e: any, i: number) => (
                        <option value={e.value} key={i}>
                            {e.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};
