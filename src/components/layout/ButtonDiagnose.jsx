import { Link } from "react-router-dom";

export default function ButtonDiagnose() {
    return (
        <div className="pt-4">
            <Link
                to="/diagnose"
                className="inline-block bg-[#7C74EE] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[#6860d1] transition-all transform hover:scale-105 active:scale-95"
            >
                Diagnosa Sekarang
            </Link>
        </div>
    );
}
