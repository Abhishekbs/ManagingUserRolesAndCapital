import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3005/"
axios.defaults.headers.common['X-CUSTOM_HEADER'] = 'USER Management';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export const _call = (config) => {
    axios.defaults.headers.common.URL = window.location.hash;
    axios.defaults.timeout = 120000;
    axios.defaults.headers.common.Authorization = `${'Bearer '}${localStorage.getItem("token")}`;
    return axios(config);
};

