import React from 'react';

interface SearchBarProps {
    placeholder?: string;
    submit?: any;
}

export const SearchBar = (props: SearchBarProps) => {
    const { submit, placeholder } = props;
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
        }, 300);
    };

    return (
        <form>
            <input
                className="form-control"
                type="text"
                placeholder={placeholder}
                value={keyword}
                onChange={handleSearchChange}
            />
        </form>
    );
};
