import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/penyakit/`;

const getConfig = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
        headers: {
            Authorization: `Bearer ${user?.token}`,
        },
    };
};

// GET ALL
const getPenyakits = async () => {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
};

// CREATE
const createPenyakit = async (data) => {
    const response = await axios.post(API_URL, data, getConfig());
    return response.data;
};

// UPDATE
const updatePenyakit = async (data) => {
    const response = await axios.put(`${API_URL}${data.id}`, data, getConfig());
    return response.data;
};

// DELETE
const deletePenyakit = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`, getConfig());
    return response.data;
};

export default {
    getPenyakits,
    createPenyakit,
    updatePenyakit,
    deletePenyakit,
};
