import React from 'react';
import nodata from '../../images/no-data.svg';

interface Props {}

export const NoDataView = (props: Props) => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: '300', opacity: '.8' }}
        >
            <img src={nodata} alt="No data" height="250" />
            <h5 className="mt-3" style={{ userSelect: 'none' }}>
                Không có dữ liệu
            </h5>
        </div>
    );
};
