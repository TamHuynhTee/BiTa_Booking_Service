import React from 'react';

export const ResultNumber = (props: { number?: number; suffix?: string }) => {
    const { number, suffix } = props;
    return (
        <div className="my-3">
            <h5 className="fw-bold" style={{ color: 'royalblue' }}>
                Tìm thấy {number} {suffix}
            </h5>
        </div>
    );
};
