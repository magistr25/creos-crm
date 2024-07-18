import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllDesigners, Designer } from '../utils/fetchAllDesigners';

interface DesignersState {
    designers: Designer[];
    loading: boolean;
    error: string | null;
    sortKey: keyof Designer;
}

const initialState: DesignersState = {
    designers: [],
    loading: false,
    error: null,
    sortKey: 'username',
};

export const fetchDesigners = createAsyncThunk('designers/fetchAll', async () => {
    const response = await fetchAllDesigners();
    return response;
});

const designersSlice = createSlice({
    name: 'designers',
    initialState,
    reducers: {
        setSortKey(state, action) {
            state.sortKey = action.payload;
        },
        setDesigners(state, action) {
            state.designers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDesigners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDesigners.fulfilled, (state, action) => {
                state.designers = action.payload;
                state.loading = false;
            })
            .addCase(fetchDesigners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load designers';
            });
    },
});

export const { setSortKey, setDesigners } = designersSlice.actions;
export default designersSlice.reducer;
