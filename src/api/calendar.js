import request from '@/utils/request'
export default {
    //卡片分页查询
    getEvent(calendar) {
        return request({
            url: `/service/calendar/getEvent`,
            method: 'post',
            data: calendar

        })

    },
    // getById(id) {
    //     return request({
    //         url: `/service/card/getbyid/${id}`,
    //         method: 'get',

    //     })
    // },
    addEvent(calendar) {
        return request({
            url: `/service/calendar/addEvent`,
            method: 'post',
            data: calendar

        })
    },
    updateEvent(calendar) {
        return request({
            url: `/service/calendar/updateEvent`,
            method: 'post',
            data: calendar

        })
    },
    remove(id) {
        return request({
            url: `/service/calendar/remove/${id}`,
            method: 'delete'

        })
    },
    // searchCard(ring) {
    //     return request({
    //         url: `/service/card/searchCard/${ring}`,
    //         method: 'get',

    //     })
    // }
}
