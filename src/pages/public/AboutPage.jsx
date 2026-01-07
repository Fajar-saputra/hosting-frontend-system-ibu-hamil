import React from "react";
import BgImage from "../../assets/images/about.png";
import ButtonDiagnose from "../../components/layout/ButtonDiagnose";

function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto bg-white min-h-screen pt-24 px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* SISI KIRI - TEKS */}
                <div className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#6155F5]">About Us</h1>

                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 text-justify">
                        Bunda Care adalah platform digital yang membantu ibu hamil mengenali gejala umum dan mendapatkan skrining awal secara cepat. Kami menyediakan informasi kesehatan yang akurat
                        agar ibu lebih siap sebelum konsultasi medis.
                    </p>

                    <div className="flex justify-center lg:justify-start">
                        <ButtonDiagnose />
                    </div>
                </div>

                {/* SISI KANAN - GAMBAR */}
                <div className="w-full lg:w-2/5 relative flex justify-center">
                    {/* Background Circle */}
                    <div className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[#7C74EE] rounded-full opacity-90 -z-10"></div>

                    <img src={BgImage} alt="Ibu Hamil Bunda Care" className="w-64 sm:w-72 md:w-80 object-contain" />
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
