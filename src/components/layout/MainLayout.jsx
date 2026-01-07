import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="pt-16 container mx-auto">
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
