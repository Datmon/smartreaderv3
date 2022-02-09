import { createReducer, createAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

const addTypeFilter = createAction<string>('filters/addTypeFilter');
const deleteTypeFilter = createAction<string>('filters/deleteTypeFilter');
const changeSortFilter = createAction<string>('filters/changeSortFilter');
const addCustomFilter = createAction<string>('filters/addCustomFilter');
const deleteCustomFilter = createAction<string>('filters/deleteCustomFilter');

export const reducer = createReducer(
  {
    typeFilters: ['All'] as Array<string>,
    sortFilter: 'interaction',
    customFilters: ['Loaded'] as Array<string>,
  },

  builder => {
    builder.addCase(addTypeFilter, (state, action) => {
      if (action.payload === 'All' || state.typeFilters[0] === 'All') {
        state.typeFilters = [];
      }
      state.typeFilters.push(action.payload);
    });

    builder.addCase(deleteTypeFilter, (state, action) => {
      if (action.payload !== 'All') {
        state.typeFilters = state.typeFilters.filter(
          value => value !== action.payload,
        );
      }
    });

    builder.addCase(changeSortFilter, (state, action) => {
      state.sortFilter = action.payload;
    });

    builder.addCase(addCustomFilter, (state, action) => {
      if (state.customFilters.find(value => value === action.payload)) {
        state.customFilters = state.customFilters.filter(
          value => value !== action.payload,
        );
      } else {
        state.customFilters.push(action.payload);
      }
    });
  },
);

export const actions = {
  addTypeFilter,
  deleteTypeFilter,
  changeSortFilter,
  addCustomFilter,
  deleteCustomFilter,
};

export const selectors = {
  selectTypeFilter: (state: RootState) => state.filters.typeFilters,
  selectSortFilter: (state: RootState) => state.filters.sortFilter,
  selectCustomFilters: (state: RootState) => state.filters.customFilters,
};
