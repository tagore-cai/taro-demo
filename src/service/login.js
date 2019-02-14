import request from '../utils/request';

export function login(params) {
  return request.post('/console/ccs/login/login', params);
}
