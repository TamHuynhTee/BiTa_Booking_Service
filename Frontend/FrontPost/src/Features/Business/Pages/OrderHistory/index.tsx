import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../App/auth/slice/selector';
import {
    APPOINTMENT_FILTER,
    APPOINTMENT_PAID_FILTER,
    APPOINTMENT_STATE_FILTER,
} from '../../../../utils/selectOptions';
import { thisDay } from '../../../../utils/thisDay';
import { IQueryAppointment } from '../../../Customer/type';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { queryAppointmentAsync } from '../../../Customer/slice/thunk';
import {
    selectCustomerLoading,
    selectQueryAppointments,
} from '../../../Customer/slice/selector';
import {
    LoadingComponent,
    NoDataView,
    Pagination,
    SearchBar,
} from '../../../../Components';
import { AppointmentBusinessCard } from '../../Components';
import { ResultNumber } from '../../../../Components/ResultNumber';

dayjs.extend(utc);

const startOfDay = dayjs().startOf('day').toDate();
const endOfDay = dayjs()
    .startOf('day')
    .add(1, 'day')
    .subtract(1, 'minute')
    .toDate();

export const OrderHistory = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [query, setQuery] = React.useState<IQueryAppointment>({
        business: user?.business?.id,
        startTime: startOfDay,
        endTime: endOfDay,
        limit: 12,
        filter: APPOINTMENT_FILTER[0].value,
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

    const handleChangeSearch = (data: { keyword: string }) => {
        const { keyword } = data;
        setQuery({ ...query, keyword: keyword });
    };

    const handleChangeFilter = (e: any) => {
        const value = e.target.value;
        setQuery({
            ...query,
            filter: value,
        });
    };

    const handleSubmitSearch = () => {
        dispatch(queryAppointmentAsync(query));
    };

    return (
        <div className="container">
            <h4 className="fw-bold">Lịch sử hẹn</h4>
            <hr />
            <AppointmentFiler
                changeDate={handleChangeDate}
                changeToday={handleChangeToday}
                changePayment={handleChangePayment}
                changeState={handleChangeState}
                changeSearch={handleChangeSearch}
                submitSearch={handleSubmitSearch}
                changeFilter={handleChangeFilter}
            />
            <div className="my-3">
                {loading === 'idle' ? (
                    <>
                        <ResultNumber
                            number={appointments?.totalResults}
                            suffix="cuộc hẹn"
                        />
                        <div className="row g-2">
                            {appointments?.totalResults ? (
                                appointments.results?.map(
                                    (e: any, i: number) => (
                                        <div className="col-sm-3" key={i}>
                                            <AppointmentBusinessCard
                                                data={e}
                                                query={query}
                                            />
                                        </div>
                                    )
                                )
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
        </div>
    );
};

const AppointmentFiler = (props: {
    changeDate?: any;
    changeToday?: any;
    changePayment?: any;
    changeState?: any;
    changeSearch?: any;
    submitSearch?: any;
    changeFilter?: any;
}) => {
    const {
        changeDate,
        changeToday,
        changePayment,
        changeState,
        changeSearch,
        submitSearch,
        changeFilter,
    } = props;
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
            <div className="input-group mb-2 gap-2">
                <SearchBar
                    className="col-md-6"
                    placeholder="Tìm theo"
                    formSubmit={(e: any) => e.preventDefault()}
                    submit={changeSearch}
                />
                <select className="form-select" onChange={changeFilter}>
                    {APPOINTMENT_FILTER.map((e: any, i: number) => (
                        <option value={e.value} key={i}>
                            {e.label}
                        </option>
                    ))}
                </select>
                <button className="btn btn-primary" onClick={submitSearch}>
                    Tìm
                </button>
            </div>
        </>
    );
};
