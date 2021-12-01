import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingComponent, Pagination } from '../../../../Components';
import { LineChartResponsive } from '../../../../Components/LineChartResponsive';
import empty from '../../../../images/empty.svg';
import {
    selectCustomerLoading,
    selectQueryAppointments,
} from '../../../Customer/slice/selector';
import { queryAppointmentAsync } from '../../../Customer/slice/thunk';
import { IQueryAppointment } from '../../../Customer/type';
import {
    AppointmentBusinessCard,
    AppointmentDetailBusiness,
} from '../../Components';
import * as dayjs from 'dayjs';
interface Props {}

export const TestUserDataHome = [
    {
        name: 'Jan',
        'Active User': 4000,
    },
    {
        name: 'Feb',
        'Active User': 3000,
    },
    {
        name: 'Mar',
        'Active User': 2000,
    },
    {
        name: 'Apr',
        'Active User': 2780,
    },
    {
        name: 'May',
        'Active User': 1890,
    },
    {
        name: 'Jun',
        'Active User': 2390,
    },
    {
        name: 'Jul',
        'Active User': 3490,
    },
    {
        name: 'Aug',
        'Active User': 3490,
    },
    {
        name: 'Sep',
        'Active User': 2527,
    },
    {
        name: 'Oct',
        'Active User': 9353,
    },
    {
        name: 'Nov',
        'Active User': 6237,
    },
    {
        name: 'Dec',
        'Active User': 9573,
    },
];

const startOfDay = dayjs().startOf('day').toDate();

export const DashboardHome = (props: { business?: any }) => {
    const dispatch = useDispatch();
    const { business } = props;
    const [query, setQuery] = React.useState<IQueryAppointment>({
        business: business,
        state: 'Pending',
        startTime: startOfDay,
    });
    const loading = useSelector(selectCustomerLoading);
    const appointments = useSelector(selectQueryAppointments);
    React.useEffect(() => {
        dispatch(queryAppointmentAsync(query));
    }, []);

    const handleChangePage = (page: number) => {
        dispatch(queryAppointmentAsync({ ...query, page: page }));
    };

    return (
        <div className="container">
            <h5 className="fw-bold">Cuộc hẹn mới</h5>
            <hr />
            <div className="mb-3">
                {loading === 'idle' ? (
                    <>
                        <div className="row g-2">
                            {appointments?.totalResults ? (
                                appointments.results?.map(
                                    (e: any, i: number) => (
                                        <div className="col-sm-3" key={i}>
                                            <AppointmentBusinessCard data={e} />
                                        </div>
                                    )
                                )
                            ) : (
                                <div
                                    className="d-flex flex-column align-items-center"
                                    style={{ opacity: '0.5' }}
                                >
                                    <img
                                        src={empty}
                                        alt=""
                                        className="mb-3 w-50"
                                    />
                                    <h6 className="fw-bold">
                                        Không có cuộc hẹn mới
                                    </h6>
                                </div>
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
            <h5 className="fw-bold">Doanh thu</h5>
            <hr />
            <div>
                <LineChartResponsive
                    data={TestUserDataHome}
                    dataKey="Active User"
                    title="Phan tich luong nguoi dung"
                    grid
                />
            </div>
            <AppointmentDetailBusiness />
        </div>
    );
};
