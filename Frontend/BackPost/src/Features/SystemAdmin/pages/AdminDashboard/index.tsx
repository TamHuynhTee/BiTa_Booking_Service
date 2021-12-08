import React from 'react';
import * as dayjs from 'dayjs';
import { LineChartResponsive } from '../../../../Components';
import { getAdminStatsAsync } from '../../slice/thunk';
import { selectAdminStats } from '../../slice/selector';
import { useDispatch, useSelector } from 'react-redux';

export const AdminDashboard = () => {
    const dispatch = useDispatch();
    const stats = useSelector(selectAdminStats);
    React.useEffect(() => {
        dispatch(getAdminStatsAsync({ year: dayjs().year() }));
    }, []);
    return (
        <div className="container">
            <h4>Trang chủ</h4>
            <hr />
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
