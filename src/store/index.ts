// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { Middleware } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import thunk from 'redux-thunk';

import { actions, reducer, selectors } from './ducks';

export { actions, selectors };

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

type State = ReturnType<typeof reducer>;

export const rootReducer = (state: State, action: any) => {
  let nextState = state as State | undefined;

  if (action.type === actions.auth.signOut.type) {
    // How to reset store https://twitter.com/dan_abramov/status/703035591831773184
    // @ts-ignore
    nextState = undefined;
  }

  return reducer(nextState, action);
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['books', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const middlewares: Middleware[] = [];

// @ts-ignore
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   // @ts-ignore
//   // reducer: rootReducer,
//   reducer: persistedReducer,
//   devTools: true,
//   middleware: getDefaultMiddleware => [
//     ...getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
//     ...middlewares,
//   ],
//   ...options,
// });

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'],
) =>
  configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      ...middlewares,
    ],
    ...options,
  });

export const store = createStore();

export const persistor = persistStore(store);

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
