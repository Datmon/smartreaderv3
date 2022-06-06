/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { DocumentPickerResponse } from 'react-native-document-picker';
import RNFS from 'react-native-fs';
// const Frisbee = require('frisbee');
import RNFetchBlob from 'rn-fetch-blob';
import { useDispatch, useSelector } from 'react-redux';

// const BASE_URL = 'https://smartreader.space/api';
const BASE_URL = 'https://smart-reader-api.herokuapp.com/api';

export const postBook = async (
  pickercFile: DocumentPickerResponse,
  token: string,
) => {
  const formData = new FormData();

  await formData.append('file', pickercFile);

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

  if (res.ok) {
    const response = await axios.patch(
      `${BASE_URL}/books/${bookResponce.bookId}`,
      {
        title: pickercFile.name,
        book: pickercFile.name,
        author: pickercFile?.author || 'author',
      },
    );
    return response;
  }
  // return response;
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

export const downloadBook = async (bookId: string, token: string) => {
  const respons = await axios
    .get(`${BASE_URL}/books/${bookId}`)
    .catch(e => console.log('error', e));
  const { dirs } = RNFetchBlob.fs;
  // const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
  const dirToSave = RNFetchBlob.fs.dirs.DocumentDir;

  await RNFetchBlob.fetch('GET', `${respons.data.url}`)
    .then(res => {
      console.log('second');
      let pdfLocation = dirToSave + '/' + bookId + '.pdf';
      RNFetchBlob.fs.writeFile(pdfLocation, res.data, 'base64');
      console.log('pdfLocation', pdfLocation);
    })
    // Something went wrong:
    .catch((errorMessage: any, _statusCode: any) => {
      console.log('errorMessage', errorMessage);
      // error handling
    });
};

export const getAllNotesAndBookmarks = async (
  bookId: string,
  token: string,
) => {
  const res = await axios
    .get(BASE_URL + `/books/import/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch(e => console.log('error getAllNotesAndBookmarks', e));
  return res;
};

export const postNote = async (bookId: string, note: string) => {
  const response = await axios
    .post(BASE_URL + '/notes', { bookId, note })
    .catch(e => console.log('error post note', e));
  return response;
};

export const postBookmark = async (bookId: string, bookmark: string) => {
  const response = await axios
    .post(BASE_URL + '/bookmarks', { bookId, bookmark })
    .catch(e => console.log('error post bookmark', e));
  return response;
};
