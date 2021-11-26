import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { ColorLabel } from '..';

export const CustomDateInput = (props: {
    register?: any;
    name?: string;
    placeholder?: string;
    errors?: any;
    title?: any;
}) => {
    const { register, name, placeholder, errors, title } = props;
    return (
        <div className="form-group mb-3">
            <ColorLabel title={title} for={name} />
            <input
                className="form-control"
                type="date"
                name={name}
                {...register(name)}
                placeholder={placeholder}
                id={name}
                onChange={(e: any) => e.target.value}
            />
            <ErrorMessage
                errors={errors}
                name={name || ''}
                as={<p className="text-danger"></p>}
            />
        </div>
    );
};
