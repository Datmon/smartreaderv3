import axios from 'axios';
import { DocumentPickerResponse } from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { StorageService } from 'services';

const BASE_URL = 'http://130.193.38.44:3000/api/';

export const postBook = async (pickercFile: DocumentPickerResponse) => {
  const formData = new FormData();

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

  formData.append('book', pickercFile);

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

  const res = await fetch('http://130.193.38.44:3000/api/books', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const bookResponce = await res.json();
  return bookResponce;
};

export const getBooks = async () => {
  const res = await axios.get(BASE_URL + 'books').catch(error => error);
  return res;
};
