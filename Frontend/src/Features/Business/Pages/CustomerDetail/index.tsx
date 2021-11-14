import React from 'react';
import { useParams } from 'react-router';

interface Props {}

export const CustomerDetail = (props: Props) => {
    const params = useParams<any>();
    return <div>customer {params.id}</div>;
};
