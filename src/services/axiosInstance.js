import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8090/api",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("Bearer_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
