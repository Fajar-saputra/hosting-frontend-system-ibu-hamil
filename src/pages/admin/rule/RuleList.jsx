import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRules, deleteRule, deleteAllRules } from "../../../features/rules/ruleSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const RuleList = () => {
    const dispatch = useDispatch();
    const { rules, isLoading, isError, message } = useSelector((state) => state.rule);

    useEffect(() => {
        dispatch(getRules());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    const handleDelete = (id) => {
        if (!window.confirm("Yakin ingin menghapus aturan ini?")) return;

        dispatch(deleteRule(id))
            .unwrap()
            .then(() => toast.success("Aturan berhasil dihapus"))
            .catch((err) => toast.error(err));
    };

    const handleDeleteAll = () => {
        if (!window.confirm("Yakin ingin menghapus SEMUA aturan?\nTindakan ini tidak bisa dibatalkan.")) return;

        dispatch(deleteAllRules())
            .unwrap()
            .then(() => toast.success("Semua aturan berhasil dihapus"))
            .catch((err) => toast.error(err));
    };

    if (isLoading) {
        return <div className="p-6 text-center">Memuat Basis Aturan...</div>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-700">Basis Aturan (Rules)</h1>

                <div className="flex gap-3">
                    <Link to="/admin/rule/create" className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700">
                        <FaPlus /> Tambah Aturan
                    </Link>

                    {rules?.length > 0 && (
                        <button onClick={handleDeleteAll} className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700">
                            <FaTrash /> Hapus Semua
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="py-3 px-6 text-left">Penyakit</th>
                            <th className="py-3 px-6 text-left">Gejala</th>
                            <th className="py-3 px-6 text-center">Bobot</th>
                            <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {rules?.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-gray-500">
                                    Belum ada aturan
                                </td>
                            </tr>
                        ) : (
                            rules.map((r) => (
                                <tr key={r._id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6">
                                        <span className="font-bold text-indigo-600">{r.penyakit?.kode}</span> - {r.penyakit?.nama}
                                    </td>

                                    <td className="py-4 px-6">
                                        <div className="flex flex-wrap gap-1">
                                            {r.gejala.map((g) => (
                                                <span key={g._id} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded border">
                                                    {g.kode}
                                                </span>
                                            ))}
                                        </div>
                                    </td>

                                    <td className="py-4 px-6 text-center font-mono">{r.bobot}</td>

                                    <td className="py-4 px-6 text-center flex justify-center gap-3">
                                        <Link to={`/admin/rule/edit/${r._id}`} className="text-yellow-600 hover:text-yellow-800">
                                            <FaEdit />
                                        </Link>

                                        <button onClick={() => handleDelete(r._id)} className="text-red-600 hover:text-red-800">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RuleList;
