import React from 'react';
import { Link } from 'react-router-dom';
import { verifyEmailApi } from '../../../../App/auth/apis/auth.api';
import { LoadingComponent } from '../../../../Components';

export const VerifyEmail = () => {
    const params: any = new URLSearchParams(window.location.search);
    const [result, setResult] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const getCode = async () => {
        const res = await verifyEmailApi({ token: params.get('token') });
        if (res.code === 200) setResult(true);
        setLoading(false);
    };
    React.useEffect(() => {
        getCode();
        return () => {
            setResult;
        };
    }, []);
    console.log(result);
    return (
        <div className="container d-flex flex-column align-items-center">
            {loading ? (
                <LoadingComponent />
            ) : result ? (
                <>
                    <p className="d-flex align-items-center gap-3">
                        <i
                            className="bi bi-check2-circle"
                            style={{ color: 'green', fontSize: '2rem' }}
                        ></i>{' '}
                        Email đã xác nhận thành công, hãy đăng nhập để tiếp tục.
                    </p>
                    <Link to="/login">Đăng nhập</Link>
                </>
            ) : (
                <>
                    <p className="d-flex align-items-center gap-3">
                        <i
                            className="bi bi-x-circle"
                            style={{ color: 'red', fontSize: '2rem' }}
                        ></i>{' '}
                        Email đã xác nhận không thành công, có lỗi xảy ra. Vui
                        lòng liên hệ với chúng tôi để được tư vấn qua email{' '}
                        <strong>bitabooking2021@gmail.com</strong>
                    </p>
                </>
            )}
        </div>
    );
};
