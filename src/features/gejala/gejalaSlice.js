import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gejalaService from "./gejalaService";

const initialState = {
    gejalas: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// ================= THUNKS =================

export const getGejalas = createAsyncThunk("gejala/getAll", async (_, thunkAPI) => {
    try {
        return await gejalaService.getGejalas();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const createGejala = createAsyncThunk("gejala/create", async (data, thunkAPI) => {
    try {
        return await gejalaService.createGejala(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const deleteGejala = createAsyncThunk("gejala/delete", async (id, thunkAPI) => {
    try {
        await gejalaService.deleteGejala(id);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const updateGejala = createAsyncThunk("gejala/update", async (data, thunkAPI) => {
    try {
        return await gejalaService.updateGejala(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

// ================= SLICE =================

export const gejalaSlice = createSlice({
    name: "gejalas",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGejalas.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGejalas.fulfilled, (state, action) => {
                state.isLoading = false;
                state.gejalas = action.payload;
            })
            .addCase(getGejalas.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(createGejala.fulfilled, (state, action) => {
                state.gejalas.push(action.payload);
            })

            .addCase(deleteGejala.fulfilled, (state, action) => {
                state.gejalas = state.gejalas.filter(
                    (g) => g._id !== action.payload
                );
            })

            .addCase(updateGejala.fulfilled, (state, action) => {
                const index = state.gejalas.findIndex(
                    (g) => g._id === action.payload._id
                );
                if (index !== -1) state.gejalas[index] = action.payload;
            });
    },
});

export const { reset } = gejalaSlice.actions;
export default gejalaSlice.reducer;
