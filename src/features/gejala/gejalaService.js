import axios from "axios";

const API_URL = "/api/gejala/";

const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.token : null;
};

// =======================================================
// CREATE Gejala
// =======================================================
const createGejala = async (gejalaData) => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    // POST request ke /api/gejala
    const response = await axios.post(API_URL, gejalaData, config);
    return response.data;
};

// =======================================================
// GET Semua Gejala
// =======================================================
const getGejalas = async () => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    // GET request ke /api/gejala
    const response = await axios.get(API_URL, config);
    return response.data;
};

// =======================================================
// DELETE Gejala
// =======================================================
const deleteGejala = async (gejalaId) => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    // DELETE request ke /api/gejala/:id
    const response = await axios.delete(API_URL + gejalaId, config);
    return response.data;
};

// =======================================================
// UPDATE Gejala
// =======================================================
const updateGejala = async (gejalaData) => {
    const { id, kode, nama } = gejalaData;
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    // PUT request ke /api/gejala/:id
    const response = await axios.put(API_URL + id, { kode, nama }, config);
    return response.data;
};

const gejalaService = {
    createGejala,
    getGejalas,
    deleteGejala,
    updateGejala,
};

export default gejalaService;
