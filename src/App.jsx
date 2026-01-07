import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// public page
import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import AboutPage from "./pages/public/AboutPage";

// admin page
import AdminRoute from "./components/layout/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import DiagnosePage from "./pages/public/DiagnosePage";
import ResultPage from "./pages/public/ResultPage";
import AuthLayout from "./components/layout/AuthLayout";
import MainLayout from "./components/layout/MainLayout";
import ArticlesPage from "./pages/public/ArticlesPage";
import ArticleForm from "./pages/admin/artikel/ArticleForm";
import ArticleList from "./pages/admin/artikel/ArticleList";
import RuleList from "./pages/admin/rule/RuleList";
import RuleForm from "./pages/admin/rule/RuleForm";
import GejalaList from "./pages/admin/gejala/GejalaList";
import GejalaForm from "./pages/admin/gejala/GejalaForm";
import PenyakitList from "./pages/admin/penyakit/PenyakitList";
import PenyakitForm from "./pages/admin/penyakit/PenyakitForm";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    {/* ===== AUTH PAGES (NO HEADER) ===== */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>

                    {/* ===== MAIN APP (WITH HEADER) ===== */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/diagnose" element={<DiagnosePage />} />
                        <Route path="/result" element={<ResultPage />} />
                        <Route path="/artikel" element={<ArticlesPage />} />
                        <Route path="/artikel/:slug" element={<ArticlesPage />} />

                        {/* ADMIN */}
                        <Route path="/admin" element={<AdminRoute />}>
                            <Route index element={<Dashboard />} />

                            {/* gejala */}
                            <Route path="/admin/gejala" element={<GejalaList />} />
                            <Route path="/admin/gejala/create" element={<GejalaForm />} />
                            <Route path="/admin/gejala/edit/:id" element={<GejalaForm />} />

                            {/* penyakit */}
                            <Route path="/admin/penyakit" element={<PenyakitList />} />
                            <Route path="/admin/penyakit/create" element={<PenyakitForm />} />
                            <Route path="/admin/penyakit/edit/:id" element={<PenyakitForm />} />

                            {/* rules */}
                            <Route path="/admin/rule" element={<RuleList />} />
                            <Route path="/admin/rule/create" element={<RuleForm />} />
                            <Route path="/admin/rule/edit/:id" element={<RuleForm />} />

                            {/* article */}
                            <Route path="/admin/artikel" element={<ArticleList />} />
                            <Route path="/admin/artikel/create" element={<ArticleForm />} />
                            <Route path="/admin/artikel/edit/:id" element={<ArticleForm />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>

            <ToastContainer />
        </>
    );
}

export default App;
