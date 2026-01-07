import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL;

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // =========================
    // FETCH ALL ARTICLES
    // =========================
    const fetchArticles = async () => {
        try {
            const { data } = await axios.get(`${API_BASE}/api/articles`);
            setArticles(data);
        } catch (error) {
            console.error(error);
            alert("Gagal mengambil data artikel");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    // =========================
    // DELETE ARTICLE
    // =========================
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Yakin ingin menghapus artikel ini?");

        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/articles/${id}`);
            setArticles((prev) => prev.filter((item) => item._id !== id));
            alert("Artikel berhasil dihapus");
        } catch (error) {
            console.error(error);
            alert("Gagal menghapus artikel");
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    // =========================
    // RENDER
    // =========================
    return (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Manajemen Artikel</h2>

                <Link to="/admin/artikel/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Tambah Artikel
                </Link>
            </div>

            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-3 py-2 text-left">Judul</th>
                        <th className="border px-3 py-2 text-center w-48">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {articles.length === 0 ? (
                        <tr>
                            <td colSpan="2" className="text-center py-6 text-gray-500">
                                Belum ada artikel
                            </td>
                        </tr>
                    ) : (
                        articles.map((article) => (
                            <tr key={article._id}>
                                <td className="border px-3 py-2">{article.title}</td>

                                <td className="border px-3 py-2 text-center space-x-2">
                                    <Link to={`/admin/artikel/edit/${article._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                                        Edit
                                    </Link>

                                    <button onClick={() => handleDelete(article._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ArticleList;
