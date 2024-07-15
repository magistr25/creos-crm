import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
    currentLanguage: 'en' | 'ru';
}

const initialState: LanguageState = {
    currentLanguage: 'en',
};

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setCurrentLanguage: (state, action: PayloadAction<'en' | 'ru'>) => {
            state.currentLanguage = action.payload;
        },
    },
});

export const { setCurrentLanguage } = languageSlice.actions;

export default languageSlice.reducer;
