import React from "react";
import "./style.scss";
import { PageContainer } from "../../components/pageContainer";
import { PageWrapper } from "../../components/pageWrapper";

interface BookingManagementProps {}

export const BookingManagement = (props: BookingManagementProps) => {
    return (
        <PageContainer>
            <PageWrapper>
                <h1>Quản lý cuộc hẹn</h1>
            </PageWrapper>
        </PageContainer>
    );
};
