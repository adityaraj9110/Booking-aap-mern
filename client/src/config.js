import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://travel-made-easy.herokuapp.com/"
})

export default axiosInstance