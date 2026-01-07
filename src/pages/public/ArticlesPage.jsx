import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL;

const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    // 1. Fetch daftar judul untuk Sidebar Kiri
    useEffect(() => {
        const fetchArticles = async () => {
            const { data } = await axios.get(`${API_BASE}/api/articles`);
            setArticles(data);

            if (!slug && data.length > 0) {
                const firstSlug = data[0].slug;
                navigate(`/artikel/${firstSlug}`, { replace: true });
            }
        };

        fetchArticles();
    }, []);

    // 2. Fetch isi artikel detail saat slug berubah
    useEffect(() => {
        if (slug) {
            const fetchDetail = async () => {
                const { data } = await axios.get(`${API_BASE}/api/articles/${slug}`);
                setCurrentArticle(data);
            };
            fetchDetail();
        }
    }, [slug]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-12 gap-8">
                {/* --- SIDEBAR KIRI (Daftar Penyakit) --- */}
                <aside className="col-span-12 md:col-span-3 border-r border-gray-200 pr-4">
                    <h2 className="text-xl font-bold mb-4 border-b-2 border-blue-600 pb-2">Daftar Penyakit</h2>
                    <ul className="space-y-2">
                        {articles.map((art) => (
                            <li key={art._id}>
                                <Link
                                    to={`/artikel/${art.slug}`}
                                    className={`block p-2 text-sm hover:bg-blue-50 hover:text-blue-700 transition rounded ${
                                        slug === art.slug ? "bg-blue-100 font-semibold text-blue-800" : "text-gray-600"
                                    }`}
                                >
                                    {art.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* --- MAIN CONTENT (Artikel Utama) --- */}
                <main className="col-span-12 md:col-span-6 min-h-screen">
                    {currentArticle ? (
                        <article>
                            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">{currentArticle.title}</h1>
                            <hr className="mb-6 border-gray-300" />

                            {/* Gambar Utama */}
                            {currentArticle.image && (
                                <figure className="mb-8">
                                    <img src={`http://localhost:5000${currentArticle.image}`} alt={currentArticle.title} className="w-full h-auto border p-1 bg-white shadow-sm" />
                                    <figcaption className="text-sm text-gray-500 mt-2 italic text-center">Gambar: Visualisasi {currentArticle.title}</figcaption>
                                </figure>
                            )}

                            {/* Isi Artikel (Gunakan prose agar otomatis rapi) */}
                            {/* <div className="prose prose-blue max-w-none text-gray-800 leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: currentArticle.content }} /> */}
                            <div
                                className="
                                            prose prose-blue max-w-none
                                            prose-ul:list-disc prose-ol:list-decimal
                                            prose-li:ml-6 prose-li:my-2 prose-li:leading-snug
                                            text-gray-800
                                            text-justify"
                                dangerouslySetInnerHTML={{ __html: currentArticle.content }}
                            />
                        </article>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-gray-400">Pilih artikel di sebelah kiri untuk membaca informasi.</div>
                    )}
                </main>

                {/* --- SIDEBAR KANAN (Info Box / Solusi Cepat) --- */}
                <aside className="col-span-12 md:col-span-3">
                    {currentArticle?.diseaseId && (
                        <div className="border border-gray-300 bg-gray-50 p-4">
                            <div className="bg-blue-800 text-white text-center font-bold py-1 mb-3">Informasi Medis</div>
                            <div className="text-sm space-y-4">
                                <div>
                                    <h4 className="font-bold text-gray-700 border-b">Nama Penyakit:</h4>
                                    <p>{currentArticle.diseaseId.nama}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-700 border-b">Gejala Umum:</h4>
                                    <p className="text-xs italic">{currentArticle.diseaseId.gejala || "Lihat detail di teks."}</p>
                                </div>
                                <div className="bg-yellow-100 p-2 border-l-4 border-yellow-500">
                                    <h4 className="font-bold text-yellow-800">Saran Tindakan:</h4>
                                    <p className="text-xs">{currentArticle.diseaseId.solusi || "Segera hubungi dokter."}</p>
                                </div>
                                <Link to="/diagnosa" className="block text-center bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700 font-bold transition">
                                    Coba Diagnosa Sekarang
                                </Link>
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default ArticlesPage;
