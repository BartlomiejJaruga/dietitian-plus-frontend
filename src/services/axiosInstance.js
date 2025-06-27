import axios from "axios";
import { tokenNamesENUM } from "@enums";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8090/api",
});

// === Refresh Token Handling ===
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// === Request Interceptor ===
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem(tokenNamesENUM.ACCESS_TOKEN_NAME);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// === Response Interceptor ===
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const refreshToken = sessionStorage.getItem(
            tokenNamesENUM.REFRESH_TOKEN_NAME
        );

        // only if error status is 401 there should be refresh try
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            refreshToken
        ) {
            originalRequest._retry = true;

            // if the token is currently being refreshed add request to queue
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            // try refreshing token
            isRefreshing = true;

            try {
                const response = await axios.post(
                    "http://localhost:8090/api/v1/auth/refresh-token",
                    { refresh_token: refreshToken }
                );

                const newAccessToken = response.data.access_token;
                const newRefreshToken = response.data.refresh_token;

                sessionStorage.setItem(
                    tokenNamesENUM.ACCESS_TOKEN_NAME,
                    newAccessToken
                );
                sessionStorage.setItem(
                    tokenNamesENUM.REFRESH_TOKEN_NAME,
                    newRefreshToken
                );

                axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);

                return axiosInstance(originalRequest);
            } catch (err) {
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
