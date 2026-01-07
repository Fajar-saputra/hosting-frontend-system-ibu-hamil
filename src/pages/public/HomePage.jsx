import React from "react";
import ButtonDiagnose from "../../components/layout/ButtonDiagnose";
import homeImage from "../../assets/images/home.png";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const ifClick = () => {
        navigate("/artikel");
    };

    return (
        <div className="max-w-5xl mx-auto bg-white pt-24 px-4 sm:px-6 min-h-screen">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* SISI KIRI - TEKS */}
                <div className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#6155F5]">
                        Diagnosa Penyakit <br /> Ibu Hamil
                    </h1>

                    {/* <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 text-justify">
                        Kesehatan Ibu dan buah hati adalah prioritas utama. Bunda Care hadir sebagai asisten digital terpercaya untuk membantu Bunda melakukan deteksi dini terhadap berbagai gejala
                        selama masa kehamilan melalui sistem pakar berbasis medis yang akurat.
                    </p> */}

                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 text-justify">
                        Pada trimester pertama kehamilan, ibu hamil sering mengalami gangguan seperti mual muntah berlebihan (hiperemesis gravidarum), anemia, serta infeksi ringan akibat perubahan
                        hormon. Pada trimester kedua, risiko anemia, infeksi saluran kemih, dan gangguan tekanan darah mulai meningkat. Sedangkan pada trimester ketiga, ibu hamil lebih rentan
                        mengalami hipertensi dalam kehamilan, diabetes gestasional, serta komplikasi lain yang dapat berdampak pada kesehatan ibu dan janin.
                        <p
                            onClick={ifClick}
                            className="mt-4 inline-block cursor-pointer text-blue-600 font-semibold 
               hover:text-blue-800 hover:underline transition duration-200"
                        >
                            Baca selengkapnya →
                        </p>
                    </p>

                    <div className="flex justify-center lg:justify-start">
                        <ButtonDiagnose />
                    </div>
                </div>

                {/* SISI KANAN - GAMBAR */}
                <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
                    <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-8 border-white shadow-2xl">
                        <img src={homeImage} alt="Konsultasi Ibu Hamil" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}
