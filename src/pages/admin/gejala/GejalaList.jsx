import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGejalas, deleteGejala } from "../../../features/gejala/gejalaSlice";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function GejalaList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { gejalas, isLoading } = useSelector((state) => state.gejala);

    useEffect(() => {
        dispatch(getGejalas());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Hapus gejala ini?")) {
            dispatch(deleteGejala(id))
                .unwrap()
                .then(() => toast.success("Gejala dihapus"))
                .catch((err) => toast.error(err));
        }
    };

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700">
                    Data Gejala ({gejalas.length})
                </h1>

                <button
                    onClick={() => navigate("/admin/gejala/create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
                >
                    <FaPlus className="mr-2" />
                    Tambah Gejala
                </button>
            </div>

            <table className="min-w-full bg-white rounded shadow">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">Kode</th>
                        <th className="p-3 text-left">Nama</th>
                        <th className="p-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {gejalas.map((g) => (
                        <tr key={g._id} className="border-b">
                            <td className="p-3 font-mono">{g.kode}</td>
                            <td className="p-3">{g.nama}</td>
                            <td className="p-3 text-center flex justify-center gap-3">
                                <button
                                    onClick={() => navigate(`/admin/gejala/edit/${g._id}`)}
                                    className="text-yellow-600"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(g._id)}
                                    className="text-red-600"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GejalaList;
