import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';
import { RootState } from 'store';
import { auth } from 'api';
import { StorageService } from 'services';

const setAccessToken = createAction<string>('auth/setAccessToken');

const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await auth.signIn(email, password);
      console.log('response.data', response.data);
      await StorageService.setAccessToken(response.data.access_token);
      const token = await StorageService.getAssessToken();
      console.log('token', token);
      return response.data;
    } catch (err) {
      return err;
    }
  },
);

const serviceSignUp = createAsyncThunk(
  'auth/service',
  async ({ email, username }: { email: string; username: string }) => {
    try {
      const response = await auth.serviceSignUp(email, username);
      console.log('response.data', response.data);
      await StorageService.setAccessToken(response.data.access_token);
      const token = await StorageService.getAssessToken();
      console.log('token', token);
      return response.data;
    } catch (err) {
      return err;
    }
  },
);

const signOut = createAsyncThunk('auth/signOut', async () => {
  return StorageService.removeAssessToken();
});

interface User {
  email: string;
  password: string;
  access_token: string;
  id: string;
}

export const reducer = createReducer(
  {
    user: {} as User,
    signingInStatus: 'idle',
    serviceSignUpStatus: 'idle',
  },
  builder => {
    builder.addCase(setAccessToken, (state, action) => {
      state.user.access_token = action.payload;
    });

    builder
      .addCase(signIn.pending, state => {
        state.signingInStatus = 'pending';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.signingInStatus = 'fulfilled';
      })
      .addCase(signIn.rejected, state => {
        state.signingInStatus = 'rejected';
      });

    builder
      .addCase(serviceSignUp.pending, state => {
        state.serviceSignUpStatus = 'pending';
      })
      .addCase(serviceSignUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.serviceSignUpStatus = 'fulfilled';
      })
      .addCase(serviceSignUp.rejected, state => {
        state.serviceSignUpStatus = 'rejected';
      });
  },
);

export const actions = {
  signIn,
  signOut,
  setAccessToken,
  serviceSignUp,
};

export const selectors = {
  selectAccessToken: (state: RootState) => state.auth.user.access_token,
  selectSigningInStatus: (state: RootState) => {
    return state.auth.signingInStatus;
  },
};
