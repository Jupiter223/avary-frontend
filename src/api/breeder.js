import request from '@/utils/request'



export default {

    getEggList(current, limit) {
        return request({
            url: `/service/egg-info/${current}/${limit}`,
            method: 'get',

        })

    },

    getNestlingList(current, limit) {
        return request({
            url: `/service/nestling/${current}/${limit}`,
            method: 'get',

        })

    },
    getEggById(id) {
        return request({
            url: `/service/egg-info/getbyid/${id}`,
            method: 'get',

        })
    },
    getEggsByParentId(id) {
        return request({
            url: `/service/egg-info/getbyparentid/${id}`,
            method: 'get',

        })
    },
    getEggsThisYearByParentId(id) {
        return request({
            url: `/service/egg-info/getnowbyparentid/${id}`,
            method: 'get',

        })
    },
    getEggsByYearByParentId(id, year) {
        return request({
            url: `/service/egg-info/getbyparentid/id=${id}/year=${year}`,
            method: 'get',

        })
    },
    getEggCount(id) {
        return request({
            url: `/service/egg-info/getCount/${id}`,
            method: 'get',

        })
    },

    getNestlingById(id) {
        return request({
            url: `/service/nestling/getbyid/${id}`,
            method: 'get',

        })
    },

    getNestlingsByParentId(id) {
        return request({
            url: `/service/nestling/getbyparentid/${id}`,
            method: 'get',

        })
    },
    getNestlingsThisYearByParentId(id) {
        return request({
            url: `/service/nestling/getnowbyparentid/${id}`,
            method: 'get',

        })
    },
    getNestlingsByYearByParentId(id, year) {
        return request({
            url: `/service/nestling/getbyparentid/id=${id}/year=${year}`,
            method: 'get',

        })
    },

    updateEggInfo(eggInfo) {
        return request({
            url: `/service/egg-info/update`,
            method: 'post',
            data: eggInfo

        })
    },
    updateNestling(nestling) {
        return request({
            url: `/service/nestling/update`,
            method: 'post',
            data: nestling

        })
    },
    addEgg(eggInfo) {
        return request({
            url: `/service/egg-info/add`,
            method: 'post',
            data: eggInfo

        })
    },

    addNestling(nestling) {
        return request({
            url: `/service/nestling/add`,
            method: 'post',
            data: nestling

        })
    },
    removeEgg(id) {
        return request({
            url: `/service/egg-info/${id}`,
            method: 'delete'

        })
    },
    removeNestling(id) {
        return request({
            url: `/service/nestling/${id}`,
            method: 'delete'

        })
    },
}
