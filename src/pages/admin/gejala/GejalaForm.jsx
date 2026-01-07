import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createGejala, updateGejala, getGejalas } from "../../../features/gejala/gejalaSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function GejalaForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        kode: "",
        nama: "",
        pertanyaan_diagnosa: "",
    });

    useEffect(() => {
        if (isEdit) {
            dispatch(getGejalas())
                .unwrap()
                .then((data) => {
                    const gejala = data.find((g) => g._id === id);
                    if (!gejala) return navigate("/admin/gejala");

                    setFormData({
                        kode: gejala.kode,
                        nama: gejala.nama,
                        pertanyaan_diagnosa: gejala.pertanyaan_diagnosa,
                    });
                });
        }
    }, [id, isEdit, dispatch, navigate]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const action = isEdit
            ? updateGejala({ id, ...formData })
            : createGejala(formData);

        dispatch(action)
            .unwrap()
            .then(() => {
                toast.success(isEdit ? "Gejala diperbarui" : "Gejala ditambahkan");
                navigate("/admin/gejala");
            })
            .catch((err) => toast.error(err));
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                {isEdit ? "Edit Gejala" : "Tambah Gejala"}
            </h1>

            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    name="kode"
                    value={formData.kode}
                    onChange={onChange}
                    placeholder="Kode Gejala"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="nama"
                    value={formData.nama}
                    onChange={onChange}
                    placeholder="Nama Gejala"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="pertanyaan_diagnosa"
                    value={formData.pertanyaan_diagnosa}
                    onChange={onChange}
                    placeholder="Pertanyaan Diagnosa"
                    className="w-full p-2 border rounded"
                    required
                />

                <div className="flex gap-2">
                    <button className="bg-green-600 text-white px-4 py-2 rounded">
                        Simpan
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/admin/gejala")}
                        className="bg-gray-400 px-4 py-2 rounded"
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
}

export default GejalaForm;
