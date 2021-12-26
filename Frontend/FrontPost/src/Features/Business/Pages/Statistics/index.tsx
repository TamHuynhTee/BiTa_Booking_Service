import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChartResponsive, LoadingComponent } from '../../../../Components';
import { selectBusinessStats, selectLoading } from '../../slice/selector';
import { getBusinessStatsAsync } from '../../slice/thunk';
import dayjs from 'dayjs';

export const Statistics = (props: { business?: string }) => {
    const { business } = props;
    const dispatch = useDispatch();
    const stats = useSelector(selectBusinessStats);
    const loading = useSelector(selectLoading);

    React.useEffect(() => {
        dispatch(
            getBusinessStatsAsync({
                businessId: business,
                year: dayjs().year(),
            })
        );
    }, []);

    return (
        <div className="container">
            <h4 className="fw-bold">Thống kê</h4>
            <hr />
            {loading === 'loading' ? (
                <LoadingComponent />
            ) : (
                <>
                    <div className="row g-2 my-3">
                        <DataCard
                            color="primary"
                            header="Tổng số dịch vụ"
                            content={stats?.serviceNumber}
                        />
                        <DataCard
                            color="success"
                            header="Tổng số chi nhánh"
                            content={stats?.branchNumber}
                        />
                        <DataCard
                            color="secondary"
                            header="Tổng số cuộc hẹn"
                            content={stats?.appointmentNumber}
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
                            title={`Thống kê lượng chi nhánh trong năm ${dayjs().year()}`}
                            grid
                            name="month"
                            data={stats?.branches}
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
                </>
            )}
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
        <div className="col-md-4">
            <div className={`card text-white bg-${color} mb-3`}>
                <div className="card-body">
                    <h5 className="card-title fw-bold">{header}</h5>
                    <h4 className="text-center">{content}</h4>
                </div>
            </div>
        </div>
    );
};
