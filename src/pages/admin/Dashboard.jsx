import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaDisease, FaVials, FaWrench, FaNewspaper } from "react-icons/fa"; // Tambah FaNewspaper

function Dashboard() {
    // Ambil data user yang sedang login dari Redux
    const { user } = useSelector((state) => state.auth);

    // Pastikan user ada dan memiliki nama untuk ditampilkan
    const userName = user ? user.nama : "Admin";
    const userRole = user ? user.role : "admin";

    return (
        <div className="p-6 bg-white shadow-xl rounded-lg max-w-5xl mx-auto mt-4">
            <h1 className="text-4xl font-bold text-blue-700 mb-2">Selamat Datang, {userName}!</h1>
            <p className="text-xl text-gray-600 mb-6">Ini adalah Panel Administrasi ({userRole.toUpperCase()}).</p>

            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Menu Manajemen Data</h2>

            {/* Grid disesuaikan menjadi 2 kolom di mobile dan 4 kolom di layar besar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 1. Manajemen Gejala */}
                <Link to="/admin/gejala" className="flex flex-col items-center p-6 bg-green-100 rounded-lg hover:bg-green-200 transition duration-200 shadow-md">
                    <FaVials className="text-5xl text-green-600 mb-3" />
                    <h3 className="text-xl font-bold">Gejala</h3>
                    <p className="text-sm text-center text-gray-600">CRUD data Gejala</p>
                </Link>

                {/* 2. Manajemen Penyakit */}
                <Link to="/admin/penyakit" className="flex flex-col items-center p-6 bg-red-100 rounded-lg hover:bg-red-200 transition duration-200 shadow-md">
                    <FaDisease className="text-5xl text-red-600 mb-3" />
                    <h3 className="text-xl font-bold">Penyakit</h3>
                    <p className="text-sm text-center text-gray-600">CRUD data Penyakit</p>
                </Link>

                {/* 3. Manajemen Aturan (Rules) */}
                <Link to="/admin/rule" className="flex flex-col items-center p-6 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition duration-200 shadow-md">
                    <FaWrench className="text-5xl text-yellow-600 mb-3" />
                    <h3 className="text-xl font-bold">Aturan (Rules)</h3>
                    <p className="text-sm text-center text-gray-600">Konfigurasi Sistem Pakar</p>
                </Link>

                {/* 4. Manajemen Artikel (Baru) */}
                <Link to="/admin/artikel" className="flex flex-col items-center p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition duration-200 shadow-md border border-blue-200">
                    <FaNewspaper className="text-5xl text-blue-600 mb-3" />
                    <h3 className="text-xl font-bold text-blue-800">Artikel</h3>
                    <p className="text-sm text-center text-gray-600">Manajemen Konten Edukasi</p>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;