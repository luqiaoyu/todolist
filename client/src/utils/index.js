
import axios from 'axios';

const genStorageKey = (name) => {
  const prefix = 'blog_react_';
  return `${prefix}${name}`;
};

const $storage = {
  get token() {
    return localStorage.getItem(genStorageKey('token'));
  },
  set token(v) {
    localStorage.setItem(genStorageKey('token'), v);
  },

  get username() {
    return localStorage.getItem(genStorageKey('username'));
  },

  set username(v) {
    localStorage.setItem(genStorageKey('username'), v);
  },

  clear() {
    localStorage.clear();
  },
};


const $http = axios.create({
  // set default url
  baseURL: process.env.API_URL ? process.env.API_URL : 'http://192.168.2.102:32214/apis',
});

$http.interceptors.request.use((config) => {
  // set token
  const result = config;
  if ($storage.token) {
    result.headers = {
      Authorization: `Bearer ${$storage.token}`,
    };
  }
  return result;
});

export {
  $storage,
  $http,
};
