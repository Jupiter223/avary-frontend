import request from '@/utils/request'



export default {
    //讲师列表 条件查询分页
    getList(current, limit) {
        return request({
            url: `/service/avary-info/${current}/${limit}`,
            method: 'get',

        })

    },
    getById(id) {
        return request({
            url: `/service/avary-info/getbyid/${id}`,
            method: 'get',

        })
    },
    getByCoupleId(id) {
        return request({
            url: `/service/avary-info/getbycoupleid/${id}`,
            method: 'get',

        })
    },


    updateInfo(avaryInfo) {
        return request({
            url: `/service/avary-info/update`,
            method: 'post',
            data: avaryInfo

        })
    },
    add(avaryInfo) {
        return request({
            url: `/service/avary-info/add`,
            method: 'post',
            data: avaryInfo

        })
    },
    remove(id) {
        return request({
            url: `/service/avary-info/${id}`,
            method: 'delete'

        })
    },
    serchByCondition(avaryVo) {
        return request({
            url: `/service/avary-info/searchByCondition`,
            method: 'post',
            data: avaryVo

        })
    }
}
