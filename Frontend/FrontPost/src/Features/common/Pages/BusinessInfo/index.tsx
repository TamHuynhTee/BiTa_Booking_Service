import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
    selectBusinessBranches,
    selectServices,
} from '../../../Business/slice/selector';
import {
    getAllBranchAsync,
    queryServiceAsync,
} from '../../../Business/slice/thunk';
import { ServiceListItem } from '../../Components';
import { selectBusinessDetail } from '../../slice/selector';
import { getBusinessDetailAsync } from '../../slice/thunk';
import './style.scss';

interface BusinessInfoProps {}

const thumbnail = 'https://picsum.photos/200/200';
export const BusinessInfo = (props: BusinessInfoProps) => {
    const dispatch = useDispatch();
    const { id } = useParams<any>();
    const business = useSelector(selectBusinessDetail);
    const branches = useSelector(selectBusinessBranches);
    const services = useSelector(selectServices);
    React.useEffect(() => {
        dispatch(getBusinessDetailAsync({ businessId: id }));
        dispatch(getAllBranchAsync({ businessId: id }));
        dispatch(queryServiceAsync({ business: id, isActive: true }));
    }, []);
    // console.log(business, branches, services);

    const renderHeadquarter = () => {
        const headquarter = branches?.find(
            (item: any) => item.id === business?.headquarter
        );
        return (
            <p className="ms-5">
                <span className="badge bg-primary">{headquarter?.name}</span>{' '}
                {`${headquarter?.address.street}, ${headquarter?.address.ward}, ${headquarter?.address.district}, ${headquarter?.address.province}`}
            </p>
        );
    };
    return (
        <div className="container">
            <div className="businessInfo">
                <div className="businessInfo-wrapper p-3 mb-5 bg-body rounded">
                    <div className="d-flex align-items-center flex-column">
                        <img
                            src={business?.businessAccount?.avatar || thumbnail}
                            className="img-thumbnail"
                            alt="..."
                            height="200"
                            width="200"
                        />
                        <h2 className="fw-bold mt-3">
                            {business?.businessName}
                        </h2>
                        <h4 className="mt-2 fst-italic">
                            {business?.displayName}
                        </h4>
                    </div>
                    <hr />
                    <div className="mt-5 mb-5 fs-4">
                        <h2 className="fw-bold">Thông tin cơ bản</h2>
                        <ul className="ms-5">
                            <li>
                                <span className="badge bg-secondary">
                                    Tên công ty
                                </span>
                                <p className="ms-5">{business?.businessName}</p>
                            </li>
                            <li>
                                <span className="badge bg-secondary">
                                    Trụ sở
                                </span>
                                {renderHeadquarter()}
                            </li>
                            <li>
                                <span className="badge bg-secondary">
                                    Số điện thoại liên lạc
                                </span>
                                <p className="ms-5">
                                    {business?.businessAccount?.phoneNumber}
                                </p>
                            </li>
                            <li>
                                <span className="badge bg-secondary">
                                    Email
                                </span>
                                <p className="ms-5">
                                    {business?.businessAccount?.email}
                                </p>
                            </li>
                            <li>
                                <span className="badge bg-secondary">
                                    Chủ sở hữu
                                </span>
                                <p className="ms-5">{business?.ownerName}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-5 mb-5 fs-4">
                        <h2 className="fw-bold">Chi nhánh</h2>
                        <ul className="ms-5 businessInfo-wrapper-branch">
                            {branches?.map((e: any, i: number) => (
                                <li key={i}>
                                    <p>
                                        <span className="badge bg-primary">
                                            {e.name}
                                        </span>{' '}
                                        {`${e.address.street}, ${e.address.ward}, ${e.address.district}, ${e.address.province}`}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-5 mb-5">
                        <h2 className="fw-bold">Dịch vụ</h2>
                        <div className="row mt-3">
                            {services?.results?.map((e: any, i: number) => (
                                <div className="col-3" key={i}>
                                    <ServiceListItem data={e} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
