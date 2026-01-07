import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

// 1. Register User
const register = async (userData) => {
    // Memanggil POST /api/users/
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        // Simpan data user ke Local Storage setelah register sukses
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

// 2. Login User
const login = async (userData) => {
    // Memanggil POST /api/users/login
    const response = await axios.post(API_URL + "login", userData);

    if (response.data) {
        // Simpan data user ke Local Storage setelah login sukses
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

// 3. Logout User
const logout = () => {
    // Hapus data user dari Local Storage
    localStorage.removeItem("user");
};

const authService = {
    register,
    logout,
    login,
};

export default authService;
