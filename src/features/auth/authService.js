import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/users/`;

// REGISTER
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// LOGIN
const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// LOGOUT
const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};
