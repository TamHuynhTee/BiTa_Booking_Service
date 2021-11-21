import React from 'react';
import {
    ScheduleComponent,
    Day,
    Week,
    Month,
    Agenda,
    Inject,
} from '@syncfusion/ej2-react-schedule';

interface SchedulerProps {}

export const Scheduler = (props: SchedulerProps) => {
    const data = [
        {
            Id: 1,
            Subject: 'Explosion of Betelgeuse Star',
            StartTime: new Date(2021, 10, 15, 9, 30),
            EndTime: new Date(2021, 10, 15, 10, 0),
        },
        {
            Id: 2,
            Subject: 'Thule Air Crash Report',
            StartTime: new Date(2021, 10, 12, 12, 0),
            EndTime: new Date(2021, 10, 12, 14, 0),
        },
        {
            Id: 3,
            Subject: 'Blue Moon Eclipse',
            StartTime: new Date(2021, 10, 13, 9, 30),
            EndTime: new Date(2021, 10, 13, 10, 0),
        },
        {
            Id: 4,
            Subject: 'Hẹn bác sĩ Khoa',
            StartTime: new Date(2021, 10, 14, 13, 0),
            EndTime: new Date(2021, 10, 14, 14, 30),
        },
    ];
    return (
        <ScheduleComponent
            height="550px"
            selectedDate={new Date()}
            eventSettings={{ dataSource: data }}
            disabled
            dateFormat="dd/MM/yyyy"
        >
            <Inject services={[Day, Week, Month]} />
        </ScheduleComponent>
    );
};
