import { FaSignInAlt, FaSignOutAlt, FaUser, FaThLarge } from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/login");
    };

    const navClass = ({ isActive }) =>
        `py-1 border-b-2 transition-colors duration-200
    ${isActive ? "text-yellow-300 border-yellow-300" : "text-white/90 border-transparent hover:text-white hover:border-white"}`;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#6155F5] shadow-lg transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                {/* 1. KIRI: Nama User / Logo */}
                <div className="flex-1 text-white font-bold text-xl tracking-tight">
                    {user ? (
                        <Link to={user.role === "admin" ? "/admin" : "/profile"} className="hover:opacity-80 transition flex items-center">
                            {user.role === "admin" && <FaThLarge className="mr-2" />} Hallo, {user.name || user.nama}
                        </Link>
                    ) : (
                        <Link to="/" className="hover:opacity-80 transition">
                            Bunda Care
                        </Link>
                    )}
                </div>

                {/* 2. TENGAH: Navbar Dinamis */}
                <nav className="flex-[2] flex justify-center">
                    <ul className="flex space-x-6 font-semibold text-white/90">
                        {user && user.role === "admin" ? (
                            <>
                                <li>
                                    <NavLink to="/admin" end className={navClass}>
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/gejala" className={navClass}>
                                        Gejala
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/penyakit" className={navClass}>
                                        Penyakit
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/rule" className={navClass}>
                                        Rule
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/artikel" className={navClass}>
                                        Article
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/" className={navClass}>
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about" className={navClass}>
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/artikel" className={navClass}>
                                        Article
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/diagnose" className={navClass}>
                                        Diagnosa
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                {/* 3. KANAN: Tombol Login / Logout */}
                <div className="flex-1 flex justify-end">
                    <ul className="flex items-center space-x-4">
                        {user ? (
                            <li>
                                <button
                                    onClick={onLogout}
                                    className="flex items-center bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-all shadow-md active:scale-95 text-sm font-bold"
                                >
                                    <FaSignOutAlt className="mr-1" /> Keluar
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="flex items-center text-white hover:text-gray-200 transition font-medium text-sm">
                                        <FaSignInAlt className="mr-1" /> Masuk
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="flex items-center bg-white text-[#6155F5] px-3 py-1.5 rounded-lg font-bold hover:bg-gray-100 transition shadow-md active:scale-95 text-sm"
                                    >
                                        <FaUser className="mr-1" /> Daftar
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
