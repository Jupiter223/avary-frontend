import request from '@/utils/request'
export default {
    //卡片分页查询
    getList(current, limit) {
        return request({
            url: `/service/card/${current}/${limit}`,
            method: 'get',

        })

    },
    getById(id) {
        return request({
            url: `/service/card/getbyid/${id}`,
            method: 'get',

        })
    },
    add(card) {
        return request({
            url: `/service/card/add`,
            method: 'post',
            data: card

        })
    },
    updateInfo(card) {
        return request({
            url: `/service/card/update`,
            method: 'post',
            data: card

        })
    },
    remove(id) {
        return request({
            url: `/service/card/${id}`,
            method: 'delete'

        })
    },
    searchCard(ring) {
        return request({
            url: `/service/card/searchCard/${ring}`,
            method: 'get',

        })
    }
}
