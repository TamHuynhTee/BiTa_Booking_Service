import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../App/auth/slice/selector';
import { PageContainer, PageWrapper } from '../../../../Components';
import { Scheduler } from '../../Components/Scheduler';

interface Props {}

export const CustomerHomepage = (props: Props) => {
    const user = useSelector(selectUser);
    return (
        <PageContainer>
            <PageWrapper>
                <h2 className="fw-bold">Lịch hẹn của tôi</h2>
                <hr />
                <Scheduler />
                <hr />
            </PageWrapper>
        </PageContainer>
    );
};
