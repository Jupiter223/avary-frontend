import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/service/avary-info/getall',
    // url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
