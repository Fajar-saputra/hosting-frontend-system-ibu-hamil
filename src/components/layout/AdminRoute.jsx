import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminRoute = () => {
    const { user, isLoading } = useSelector((state) => state.auth); 
    
    // 1. Jika masih loading, tampilkan loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">Memuat data otentikasi...</p>
            </div>
        );
    }

    // 2. Cek apakah user adalah Admin
    if (user && user.role === 'admin') {
        return <Outlet />; // Boleh masuk
    } 
    
    // 3. Jika bukan admin ATAU tidak ada user (sudah stop loading)
    if (!user || user.role !== 'admin') {
        if (!user) {
            toast.error("Anda harus login untuk mengakses halaman ini.");
        } else {
            toast.error("Akses ditolak. Anda bukan Administrator.");
        }
        return <Navigate to="/login" replace />;
    }

    // Default fallback (seharusnya tidak tercapai)
    return <Navigate to="/login" />;
};

export default AdminRoute;