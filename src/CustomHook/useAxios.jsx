import axios from 'axios';




const axiosIntance = axios.create({
    baseUrl: 'https://localhost:5000',
});

const useAxios = () => {

return axiosIntance;

};

export default useAxios;