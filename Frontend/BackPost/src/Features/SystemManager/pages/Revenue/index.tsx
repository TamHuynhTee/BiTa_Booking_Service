import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChartResponsive } from '../../../../Components';
import { selectManagerRevenue } from '../../slice/selector';
import { getManagerRevenueAsync } from '../../slice/thunk';
import dayjs from 'dayjs';

export const Revenue = () => {
    const [currentYear, setCurrentYear] = React.useState(dayjs().year());
    const dispatch = useDispatch();
    const revenue = useSelector(selectManagerRevenue);
    React.useEffect(() => {
        dispatch(getManagerRevenueAsync({ year: dayjs().year() }));
    }, []);
    const year = [{ value: dayjs().year(), label: dayjs().year() }];
    const yearOption = () => {
        for (let i = 1; i < 3; i++) {
            year.push({
                value: dayjs().subtract(i, 'year').year(),
                label: dayjs().subtract(i, 'year').year(),
            });
        }
    };
    yearOption();

    const handleChangeYear = (e: any) => {
        const value = e.target.value;
        setCurrentYear(value);
        dispatch(getManagerRevenueAsync({ year: value }));
    };

    return (
        <div className="container">
            <h4>Doanh thu toàn hệ thống</h4>
            <hr />
            <div className="my-3">
                <LineChartResponsive
                    data={revenue}
                    dataKey="count"
                    title={`Doanh thu của hệ thống trong năm ${currentYear}`}
                    name="month"
                    grid
                />
            </div>
            <select className="form-select w-25" onChange={handleChangeYear}>
                {year.map((e: any, i: number) => (
                    <option value={e.value} key={i}>
                        {e.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
