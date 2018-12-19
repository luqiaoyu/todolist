import { $http } from '../utils';

function register(user) {
  return $http.post('/user/register', user)
    .then(res => res.data);
}

function login(user) {
  return $http.post('/user/login', user)
    .then(res => res.data);
}

function getDetail() {
  return $http.get('/user/info')
    .then(res => res.data);
}

export default {
  register,
  login,
  getDetail,
};
