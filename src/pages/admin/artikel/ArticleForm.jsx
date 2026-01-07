import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";

const ArticleForm = () => {
    const { id } = useParams(); // Ambil ID dari URL jika sedang mode edit
    const navigate = useNavigate(); // Untuk redirect
    const isEditMode = Boolean(id);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [diseaseId, setDiseaseId] = useState("");
    const [diseases, setDiseases] = useState([]);

    const fileRef = useRef(null);

    // 1. Ambil daftar penyakit & data artikel jika mode edit
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch daftar penyakit
                const resDiseases = await axios.get("http://localhost:5000/api/penyakit");
                setDiseases(resDiseases.data);

                // Jika mode edit, fetch data artikel berdasarkan ID
                if (isEditMode) {
                    const { data } = await axios.get(`http://localhost:5000/api/articles/edit/${id}`);
                    setTitle(data.title);
                    setSlug(data.slug);
                    setContent(data.content);
                    setDiseaseId(data.diseaseId);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id, isEditMode]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setSlug(
            e.target.value
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("content", content);
        if (image) formData.append("image", image);
        formData.append("diseaseId", diseaseId);

        try {
            const config = { headers: { "Content-Type": "multipart/form-data" } };

            if (isEditMode) {
                // Update pakai PUT
                await axios.put(`http://localhost:5000/api/articles/${id}`, formData, config);
                alert("Artikel berhasil diperbarui!");
            } else {
                // Create pakai POST
                await axios.post("http://localhost:5000/api/articles", formData, config);
                alert("Artikel berhasil diterbitkan!");
            }

            // ✅ REDIRECT KEMBALI KE LIST
            navigate("/admin/artikel");
        } catch (error) {
            console.error(error);
            alert(isEditMode ? "Gagal memperbarui artikel" : "Gagal menambah artikel");
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">{isEditMode ? "Edit Artikel" : "Tambah Artikel Edukasi"}</h2>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Judul Artikel</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">URL Slug (Otomatis)</label>
                    <input type="text" className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-500 cursor-not-allowed" value={slug} readOnly />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Hubungkan ke Jenis Penyakit</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" value={diseaseId} onChange={(e) => setDiseaseId(e.target.value)} required>
                        <option value="">-- Pilih Penyakit --</option>
                        {diseases.map((d) => (
                            <option key={d._id} value={d._id}>
                                {d.nama}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Gambar Utama {isEditMode && <span className="text-xs text-blue-500">(Kosongkan jika tidak ingin ganti)</span>}</label>
                    <input
                        ref={fileRef}
                        type="file"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                    />
                </div>

                <div className="h-80 mb-12">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Isi Konten Artikel</label>
                    <ReactQuill theme="snow" value={content} onChange={setContent} className="h-64" />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition duration-300 mt-10">
                    {isEditMode ? "Simpan Perubahan" : "Terbitkan Artikel"}
                </button>
            </form>
        </div>
    );
};

export default ArticleForm;
