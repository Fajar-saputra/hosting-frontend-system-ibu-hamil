import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/gejala/`;

const getConfig = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
        headers: {
            Authorization: `Bearer ${user?.token}`,
        },
    };
};

// CREATE
const createGejala = async (data) => {
    const response = await axios.post(API_URL, data, getConfig());
    return response.data;
};

// GET ALL
const getGejalas = async () => {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
};

// UPDATE
const updateGejala = async (data) => {
    const { id, kode, nama } = data;
    const response = await axios.put(
        `${API_URL}${id}`,
        { kode, nama },
        getConfig()
    );
    return response.data;
};

// DELETE
const deleteGejala = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`, getConfig());
    return response.data;
};

export default {
    createGejala,
    getGejalas,
    updateGejala,
    deleteGejala,
};
