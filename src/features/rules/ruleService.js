import axios from "axios";

const API_URL = "/api/rule/";

// Helper function untuk config (Auth Header)
const getConfig = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// =======================================================
// CREATE Rule
// =======================================================
const createRule = async (ruleData) => {
    const response = await axios.post(API_URL, ruleData, getConfig());
    return response.data;
};

// =======================================================
// GET All Rules
// =======================================================
const getRules = async () => {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
};

// =======================================================
// GET All Rules ID
// =======================================================
const getRuleById = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};

// =======================================================
// UPDATE Rule
// =======================================================
const updateRule = async (ruleData) => {
    const { id, penyakit, gejala, bobot } = ruleData;
    const response = await axios.put(API_URL + id, { penyakit, gejala, bobot }, getConfig());
    return response.data;
};

// =======================================================
// DELETE Rule
// =======================================================
const deleteRule = async (id) => {
    const response = await axios.delete(API_URL + id, getConfig());
    return response.data;
};

const deleteAllRules = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };

    const response = await axios.delete("/api/rule", config);
    return response.data;
};


const ruleService = {
    createRule,
    getRules,
    updateRule,
    deleteRule,
    getRuleById,
    deleteAllRules
};

export default ruleService;
