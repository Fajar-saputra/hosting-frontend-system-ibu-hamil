import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createPenyakit, updatePenyakit, getPenyakits } from "../../../features/penyakit/penyakitSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function PenyakitForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        kode: "",
        nama: "",
        deskripsi: "",
        solusi: "",
        pencegahan: "",
    });

    useEffect(() => {
        if (isEdit) {
            dispatch(getPenyakits())
                .unwrap()
                .then((data) => {
                    const penyakit = data.find((p) => p._id === id);
                    if (!penyakit) return navigate("/admin/penyakit");

                    setFormData({
                        kode: penyakit.kode,
                        nama: penyakit.nama,
                        deskripsi: penyakit.deskripsi,
                        solusi: penyakit.solusi,
                        pencegahan: penyakit.pencegahan || "",
                    });
                });
        }
    }, [id, isEdit, dispatch, navigate]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const action = isEdit ? updatePenyakit({ id, ...formData }) : createPenyakit(formData);

        dispatch(action)
            .unwrap()
            .then(() => {
                toast.success(isEdit ? "Penyakit diperbarui" : "Penyakit ditambahkan");
                navigate("/admin/penyakit");
            })
            .catch((err) => toast.error(err));
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit Penyakit" : "Tambah Penyakit"}</h1>

            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="kode" value={formData.kode} onChange={onChange} placeholder="Kode (P01)" className="p-2 border rounded" required />
                <input name="nama" value={formData.nama} onChange={onChange} placeholder="Nama Penyakit" className="p-2 border rounded" required />

                <textarea name="deskripsi" value={formData.deskripsi} onChange={onChange} placeholder="Deskripsi Penyakit" className="p-2 border rounded md:col-span-2 h-24" required />
                <textarea name="solusi" value={formData.solusi} onChange={onChange} placeholder="Solusi / Penanganan" className="p-2 border rounded md:col-span-2 h-24" required />
                <textarea name="pencegahan" value={formData.pencegahan} onChange={onChange} placeholder="Pencegahan (Opsional)" className="p-2 border rounded md:col-span-2 h-24" />

                <div className="md:col-span-2 flex gap-3">
                    <button className="bg-green-600 text-white px-6 py-2 rounded">Simpan</button>
                    <button type="button" onClick={() => navigate("/admin/penyakit")} className="bg-gray-400 text-white px-6 py-2 rounded">
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PenyakitForm;
