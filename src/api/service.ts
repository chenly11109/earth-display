import axios from "axios";

axios.defaults.baseURL = "http://data.reachplatform.org";

axios.interceptors.request.use(
    (config) => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            "Content-Type": "application/json",
            "token": 'b7f9cba6bbc14dc88b6dd677c7118944'
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        if (response.data.errCode === 2) {
            console.log("过期");
        }
        return response;
    },
    (error) => {
        console.error("请求出错：", error);
    }
);

export { axios as service };
