import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { FaStethoscope, FaLightbulb, FaRedo } from "react-icons/fa";

export default function ResultPage() {
    const { state } = useLocation();
    const result = state?.result;

    // Proteksi jika akses langsung ke halaman result tanpa diagnosa
    if (!result) {
        return <Navigate to="/diagnose" replace />;
    }

    return (
        <div className="min-h-screen pt-24 flex items-center justify-center px-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-50">
                {/* Header */}
                <div className="bg-[#7C74EE] p-10 text-center text-white relative">
                    <div className="relative z-10">
                        <p className="text-indigo-100 font-medium tracking-widest uppercase text-sm mb-2">Tingkat Kecocokan Gejala</p>
                        <div className="text-7xl font-black mb-2">{result.persentase}%</div>
                        <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
                    </div>

                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                </div>

                <div className="p-10 md:p-12">
                    {/* Nama Penyakit */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-indigo-100 rounded-xl text-[#7C74EE]">
                            <FaStethoscope size={24} />
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-400 font-bold uppercase tracking-wider">Hasil Analisis:</h3>
                            <p className="text-2xl font-extrabold text-gray-800">{result.penyakit.nama}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl border-l-4 border-indigo-200 text-justify">{result.penyakit.deskripsi}</div>

                        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                            <FaLightbulb className="text-amber-500 shrink-0 mt-1" size={20} />
                            <div>
                                <strong className="text-amber-900 block mb-1 font-bold">Saran & Solusi Medis:</strong>
                                <p className="text-amber-800 text-justify">{result.penyakit.solusi}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/diagnose"
                            className="flex-1 flex items-center justify-center gap-2 bg-[#7C74EE] text-white py-4 rounded-full font-bold shadow-lg hover:shadow-indigo-200 transition-all active:scale-95"
                        >
                            <FaRedo size={16} /> Diagnosa Ulang
                        </Link>
                        <Link to="/" className="flex-1 flex items-center justify-center text-gray-500 font-bold hover:text-[#7C74EE] transition-colors">
                            Kembali ke Home
                        </Link>
                    </div>

                    <p className="text-center text-[10px] text-gray-400 mt-8 uppercase tracking-widest">*Hasil ini hanyalah skrining awal, silakan hubungi dokter untuk diagnosis medis resmi.</p>
                </div>
            </div>
        </div>
    );
}
