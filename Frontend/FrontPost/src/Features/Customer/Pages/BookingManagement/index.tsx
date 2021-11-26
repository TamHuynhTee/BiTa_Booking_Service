import React from 'react';
import './style.scss';
import { PageContainer } from '../../../../Components/PageContainer';
import { PageWrapper } from '../../../../Components/PageWrapper';

interface BookingManagementProps {}

export const BookingManagement = (props: BookingManagementProps) => {
    return (
        <PageContainer>
            <PageWrapper>
                <h1 className="fw-bold text-center">Lịch trình cuộc hẹn</h1>
                <hr />
                <div className="d-flex bookingManagement">
                    <div style={{ flex: 1 }} className="p-3">
                        <input type="date" className="form-control" />
                    </div>
                    <div style={{ flex: 3 }} className="p-3"></div>
                </div>
            </PageWrapper>
        </PageContainer>
    );
};
