import React from 'react';

interface InputCustomProps {
    name: string;
    placeholder?: string | '';
    type: 'text' | 'password' | 'email';
    errors: any;
    label: string;
    required?: boolean | false;
    register?: any;
}

export const InputCustom = (props: InputCustomProps) => {
    const { name, placeholder, type, errors, label, required, register } =
        props;
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {`${label} ${required ? '*' : ''}`}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                {...register(name)}
                className="form-control"
                placeholder={placeholder}
            />
            <p className="text-danger">{errors.name?.message}</p>
        </div>
    );
};
