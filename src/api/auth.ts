import axios from 'axios';

const BASE_URL = 'https://6773-62-84-121-251.ngrok.io/api/';

//const BASE_URL = 'http://130.193.38.44:3000/api/';

export const signIn = async (email: string, password: string) => {
  const res = await axios.post(BASE_URL + 'auth/login', { email, password });
  return res;
};

export const signUp = async (
  username: string,
  email: string,
  password: string,
) => {
  const res = await axios
    .post(BASE_URL + 'auth/register', {
      username,
      email,
      password,
    })
    .catch(error => error);
  return res;
};

export const serviceSignUp = async (email: string, username: string) => {
  const res = await axios.post(BASE_URL + 'auth/service', {
    email,
    username,
  });
  return res;
};

export const verifyUser = async (email: string, id: string) => {
  const res = await axios.post(BASE_URL + 'auth/verifyUser', {
    email,
    id,
  });
  return res;
};

export const verificate = async (email: string) => {
  const res = await axios.post(BASE_URL + 'auth/verification', {
    email,
  });
  return res;
};

export const userExists = async (email: string) => {
  const res = await axios.post(BASE_URL + 'auth/userExists', {
    email,
  });
  return res;
};

export const resetPassword = async (
  userId: string,
  userData: { email: string; password: string },
) => {
  const res = await axios.post(BASE_URL + 'auth/forgotPassword', {
    userId,
    userData,
  });
  return res;
};
