import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectServices } from '../../slice/selector';
import { queryServiceAsync } from '../../slice/thunk';

interface Props {
    business?: string;
}

export const ServiceList = (props: Props) => {
    const dispatch = useDispatch();
    const { business } = props;
    const [active, setActive] = React.useState(true);
    const services = useSelector(selectServices);
    React.useEffect(() => {
        dispatch(queryServiceAsync({ isActive: true, business: business }));
    }, []);

    return (
        <div className="container">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button className="nav-link active" aria-current="page">
                        Đang hoạt động
                    </button>
                </li>
                <li className="nav-item">
                    <button className="nav-link" aria-current="page">
                        Ngưng hoạt động
                    </button>
                </li>
            </ul>
        </div>
    );
};
