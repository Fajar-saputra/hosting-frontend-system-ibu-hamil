import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGejalas } from "../../features/gejala/gejalaSlice";
import axios from "axios";
import { FaRedo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DiagnosePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { gejalas, isLoading } = useSelector((state) => state.gejala);

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        dispatch(getGejalas());
    }, [dispatch]);

    const handleAnswer = (value) => {
        setAnswers((prev) => [...prev, { gejalaId: gejalas[step]._id, value }]);
        setStep(step + 1);
    };

    // Fungsi submit yang sudah diperbaiki bungkusnya
    const submitDiagnose = async () => {
        setErrorMsg(""); // Reset error setiap kali klik
        setIsSubmitting(true);

        try {
            const res = await axios.post(`${API_BASE}/api/diagnose`, {
                answers: answers,
            });

            if (res.data.topResult) {
                // Mengirim hasil ke halaman result
                navigate("/result", { state: { result: res.data.topResult } });
            } else {
                // Jika diagnosa berhasil tapi tidak ada penyakit yang cocok
                setErrorMsg("Maaf Bunda, gejala yang dimasukkan tidak cocok dengan diagnosa kami. Mohon periksa kembali.");
            }
        } catch (error) {
            console.error("Diagnosis Error:", error.response?.data || error.message);
            setErrorMsg(error.response?.data?.message || "Terjadi kesalahan koneksi ke server.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading)
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C74EE]"></div>
            </div>
        );

    // reset
    const resetDiagnose = () => {
        setStep(0);
        setAnswers([]);
        setErrorMsg("");
    };

    // Layar Selesai (Menunggu Submit)
    if (gejalas.length > 0 && step >= gejalas.length) {
        return (
            <div className="max-w-2xl mx-auto p-12 bg-white shadow-2xl rounded-3xl text-center border border-gray-100 animate-fade-in">
                <div className="mb-6 text-6xl">✨</div>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Diagnosa Selesai!</h2>
                <p className="text-gray-600 mb-8 text-lg">Sistem telah merangkum semua jawaban Bunda. Klik tombol di bawah untuk melihat hasil analisis.</p>

                {/* Menampilkan pesan error jika ada */}
                {errorMsg && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-6 font-medium">⚠️ {errorMsg}</div>}

                <div className="flex w-full justify-center gap-6">
                    <button
                        onClick={submitDiagnose}
                        disabled={isSubmitting}
                        className={`w-full md:w-auto bg-[#7C74EE] text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#6860d1] transition-all transform hover:scale-105 ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting ? "Memproses..." : "Lihat Hasil Diagnosa"}
                    </button>
                    <button
                        onClick={resetDiagnose}
                        className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-4 px-11 rounded-full font-bold hover:bg-[#7C74EE] hover:text-white transition-all"
                    >
                        <FaRedo size={16} /> Diagnosa Ulang
                    </button>
                </div>
            </div>
        );
    }

    const progress = gejalas.length > 0 ? (step / gejalas.length) * 100 : 0;

    return (
        <div className="max-w-3xl mx-auto pt-17">
            <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-[#7C74EE] font-bold">Progres Diagnosa</span>
                    <span className="text-gray-400 text-sm">
                        {step} dari {gejalas.length}
                    </span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-[#7C74EE] h-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {gejalas.length > 0 && (
                <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-gray-50 animate-fade-in">
                    <span className="text-indigo-400 font-medium tracking-widest uppercase text-xs">Pertanyaan Ke-{step + 1}</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-10 leading-snug">
                        Apakah Bunda mengalami <span className="text-[#7C74EE] italic">"{gejalas[step].nama}"</span>?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            onClick={() => handleAnswer(1)}
                            className="group flex items-center justify-center p-6 bg-green-50 text-green-700 border-2 border-green-100 rounded-2xl font-bold text-xl hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-200"
                        >
                            Ya, Saya Merasakannya
                        </button>
                        <button
                            onClick={() => handleAnswer(0)}
                            className="group flex items-center justify-center p-6 bg-red-50 text-red-700 border-2 border-red-100 rounded-2xl font-bold text-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
                        >
                            Tidak Ada
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DiagnosePage;
