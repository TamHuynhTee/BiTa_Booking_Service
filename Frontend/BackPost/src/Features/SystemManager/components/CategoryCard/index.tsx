import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getDetailCategory } from '../../slice';

export const CategoryCard = (props: { data?: any }) => {
    const { name, code, id } = props.data;
    const dispatch = useDispatch();
    const history = useHistory();
    const handleChangePage = () => {
        dispatch(getDetailCategory(props.data));
        history.push(`/dashboard/category/${id}`);
    };

    return (
        <div className="card col-lg-4 bg-light" style={{ height: '300' }}>
            <div className="card-body">
                <h5 className="text-center">{name}</h5>
                <p className="card-text text-center">{code}</p>
                <a
                    className="card-text text-end"
                    onClick={handleChangePage}
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                    Chi tiết{' >'}
                </a>
            </div>
        </div>
    );
};
