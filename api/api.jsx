import { getData, storeData } from '../src/utilities/utilities';

let api = {};

const getToken = async () => {
  try {
    const token = await getData('token');
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};


export const fetchAPI = async (query, variables) => {
  const token = await getToken();
  return await fetch('https://looogs.onrender.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ query: query, variables }),
  })
    .then(res => {
      return res.json()
    })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.error(error);
    });
};

