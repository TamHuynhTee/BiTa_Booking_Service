import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../App/auth/slice/selector';
import {
    LoadingComponent,
    NoDataView,
    PageContainer,
    PageWrapper,
    Pagination,
} from '../../../../Components';
import { APPOINTMENT_PAID_FILTER } from '../../../../utils/selectOptions';
import { AppointmentCard, AppointmentDetailCustomer } from '../../Components';
import {
    selectCustomerLoading,
    selectQueryAppointments,
} from '../../slice/selector';
import { queryAppointmentAsync } from '../../slice/thunk';
import { IQueryAppointment } from '../../type';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { thisDay } from '../../../../utils/thisDay';

dayjs.extend(utc);

const startOfDay = dayjs().startOf('day').toDate();
const endOfDay = dayjs()
    .startOf('day')
    .add(1, 'day')
    .subtract(1, 'minute')
    .toDate();

export const CustomerHomepage = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    const [query, setQuery] = React.useState<IQueryAppointment>({
        customer: userId || user?.user?.id,
        state: 'Pending',
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
        console.log(e.target.value);
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

    return (
        <PageContainer>
            <PageWrapper>
                <h2 className="fw-bold">Lịch hẹn của tôi</h2>
                <hr />
                <AppointmentFiler
                    changeDate={handleChangeDate}
                    changeToday={handleChangeToday}
                    changePayment={handleChangePayment}
                />
                <div className="my-3">
                    {loading === 'idle' ? (
                        <>
                            <div className="row g-2">
                                {appointments?.totalResults ? (
                                    appointments.results?.map(
                                        (e: any, i: number) => (
                                            <div className="col-sm-3" key={i}>
                                                <AppointmentCard data={e} />
                                            </div>
                                        )
                                    )
                                ) : (
                                    <NoDataView />
                                )}
                            </div>
                            <hr />
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
}) => {
    const { changeDate, changeToday, changePayment } = props;
    return (
        <>
            <div className="input-group mb-2">
                <div className="me-3 row">
                    <label className="col-form-labe col-sm-2">Từ</label>
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
                    <label className="col-form-labe col-sm-2">Đến</label>
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
            </div>
        </>
    );
};
