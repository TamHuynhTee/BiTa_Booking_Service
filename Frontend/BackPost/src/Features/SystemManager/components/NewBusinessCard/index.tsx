import React from 'react';
import { useDispatch } from 'react-redux';
import { CertificateModal, NewBusinessInfoModal } from '..';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { approveBusinessApi } from '../../apis/systemmanager.api';
import { getDetailBusiness } from '../../slice';
import { queryBusinessAsync } from '../../slice/thunk';

export const NewBusinessCard = (props: { data?: any }) => {
    const dispatch = useDispatch();
    const { data } = props;

    const handleConfirmBusiness = async (decision: boolean) => {
        try {
            if (confirm(`Bạn xác nhận ${decision ? 'duyệt' : 'từ chối'}?`)) {
                const result = await approveBusinessApi({
                    businessId: data?.id,
                    decision: decision,
                });
                if (result.code === 200) {
                    notifySuccess(result.message);
                    dispatch(queryBusinessAsync({ isConfirmed: false }));
                } else {
                    notifyError(result.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card text-center mb-2">
            <div className="card-header">
                <h5>{data?.displayName}</h5>
            </div>
            <div className="card-body">
                <h5>{data?.businessName}</h5>
                <p className="card-text">{data?.shortDescription}</p>
                <p className="card-text">Chủ sở hữu: {data?.ownerName}</p>
                <a
                    className="card-text text-end"
                    style={{
                        cursor: 'pointer',
                        textDecoration: 'none',
                    }}
                    onClick={() => dispatch(getDetailBusiness(data))}
                    data-bs-toggle="modal"
                    data-bs-target="#businessInfo"
                >
                    Chi tiết{' >'}
                </a>
            </div>
            <div className="card-footer">
                <button
                    className="btn btn-success me-2"
                    onClick={() => handleConfirmBusiness(true)}
                >
                    Duyệt
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => handleConfirmBusiness(false)}
                >
                    Từ chối
                </button>
            </div>
            {/* Info */}
            <NewBusinessInfoModal />
            {/* Certificate */}
            <CertificateModal />
        </div>
    );
};
