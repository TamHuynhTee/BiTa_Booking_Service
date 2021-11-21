import { toast } from 'react-toastify';
export const notify = (content: string) => {
    return toast(content);
};

export const notifyError = (content: string) => {
    return toast.error(content, {
        progress: undefined,
    });
};

export const notifySuccess = (content: string) => {
    return toast.success(content, {
        progress: undefined,
    });
};
