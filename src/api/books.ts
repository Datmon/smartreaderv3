import axios from 'axios';
import { Alert } from 'react-native';
import { DocumentPickerResponse } from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { StorageService } from 'services';
const Frisbee = require('frisbee');

const BASE_URL = 'https://6773-62-84-121-251.ngrok.io/api';

export const postBook = async (pickercFile: DocumentPickerResponse) => {
  const formData = await new FormData();

  //   Object.entries(pikerFile).forEach(([key, val]) => {
  //     // HACK - make type happy…
  //     const hackVal = val as string;
  //     formData.append(key, hackVal);
  //   });

  //formData.append('book', { uri, name, type });

  //   RNFS.readFile(uri)
  //     .then(value => console.log('value: ', value))
  //     .catch(err => {
  //       console.log('error', err.message, err.code);
  //     });

  await formData.append('book', pickercFile);

  // const config = {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     Accept: 'application/json',
  //     Authorization:
  //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlN2Q3NzNiNi1lODQ2LTQzZjMtYWUxMS0yOTQ2ODY0NzlkZmUiLCJpYXQiOjE2NDQ3NDkyMTQsImV4cCI6MTY0NTM1NDAxNH0.Dutj9TRLQjfYUQdIv6GCYMYutpjsI9dYlf_yHeHe4a8',
  //   },
  // };

  // const res = await axios
  //   .post(BASE_URL + 'books', formData, config)
  //   .catch(error => error);

  const token = await StorageService.getAssessToken();

  const res = await fetch(`${BASE_URL}/books`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  const bookResponce = await res.json();
  return bookResponce;
  //
  //

  // var api = new Frisbee({
  //   baseURI: 'http://130.193.38.44:3000/api', // optional
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'multipart/form-data; ',
  //   },
  // });
  // console.log('res from api ///////////////');
  // await api
  //   .post('/books', { body: formData })
  //   .then(console.log)
  //   .catch(console.error);
  //
  //

  // var http = new XMLHttpRequest();
  // var url = 'https://daa6-130-193-38-44.ngrok.io/api/books';
  // http.open('POST', url, true);

  // //Send the proper header information along with the request
  // http.setRequestHeader('Authorization', `Bearer ${token}`);
  // http.setRequestHeader('Content-type', 'multipart/form-data');

  // http.onreadystatechange = function () {
  //   //Call a function when the state changes.
  //   if (http.readyState == 4 && http.status == 200) {
  //     console.log('//////////////////////http.responseText', http.responseText);
  //   }
  // };

  // http.onload = function () {
  //   // do something to response
  //   console.log('this.responseText', this.responseText);
  //   return;
  // };

  // http.send(formData);

  // http.onerror = function () {
  //   console.log('fuck you //////////////////////////////');
  // };
};

export const getBooks = async () => {
  const res = await axios.get(BASE_URL + '/books').catch(error => error);
  console.log('res', res);
  return res;
};

export const downloadBook = async (bookId: string) => {
  const res = await axios
    .get(`${BASE_URL}/books/${bookId}`)
    .catch(error => error);
  return res.data;
};
