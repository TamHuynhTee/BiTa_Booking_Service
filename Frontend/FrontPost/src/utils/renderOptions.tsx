import React from 'react';
export const renderOptions = (arr: Array<any>) => {
    return arr.map((e: any, i: number) => (
        <option value={e.value} key={i}>
            {e.label}
        </option>
    ));
};
