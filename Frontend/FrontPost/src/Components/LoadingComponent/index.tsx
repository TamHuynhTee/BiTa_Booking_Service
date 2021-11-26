import React from 'react';
import { BeatLoader } from 'react-spinners';

export const LoadingComponent = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '300px' }}
        >
            <BeatLoader size={30} color={'#3fa3db'} />
        </div>
    );
};
