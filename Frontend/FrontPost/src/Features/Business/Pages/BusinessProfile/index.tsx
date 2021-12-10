import React from 'react';
import { BusinessInfo } from '..';
import { ChangePassForm, UserInfoForm } from '../../../common/Components';

export const BusinessProfile = (props: { data?: any }) => {
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
                        Thông tin doanh nghiệp
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="nav-link"
                        id="nav-link-3"
                        onClick={() => handleChangePage(3)}
                    >
                        Đổi mật khẩu
                    </button>
                </li>
            </ul>
            <div className="my-3">
                {page === 1 ? (
                    <UserInfoForm info={data?.user} />
                ) : page === 2 ? (
                    <BusinessInfo info={data?.business} />
                ) : (
                    <ChangePassForm />
                )}
            </div>
        </div>
    );
};
