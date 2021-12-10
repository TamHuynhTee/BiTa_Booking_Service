import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

interface CustomSelectProps {
    options?: Array<any> | [];
    placeholder?: string;
    name?: any;
}

export const CustomSelect = (props: {
    options: Array<any>;
    name: string;
    control: any;
    errors: any;
    placeholder: string;
    noOptionsMessage?: any;
    handleChange?: Function | any;
    objKey?: string;
}) => {
    const {
        options,
        control,
        name,
        errors,
        placeholder,
        noOptionsMessage,
        handleChange,
        objKey,
        ...rest
    } = props;

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value, name } }) => (
                    <Select
                        name={name}
                        options={options}
                        value={options?.find(
                            (option: any) => option.value === value
                        )}
                        onChange={(val: any) => {
                            onChange(val.value);
                            handleChange(objKey, val.value);
                        }}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        noOptionsMessage={noOptionsMessage}
                        isClearable={true}
                        {...rest}
                    />
                )}
            />
            <p className="text-danger">{errors?.[name]?.message}</p>
        </>
    );
};
