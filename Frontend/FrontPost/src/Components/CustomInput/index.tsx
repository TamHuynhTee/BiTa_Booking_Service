import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { ColorLabel } from '..';

export const CustomInput = (props: {
    type?: 'text' | 'password' | 'email';
    register?: any;
    name?: string;
    placeholder?: string;
    errors?: any;
    title?: any;
    disabled?: boolean;
}) => {
    const { type, register, name, placeholder, errors, title, disabled } =
        props;
    return (
        <div className="form-group mb-3">
            <ColorLabel title={title} for={name} />
            <input
                className="form-control"
                type={type}
                name={name}
                {...register(name)}
                placeholder={placeholder}
                id={name}
                disabled={disabled}
            />
            <ErrorMessage
                errors={errors}
                name={name || ''}
                as={<p className="text-danger"></p>}
            />
        </div>
    );
};
