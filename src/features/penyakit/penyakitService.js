import axios from "axios";

const API_URL = "/api/penyakit/";

const getConfig = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return { headers: { Authorization: `Bearer ${user.token}` } };
};

const getPenyakits = async () => {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
};

const createPenyakit = async (data) => {
    const response = await axios.post(API_URL, data, getConfig());
    return response.data;
};

const updatePenyakit = async (data) => {
    const response = await axios.put(API_URL + data.id, data, getConfig());
    return response.data;
};

const deletePenyakit = async (id) => {
    const response = await axios.delete(API_URL + id, getConfig());
    return response.data;
};

const penyakitService = { getPenyakits, createPenyakit, updatePenyakit, deletePenyakit };
export default penyakitService;
