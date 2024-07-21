import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Designer, fetchAllDesigners, fetchAllProjects, Project} from '../utils/fetchAllDesigners';

interface DesignersState {
    designers: Designer[];
    projects: Project[];
    loading: boolean;
    error: string | null;
    sortKey: keyof Designer;
    filterStatusClosed: string;
    filterStatusInProgress: string;
    filterProject: string;
}

const initialState: DesignersState = {
    designers: [],
    projects: [],
    loading: false,
    error: null,
    sortKey: 'username',
    filterStatusClosed: 'all',
    filterStatusInProgress: 'all',
    filterProject: 'all',
};

export const fetchDesigners = createAsyncThunk('designers/fetchAll', async () => {
    return await fetchAllDesigners();
});

export const fetchProjects = createAsyncThunk('projects/fetchAll', async () => {
    return await fetchAllProjects();
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
        setFilterStatusClosed(state, action) {
            state.filterStatusClosed = action.payload;
        },
        setFilterStatusInProgress(state, action) {
            state.filterStatusInProgress = action.payload;
        },
        setFilterProject(state, action) {
            state.filterProject = action.payload;
        },
        setProjects(state, action) {
            state.projects = action.payload;
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
            })
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projects = action.payload;
                state.loading = false;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load projects';
            });
    },
});

export const {
    setSortKey,
    setDesigners,
    setFilterStatusClosed,
    setFilterStatusInProgress,
    setFilterProject,
    setProjects
} = designersSlice.actions;
export default designersSlice.reducer;
