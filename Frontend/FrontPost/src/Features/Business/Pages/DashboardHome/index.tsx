import React from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { LineChartResponsive } from '../../../../Components/LineChartResponsive';
import empty from '../../../../images/empty.svg';

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

export const DashboardHome = (props: Props) => {
    const news = [];

    return (
        <div className="container">
            <h5 className="fw-bold">
                <i className="bi bi-send-fill"></i> Cuộc hẹn mới
            </h5>
            <hr />
            <div className="mb-3">
                {news.length ? (
                    <div></div>
                ) : (
                    <>
                        <div
                            className="d-flex flex-column align-items-center"
                            style={{ opacity: '0.5' }}
                        >
                            <img src={empty} alt="" className="mb-3 w-50" />
                            <h6 className="fw-bold">Không có cuộc hẹn mới</h6>
                        </div>
                    </>
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
        </div>
    );
};
