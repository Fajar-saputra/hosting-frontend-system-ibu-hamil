import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createRule,
    updateRule,
    getRuleById,
    reset,
} from "../../../features/rules/ruleSlice";
import { getPenyakits } from "../../../features/penyakit/penyakitSlice";
import { getGejalas } from "../../../features/gejala/gejalaSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const RuleForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const { rule, isLoading, isError, message } = useSelector(
        (state) => state.rule
    );
    const { Penyakit } = useSelector((state) => state.penyakit);
    const { gejalas } = useSelector((state) => state.gejala);

    const [formData, setFormData] = useState({
        penyakit: "",
        gejala: [],
        bobot: 0,
    });

    useEffect(() => {
        dispatch(getPenyakits());
        dispatch(getGejalas());

        if (isEdit) {
            dispatch(getRuleById(id));
        }

        return () => {
            dispatch(reset());
        };
    }, [dispatch, id, isEdit]);

    useEffect(() => {
        if (isEdit && rule) {
            setFormData({
                penyakit: rule.penyakit?._id,
                gejala: rule.gejala.map((g) => g._id),
                bobot: rule.bobot,
            });
        }
    }, [rule, isEdit]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            dispatch(updateRule({ id, ...formData }))
                .unwrap()
                .then(() => {
                    toast.success("Aturan berhasil diperbarui");
                    navigate("/admin/rule");
                })
                .catch((err) => toast.error(err));
        } else {
            dispatch(createRule(formData))
                .unwrap()
                .then(() => {
                    toast.success("Aturan berhasil ditambahkan");
                    navigate("/admin/rule");
                })
                .catch((err) => toast.error(err));
        }
    };

    if (isLoading) {
        return <div className="p-6 text-center">Memuat Form...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-indigo-700">
                {isEdit ? "Edit Aturan" : "Tambah Aturan"}
            </h1>

            <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-1">
                        Pilih Penyakit
                    </label>
                    <select
                        name="penyakit"
                        value={formData.penyakit}
                        onChange={onChange}
                        className="p-2 border rounded"
                        required
                    >
                        <option value="">-- Pilih Penyakit --</option>
                        {Penyakit?.map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.kode} - {p.nama}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-1">
                        Pilih Gejala
                    </label>
                    <select
                        multiple
                        value={formData.gejala}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                gejala: Array.from(
                                    e.target.selectedOptions,
                                    (o) => o.value
                                ),
                            })
                        }
                        className="p-2 border rounded h-40"
                        required
                    >
                        {gejalas.map((g) => (
                            <option key={g._id} value={g._id}>
                                {g.kode} - {g.nama}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-1">
                        Bobot (0 - 1)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        name="bobot"
                        value={formData.bobot}
                        onChange={onChange}
                        className="p-2 border rounded"
                        required
                    />
                </div>

                <div className="md:col-span-3 flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={() => navigate("/admin/rule")}
                        className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Batal
                    </button>

                    <button
                        type="submit"
                        className="px-8 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        {isEdit ? "Perbarui" : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RuleForm;
