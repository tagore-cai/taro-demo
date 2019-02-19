import request from '../utils/request';

/**
 * 获取产地列表
 * @param params
 */
export function listMryxItemInfoNew(params = {}) {
  return request.post('api/console/ic/itemInfo/listMryxItemInfoNew', params);
}
