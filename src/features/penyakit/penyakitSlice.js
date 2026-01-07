import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import penyakitService from "./penyakitService";

const initialState = {
    Penyakit: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// =======================================================
// Thunks untuk CRUD
// =======================================================

// Create Penyakit
export const createPenyakit = createAsyncThunk("penyakit/create", async (PenyakitData, thunkAPI) => {
    try {
        return await penyakitService.createPenyakit(PenyakitData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get Semua Penyakit
export const getPenyakits = createAsyncThunk("penyakit/getAll", async (_, thunkAPI) => {
    try {
        return await penyakitService.getPenyakits();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete Penyakit
export const deletePenyakit = createAsyncThunk("penyakit/delete", async (id, thunkAPI) => {
    try {
        await penyakitService.deletePenyakit(id);
        return id; // Mengembalikan ID untuk filter di reducer
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update Penyakit
export const updatePenyakit = createAsyncThunk("penyakit/update", async (PenyakitData, thunkAPI) => {
    try {
        return await penyakitService.updatePenyakit(PenyakitData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// =======================================================
// Slice Reducer
// =======================================================
export const PenyakitSlice = createSlice({
    name: "penyakit",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },

    extraReducers: (builder) => {
        builder
            // 🛑 Ubah dari getPenyakit menjadi getPenyakits 🛑
            .addCase(getPenyakits.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPenyakits.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Pastikan state.Penyakit sesuai dengan nama di initialState
                state.Penyakit = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getPenyakits.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // ... (sisanya sesuaikan nama state.Penyakit)
            .addCase(createPenyakit.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.Penyakit.push(action.payload);
            })
            .addCase(deletePenyakit.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.Penyakit = state.Penyakit.filter((p) => p._id !== action.payload);
            })
            .addCase(updatePenyakit.fulfilled, (state, action) => {
                state.isSuccess = true;
                const index = state.Penyakit.findIndex((p) => p._id === action.payload._id);
                if (index !== -1) {
                    state.Penyakit[index] = action.payload;
                }
            });
    },
});

export const { reset } = PenyakitSlice.actions;
export default PenyakitSlice.reducer;
