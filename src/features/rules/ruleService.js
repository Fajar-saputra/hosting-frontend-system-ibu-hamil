import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/rule/`;

// ==========================
// Helper Auth Config
// ==========================
const getConfig = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// ==========================
// CREATE Rule
// ==========================
const createRule = async (ruleData) => {
    const response = await axios.post(API_URL, ruleData, getConfig());
    return response.data;
};

// ==========================
// GET All Rules
// ==========================
const getRules = async () => {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
};

// ==========================
// GET Rule by ID
// ==========================
const getRuleById = async (id) => {
    const response = await axios.get(`${API_URL}${id}`, getConfig());
    return response.data;
};

// ==========================
// UPDATE Rule
// ==========================
const updateRule = async (ruleData) => {
    const { id, penyakit, gejala, bobot } = ruleData;

    const response = await axios.put(
        `${API_URL}${id}`,
        { penyakit, gejala, bobot },
        getConfig()
    );

    return response.data;
};

// ==========================
// DELETE Rule by ID
// ==========================
const deleteRule = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`, getConfig());
    return response.data;
};

// ==========================
// DELETE ALL Rules
// ==========================
const deleteAllRules = async () => {
    const response = await axios.delete(API_URL, getConfig());
    return response.data;
};

const ruleService = {
    createRule,
    getRules,
    getRuleById,
    updateRule,
    deleteRule,
    deleteAllRules,
};

export default ruleService;
