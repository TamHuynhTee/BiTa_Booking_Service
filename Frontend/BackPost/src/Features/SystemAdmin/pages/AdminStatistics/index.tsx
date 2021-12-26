import React from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminStatsAsync } from '../../slice/thunk';
import { selectAdminStats } from '../../slice/selector';
import { LineChartResponsive } from '../../../../Components';

export const AdminStatistics = () => {
    const dispatch = useDispatch();
    const stats = useSelector(selectAdminStats);
    React.useEffect(() => {
        dispatch(getAdminStatsAsync({ year: dayjs().year() }));
    }, []);

    return (
        <div className="container">
            <h4>Thống kê</h4>
            <hr />
            <div className="row g-2 my-3">
                <DataCard
                    color="primary"
                    header="Tổng số khách hàng"
                    content={stats?.userNumber}
                />
                <DataCard
                    color="success"
                    header="Tổng số doanh nghiệp"
                    content={stats?.businessNumber}
                />
            </div>
            <div className="my-3">
                <LineChartResponsive
                    title={`Thống kê lượng khách hàng trong năm ${dayjs().year()}`}
                    grid
                    name="month"
                    data={stats?.users}
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
        </div>
    );
};

const DataCard = (props: {
    color?: 'primary' | 'success' | 'secondary';
    header?: string;
    content?: number;
}) => {
    const { color, header, content } = props;
    return (
        <div className="col">
            <div className={`card text-white bg-${color} mb-3`}>
                <div className="card-body">
                    <h5 className="card-title fw-bold">{header}</h5>
                    <h4 className="text-center">{content}</h4>
                </div>
            </div>
        </div>
    );
};
