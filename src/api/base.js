import request from '../utils/request';

export function getMenuTree(params) {
  return request.post('/api/console/ic/menu/tree', params);
}
