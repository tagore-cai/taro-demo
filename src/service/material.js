import request from '../utils/request';

/**
 * 获取产地列表
 * @param params
 */
export function getAddressList(params = {}) {
  return request.post('/api/console/ic/producingarea/list', params);
}
/**
 * 更新或新增产地
 * @param params
 */
export function saveAddress(params) {
  return request.post('/api/console/ic/producingarea/save', params);
}

/**
 * 更新或新增产地
 * @param params
 */
export function updateAddress(params) {
  return request.post('/api/console/ic/producingarea/update', params);
}
