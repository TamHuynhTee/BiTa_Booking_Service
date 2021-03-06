import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
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

const thumbnail = 'https://picsum.photos/200/200';
export const BusinessInfo = () => {
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
                    <Link to="/businesses">{'<< '}V??? danh s??ch</Link>
                    <hr />
                    <div className="mt-5 mb-5 fs-4">
                        <h2 className="fw-bold">Th??ng tin c?? b???n</h2>
                        <ul className="ms-5">
                            <li>
                                <span className="badge bg-secondary">
                                    T??n c??ng ty
                                </span>
                                <p className="ms-5">{business?.businessName}</p>
                            </li>
                            {business?.headquarter && (
                                <li>
                                    <span className="badge bg-secondary">
                                        Tr??? s???
                                    </span>
                                    {renderHeadquarter()}
                                </li>
                            )}
                            <li>
                                <span className="badge bg-secondary">
                                    S??? ??i???n tho???i li??n l???c
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
                                    Ch??? s??? h???u
                                </span>
                                <p className="ms-5">{business?.ownerName}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-5 mb-5 fs-4">
                        <h2 className="fw-bold">Chi nh??nh</h2>
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
                        <h2 className="fw-bold">D???ch v???</h2>
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
