import request from '@/utils/request'



export default {

    getList(current, limit) {
        return request({
            url: `/service/stock-item/${current}/${limit}`,
            method: 'get',

        })
    },
    getItemList(current, limit) {
        return request({
            url: `/service/stock-item/item/${current}/${limit}`,
            method: 'get',

        })

    },
    getItemById(id) {
        return request({
            url: `/service/stock-item/getbyid/${id}`,
            method: 'get',

        })
    },
    // getByCoupleId(id) {
    //     return request({
    //         url: `/service/avary-info/getbycoupleid/${id}`,
    //         method: 'get',

    //     })
    // },


    updateItem(item) {
        return request({
            url: `/service/stock-item/update`,
            method: 'post',
            data: item

        })
    },
    addItem(item) {
        return request({
            url: `/service/stock-item/add`,
            method: 'post',
            data: item

        })
    },
    removeItem(id) {
        return request({
            url: `/service/stock-item/${id}`,
            method: 'delete'

        })
    },
    removeStock(id) {
        return request({
            url: `/service/stock/${id}`,
            method: 'delete'

        })
    },
    serchByCondition(stockVo) {
        return request({
            url: `/service/stock-item/searchByCondition`,
            method: 'post',
            data: stockVo

        })
    },
    // searchCoupleByCondition(avaryVo) {
    //     return request({
    //         url: `/service/avary-info/getCouple`,
    //         method: 'post',
    //         data: avaryVo

    //     })
    // }
    updateStock(stock) {
        return request({
            url: `/service/stock/update`,
            method: 'post',
            data: stock

        })
    },
    updateStockNumber(stock) {
        return request({
            url: `/service/stock/updateStockNumber`,
            method: 'post',
            data: stock

        })
    },
    addStock(stock) {
        return request({
            url: `/service/stock/add`,
            method: 'post',
            data: stock

        })
    },
    reduceStock(stock) {
        return request({
            url: `/service/stock/reduce`,
            method: 'post',
            data: stock

        })
    },
}
