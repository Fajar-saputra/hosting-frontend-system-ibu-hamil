import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";

import { login, reset } from "../../features/auth/authSlice";
import bgImage from "../../assets/images/bg.png";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Mengambil state dari Redux Store (Thunk Style)
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        // Jika login berhasil, redirect
        if (isSuccess && user) {
            // Cek role untuk Redirection
            if (user.role === "admin") {
                navigate("/admin"); // Redirect ke Dashboard Admin
            } else {
                navigate("/"); // Redirect ke Home Page User
            }
        }

        if (user && !isSuccess) {
            if (user.role === "admin") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        }

        // Cleanup function untuk mereset status Redux setelah selesai
        return () => {
            dispatch(reset());
        };
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        // Panggil Thunk Login
        dispatch(login(userData));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-2">
                        <FaSignInAlt className="inline-block mr-2 text-blue-500" /> Masuk
                    </h1>
                    <p className="text-gray-600">Silakan masuk ke akun Anda</p>
                </header>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Kata Sandi"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 text-white font-semibold rounded-lg transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-700">
                        Masuk
                    </button>
                </form>

                <footer className="mt-4 text-center text-sm text-gray-600">
                    Belum punya akun?
                    <Link to="/register" className="text-blue-500 hover:text-blue-700 font-medium ml-1">
                        Daftar
                    </Link>
                </footer>
            </div>
            <ToastContainer position="top-center" />
        </div>
    );
}

export default LoginPage;
