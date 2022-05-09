import { combineReducers } from 'redux';
import * as authDuck from './auth';
import * as filterDuck from './filters';
import * as bookDuck from './books';
import * as settingsDuck from './settings';

export const reducer = combineReducers({
  auth: authDuck.reducer,
  filters: filterDuck.reducer,
  books: bookDuck.reducer,
  settings: settingsDuck.reducer,
});

export const actions = {
  auth: authDuck.actions,
  filters: filterDuck.actions,
  books: bookDuck.actions,
  settings: settingsDuck.actions,
};

export const selectors = {
  auth: authDuck.selectors,
  filters: filterDuck.selectors,
  books: bookDuck.selectors,
  settings: settingsDuck.selectors,
};
