import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { ColorLabel } from '..';

export const CustomSelect = (props: {
    options?: Array<any> | [];
    register?: any;
    name?: string;
    placeholder?: string;
    errors?: any;
    title?: any;
}) => {
    const { options, register, name, placeholder, errors, title } = props;
    return (
        <div className="form-group mb-3">
            <ColorLabel title={title} for={name} />
            <select
                className="form-select"
                {...register(name)}
                placeholder={placeholder}
                id={name}
            >
                {options?.map((e: any, i: number) => (
                    <option key={i} value={e.value}>
                        {e.label}
                    </option>
                ))}
            </select>
            <ErrorMessage
                errors={errors}
                name={name || ''}
                as={<p className="text-danger"></p>}
            />
        </div>
    );
};
