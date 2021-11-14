import React from 'react';
import { useParams } from 'react-router';

interface Props {}

export const ServiceDetail = (props: Props) => {
    const params = useParams<any>();
    return <div>service {params.id}</div>;
};
