import { PageContainer, PageWrapper } from '../../../../Components';
import React from 'react';
import './style.scss';
import { BookingForm } from '../../Components';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../App/auth/slice/selector';

interface Props {}

export const Booking = (props: Props) => {
    const user = useSelector(selectUser);
    console.log(user);
    return (
        <PageContainer>
            <PageWrapper className="d-flex p-5">
                <div className="booking-input h-100 p-3">
                    <BookingForm />
                </div>
                <div className="booking-summary h-100 p-3">
                    <div className="bill p-3">
                        <h4 className="fw-bold">Thông tin cuộc hẹn</h4>
                    </div>
                </div>
            </PageWrapper>
        </PageContainer>
    );
};
