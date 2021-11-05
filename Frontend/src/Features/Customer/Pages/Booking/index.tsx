import { PageContainer, PageWrapper } from '../../../../Components';
import React from 'react';
import './style.scss';
import { BookingForm } from '../../Components';

interface Props {}

export const Booking = (props: Props) => {
    return (
        <PageContainer>
            <PageWrapper className="d-flex p-5">
                <div className="booking-input h-100 p-3">
                    <BookingForm />
                </div>
                <div className="booking-summary h-100 p-3">
                    <div className="bill"></div>
                </div>
            </PageWrapper>
        </PageContainer>
    );
};
