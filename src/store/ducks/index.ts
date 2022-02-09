import { combineReducers } from 'redux';
import * as authDuck from './auth';
import * as filterDuck from './filters';

export const reducer = combineReducers({
  auth: authDuck.reducer,
  filters: filterDuck.reducer,
});

export const actions = {
  auth: authDuck.actions,
  filters: filterDuck.actions,
};

export const selectors = {
  auth: authDuck.selectors,
  filters: filterDuck.selectors,
};
