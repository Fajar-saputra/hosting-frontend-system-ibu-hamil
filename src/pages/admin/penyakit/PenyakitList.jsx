import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPenyakits, deletePenyakit } from "../../../features/penyakit/penyakitSlice";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PenyakitList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Penyakit, isLoading } = useSelector((state) => state.penyakit);

    useEffect(() => {
        dispatch(getPenyakits());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Hapus data penyakit ini?")) {
            dispatch(deletePenyakit(id))
                .unwrap()
                .then(() => toast.success("Penyakit dihapus"))
                .catch((err) => toast.error(err));
        }
    };

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-700">
                    Data Penyakit ({Penyakit?.length || 0})
                </h1>

                <button
                    onClick={() => navigate("/admin/penyakit/create")}
                    className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center"
                >
                    <FaPlus className="mr-2" />
                    Tambah Penyakit
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
                    {Penyakit?.map((p) => (
                        <tr key={p._id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-mono font-bold text-indigo-600">
                                {p.kode}
                            </td>
                            <td className="p-3">{p.nama}</td>
                            <td className="p-3 text-center flex justify-center gap-3">
                                <button
                                    onClick={() => navigate(`/admin/penyakit/edit/${p._id}`)}
                                    className="text-yellow-600"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(p._id)}
                                    className="text-red-600"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {Penyakit?.length === 0 && (
                <p className="text-center mt-6 text-gray-500">
                    Belum ada data penyakit
                </p>
            )}
        </div>
    );
}

export default PenyakitList;
