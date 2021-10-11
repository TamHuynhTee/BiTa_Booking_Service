import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";
const axiosClient = axios.create({
    baseURL: "https://bita-booking.herokuapp.com/v1",
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    (err) => {
        console.log(err.response);

        return Promise.reject(err);
    }
);
axiosClient.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res && res.data) return res.data;
        return res;
    },
    (err) => {
        console.log(err.response);
        if (err.response && err.response.data) return err.response.data;
        return Promise.reject(err);
    }
);

export default axiosClient;
