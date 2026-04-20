import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: 60000,   // ms * 1000
    timeoutErrorMessage: "Server time out...",
    headers :{
        "Content-Type" : "application/json"
    }

})

export default axiosInstance