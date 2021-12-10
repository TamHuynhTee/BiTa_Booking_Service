import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { selectUser } from '../../../../App/auth/slice/selector';
import { PageContainer, PageWrapper } from '../../../../Components';
import { AppointmentHistory } from '../../Components';
import { ChangePassForm } from '../../Components/ChangePassForm';
import { UserInfoForm } from '../../Components/UserInfoForm';
import './style.scss';

interface ProfileProps {}

const navItems = ['Thông tin cá nhân', 'Đổi mật khẩu'];

export const Profile = (props: ProfileProps) => {
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        document
            .querySelector('.profile-nav-item')!
            .classList.add('profile-nav-active');
    }, []);

    const user = useSelector(selectUser);
    console.log(user);

    const handleChangePage = (currentPage: number) => {
        if (currentPage === page) return;
        document
            .querySelectorAll('.profile-nav-item')
            .forEach((e: any) => e.classList.remove('profile-nav-active'));
        document
            .getElementById(`profile-nav-${currentPage}`)!
            .classList.add('profile-nav-active');
        setPage(currentPage);
    };

    return (
        <PageContainer>
            <PageWrapper className="p-5">
                <div className="h-100">
                    <div className="profile-nav">
                        {navItems.map((e: any, i: number) => (
                            <div
                                key={i}
                                className="profile-nav-item"
                                id={`profile-nav-${i + 1}`}
                                onClick={() => handleChangePage(i + 1)}
                            >
                                {e}
                            </div>
                        ))}
                    </div>
                    <div className="profile-content px-2">
                        {page === 1 ? (
                            <UserInfoForm info={user?.user} />
                        ) : page === 2 ? (
                            <ChangePassForm />
                        ) : (
                            <AppointmentHistory />
                        )}
                    </div>
                </div>
            </PageWrapper>
        </PageContainer>
    );
};
