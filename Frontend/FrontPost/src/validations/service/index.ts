import * as yup from 'yup';

export const CreateServiceSchema = yup.object().shape({
    name: yup.string().required('Chưa nhập tên'),
    category: yup.string().required('Chưa chọn loại dịch vụ'),
    price: yup.string().required('Chưa nhập phí dịch vụ'),
    hasDeposit: yup.boolean().nullable(),
    depositPrice: yup.string().nullable().default('0'),
    quantity: yup
        .string()
        .required('Chưa nhập thời lượng dịch vụ')
        .default('0'),
    description: yup.string().nullable(),
});
