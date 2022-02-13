import axios from 'axios';
import { DocumentPickerResponse } from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const BASE_URL = 'https://smart-reader-api.herokuapp.com/api/';

export const postBook = async (pickerFile: DocumentPickerResponse) => {
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

  formData.append('book', JSON.stringify(pickerFile));

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlN2Q3NzNiNi1lODQ2LTQzZjMtYWUxMS0yOTQ2ODY0NzlkZmUiLCJpYXQiOjE2NDQ3NDkyMTQsImV4cCI6MTY0NTM1NDAxNH0.Dutj9TRLQjfYUQdIv6GCYMYutpjsI9dYlf_yHeHe4a8',
    },
  };

  //   const res = await axios
  //     .post(BASE_URL + 'books', formData, config)
  //     .catch(error => error);
  fetch('https://smart-reader-api.herokuapp.com/api/books', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlN2Q3NzNiNi1lODQ2LTQzZjMtYWUxMS0yOTQ2ODY0NzlkZmUiLCJpYXQiOjE2NDQ3NDkyMTQsImV4cCI6MTY0NTM1NDAxNH0.Dutj9TRLQjfYUQdIv6GCYMYutpjsI9dYlf_yHeHe4a8',
    },
    body: formData,
  })
    .then(response => {
      console.log('image uploaded');
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};
