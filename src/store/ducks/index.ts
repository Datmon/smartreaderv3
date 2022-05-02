import { combineReducers } from 'redux';
import * as authDuck from './auth';
import * as filterDuck from './filters';
import * as bookDuck from './books';

export const reducer = combineReducers({
  auth: authDuck.reducer,
  filters: filterDuck.reducer,
  books: bookDuck.reducer,
});

export const actions = {
  auth: authDuck.actions,
  filters: filterDuck.actions,
  books: bookDuck.actions,
};

export const selectors = {
  auth: authDuck.selectors,
  filters: filterDuck.selectors,
  books: bookDuck.selectors,
};
