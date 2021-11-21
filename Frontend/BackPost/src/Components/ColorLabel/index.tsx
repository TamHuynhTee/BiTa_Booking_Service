import React from 'react';
export const ColorLabel = (props: { for?: string; title?: string }) => {
    return (
        <label htmlFor={props.for} className="form-label fw-bold color-label">
            {props.title}
        </label>
    );
};
