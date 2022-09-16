import request from '@/utils/request'
export default {
    //卡片分页查询
    getList(current, limit) {
        return request({
            url: `/service/couple-info/${current}/${limit}`,
            method: 'get',

        })

    },
    // getById(id) {
    //     return request({
    //         url: `/service/card/getbyid/${id}`,
    //         method: 'get',

    //     })
    // },
    // add(card) {
    //     return request({
    //         url: `/service/card/add`,
    //         method: 'post',
    //         data: card

    //     })
    // },
    // updateInfo(card) {
    //     return request({
    //         url: `/service/card/update`,
    //         method: 'post',
    //         data: card

    //     })
    // },
    // remove(id) {
    //     return request({
    //         url: `/service/card/${id}`,
    //         method: 'delete'

    //     })
    // }

    addByList(list) {
        return request({
            url: `/service/couple-info/add-from-list`,
            method: 'post',
            data: list

        })
    },
    updateOtherInfo(coupleInfo) {
        return request({
            url: `/service/couple-info/updateOtherInfo`,
            method: 'post',
            data: coupleInfo

        })
    }

}