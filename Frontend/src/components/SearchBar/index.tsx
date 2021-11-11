import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
    placeholder?: string;
    submit?: any;
}

export const SearchBar = (props: Props) => {
    const { register, handleSubmit } = useForm();
    return (
        <form className="d-flex" onSubmit={handleSubmit(props.submit)}>
            <input
                className="form-control"
                {...register('keyword')}
                type="search"
                placeholder={props.placeholder}
            />
        </form>
    );
};
