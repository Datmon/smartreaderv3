import axios from 'axios';

// const BASE_URL = 'https://smartreader.space/api';
const BASE_URL = 'https://smart-reader-api.herokuapp.com/api';

export const getPhoto = async (userId: string) => {
  const response = await axios
    .post(BASE_URL + `/users/photo/${userId}`)
    .catch(e => console.log('error get photo', e));
  return response;
};

export const postPhoto = async (photo: any, token: string) => {
  const formData = await new FormData();

  await photo.forEach(file => {
    formData.append('photo', {
      uri: `${file.path}`,
      type: file.mime,
      name: file.filename ?? `${file.path}`,
    });
  });

  const res = await fetch(`${BASE_URL}/users/photo`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const responce = await res.json();

  return responce;
};
