import React from 'react';
import { useParams } from 'react-router';

interface Props {}

export const BranchDetail = (props: Props) => {
    const { id } = useParams<any>();
    return <div>branch {id}</div>;
};
