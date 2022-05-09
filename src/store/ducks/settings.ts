import { createReducer, createAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

const changeLanguage = createAction<string>('settings/changeLanguage');

export const reducer = createReducer(
  {
    selectedLanguage: 'en',
  },

  builder => {
    builder.addCase(changeLanguage, (state, { payload }) => {
      state.selectedLanguage = payload;
    });
  },
);

export const actions = {
  changeLanguage,
};

export const selectors = {
  selectLanguage: (state: RootState) => state.settings.selectedLanguage,
};
