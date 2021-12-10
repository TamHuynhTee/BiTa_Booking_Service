import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChartResponsive } from '../../../../Components';
import { selectManagerStats } from '../../slice/selector';
import * as dayjs from 'dayjs';
import { getManagerStatsAsync } from '../../slice/thunk';
interface Props {}

export const ManagerStatistics = (props: Props) => {
    const dispatch = useDispatch();
    const stats = useSelector(selectManagerStats);
    React.useEffect(() => {
        dispatch(getManagerStatsAsync({ year: dayjs().year() }));
    }, []);
    return (
        <div className="container">
            <h4>Thống kê</h4>
            <hr />
            <div className="row g-2 my-3">
                <DataCard
                    color="primary"
                    header="Tổng số dịch vụ"
                    content={stats?.serviceNumber}
                />
                <DataCard
                    color="success"
                    header="Tổng số doanh nghiệp"
                    content={stats?.businessNumber}
                />
                <DataCard
                    color="secondary"
                    header="Tổng số cuộc hẹn"
                    content={stats?.appointmentNumber}
                />
                <DataCard
                    color="info"
                    header="Tổng số loại dịch vụ"
                    content={stats?.categoryNumber}
                />
            </div>
            <div className="my-3">
                <LineChartResponsive
                    title={`Thống kê lượng dịch vụ trong năm ${dayjs().year()}`}
                    grid
                    name="month"
                    data={stats?.services}
                    dataKey="count"
                />
            </div>
            <div className="my-3">
                <LineChartResponsive
                    title={`Thống kê lượng doanh nghiệp trong năm ${dayjs().year()}`}
                    grid
                    name="month"
                    data={stats?.businesses}
                    dataKey="count"
                />
            </div>
            <div className="my-3">
                <LineChartResponsive
                    title={`Thống kê lượng cuộc hẹn trong năm ${dayjs().year()}`}
                    grid
                    name="month"
                    data={stats?.appointments}
                    dataKey="count"
                />
            </div>
        </div>
    );
};

const DataCard = (props: {
    color?: 'primary' | 'success' | 'secondary' | 'info';
    header?: string;
    content?: number;
}) => {
    const { color, header, content } = props;
    return (
        <div className="col-md-6">
            <div className={`card text-white bg-${color} mb-3`}>
                <div className="card-body">
                    <h5 className="card-title fw-bold">{header}</h5>
                    <h4 className="text-center">{content}</h4>
                </div>
            </div>
        </div>
    );
};
