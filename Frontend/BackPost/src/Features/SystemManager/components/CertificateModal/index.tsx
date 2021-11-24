import React from 'react';
import { useSelector } from 'react-redux';
import { selectBusinessDetail } from '../../slice/selector';

interface Props {}

export const CertificateModal = (props: Props) => {
    const data = useSelector(selectBusinessDetail);
    return (
        <div
            className="modal fade"
            aria-hidden="true"
            id="certificate"
            tabIndex={-1}
        >
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Giấy phép kinh doanh</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex justify-content-center">
                            <img src={data?.businessCertificate} alt="" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            data-bs-toggle="modal"
                            data-bs-target="#businessInfo"
                        >
                            Trở về
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
