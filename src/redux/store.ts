import { configureStore } from '@reduxjs/toolkit';
import designersReducer from './designersSlice';

export const store = configureStore({
    reducer: {
        designers: designersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
