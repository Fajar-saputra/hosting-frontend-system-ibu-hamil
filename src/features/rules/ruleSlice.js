import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ruleService from "./ruleService";

const initialState = {
    rules: [],
    rule: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// --- Async Thunks (CREATE, READ, UPDATE, DELETE) ---
export const getRules = createAsyncThunk("rule/getAll", async (_, thunkAPI) => {
    try {
        return await ruleService.getRules();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getRuleById = createAsyncThunk("rule/getById", async (id, thunkAPI) => {
    try {
        return await ruleService.getRuleById(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const createRule = createAsyncThunk("rule/create", async (ruleData, thunkAPI) => {
    try {
        return await ruleService.createRule(ruleData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateRule = createAsyncThunk("rule/update", async (ruleData, thunkAPI) => {
    try {
        return await ruleService.updateRule(ruleData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteRule = createAsyncThunk("rule/delete", async (id, thunkAPI) => {
    try {
        await ruleService.deleteRule(id);
        return id;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteAllRules = createAsyncThunk("rule/deleteAll", async (_, thunkAPI) => {
    try {
        await ruleService.deleteAllRules();
        return true;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// --- Rule Slice ---
export const ruleSlice = createSlice({
    name: "rule",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            // --- GET RULES ---
            .addCase(getRules.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRules.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.rules = action.payload;
            })
            .addCase(getRules.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // --- GET RULE BY ID ---
            .addCase(getRuleById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRuleById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.rule = action.payload;
            })
            .addCase(getRuleById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // --- CREATE RULE ---
            .addCase(createRule.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.rules.push(action.payload);
            })
            .addCase(createRule.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            // --- UPDATE RULE ---
            .addCase(updateRule.fulfilled, (state, action) => {
                state.isSuccess = true;
                const index = state.rules.findIndex((r) => r._id === action.payload._id);
                if (index !== -1) {
                    state.rules[index] = action.payload;
                }
            })
            .addCase(updateRule.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            // --- DELETE RULE ---
            .addCase(deleteRule.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.rules = state.rules.filter((rule) => rule._id !== action.payload);
            })
            .addCase(deleteRule.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            // --- DELETE ALL RULE ---
            .addCase(deleteAllRules.fulfilled, (state) => {
                state.isSuccess = true;
                state.rules = [];
            })
            .addCase(deleteAllRules.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = ruleSlice.actions;
export default ruleSlice.reducer;
