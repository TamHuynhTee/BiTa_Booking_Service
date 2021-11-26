import React from 'react';

interface SearchBarProps {
    placeholder?: string;
    submit?: any;
    className?: string;
}

export const SearchBar = (props: SearchBarProps) => {
    const { submit, placeholder, className } = props;
    const [keyword, setKeyword] = React.useState('');
    const typingTimeoutRef = React.useRef<any>(null);

    // debounce
    const handleSearchChange = (e: any) => {
        const value = e.target.value;
        setKeyword(value);
        if (!submit) return;
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                keyword: value,
            };
            submit(formValues);
        }, 500);
    };

    return (
        <form className={`${className}`}>
            <input
                className={`form-control`}
                type="text"
                placeholder={placeholder}
                value={keyword}
                onChange={handleSearchChange}
            />
        </form>
    );
};
