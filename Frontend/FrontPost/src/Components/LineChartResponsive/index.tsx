import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
    title?: string;
    data?: any;
    dataKey?: string;
    grid?: boolean;
}

export const LineChartResponsive = (props: LineChartProps) => {
    const { title, data, dataKey, grid } = props;
    return (
        <div className="chart">
            <h5 className="text-center fw-bold">{title}</h5>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#5550bd" />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip />
                    {grid && (
                        <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                    )}
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
