import React from 'react';
import { ChangePassForm, InfoForm } from '../../components';

interface Props {
    data?: any;
}

export const Profile = (props: Props) => {
    const [page, setPage] = React.useState(1);
    const { data } = props;

    const handleChangePage = (currentPage: number) => {
        if (currentPage === page) return;
        document
            .querySelectorAll('.nav-link')
            .forEach((e: any) => e.classList.remove('active'));
        document
            .getElementById(`nav-link-${currentPage}`)!
            .classList.add('active');
        setPage(currentPage);
    };

    return (
        <div className="container">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className="nav-link active"
                        id="nav-link-1"
                        onClick={() => handleChangePage(1)}
                    >
                        Thông tin cá nhân
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="nav-link"
                        id="nav-link-2"
                        onClick={() => handleChangePage(2)}
                    >
                        Đổi mật khẩu
                    </button>
                </li>
            </ul>
            <div className="mb-3">
                {page === 1 ? <InfoForm info={data} /> : <ChangePassForm />}
            </div>
        </div>
    );
};
