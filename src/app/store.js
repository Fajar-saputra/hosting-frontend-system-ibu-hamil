import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import gejalaReducer from "../features/gejala/gejalaSlice";
import ruleReducer from "../features/rules/ruleSlice";
import penyakitReducer from "../features/penyakit/penyakitSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        gejala: gejalaReducer,
        rule: ruleReducer,
        penyakit: penyakitReducer,
    },
});
