import * as yup from 'yup';

export const CreateBranchSchema = yup.object().shape({
    name: yup.string().required('Chưa nhập tên cho chi nhánh'),
    street: yup.string().required('Chưa nhập số nhà và đường của chi nhánh'),
    ward: yup.string().required('Chưa nhập phường, xã của chi nhánh'),
    district: yup.string().required('Chưa nhập quận, huyện của chi nhánh'),
    province: yup.string().required('Chưa nhập tỉnh, thành của chi nhánh'),
});
