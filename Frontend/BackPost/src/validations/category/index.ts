import * as yup from 'yup';

export const CreateCategorySchema = yup.object().shape({
    name: yup.string().required('Chưa nhập tên loại dịch vụ mới'),
    code: yup.string().required('Chưa nhập mã dịch vụ'),
});
