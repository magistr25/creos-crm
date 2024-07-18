import { configureStore } from '@reduxjs/toolkit';
import designersReducer from './designersSlice';
import loadingReducer from './loadingSlice';

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        designers: designersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
