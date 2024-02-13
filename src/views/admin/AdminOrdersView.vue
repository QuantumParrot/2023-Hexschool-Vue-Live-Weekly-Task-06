<template>

<div class="my-5">
    <h3 class="mb-5">訂單管理</h3>
    <div class="row" v-if="orders.length">
        <div class="col-lg-8">
            <table class="table align-middle">
                <thead>
                <tr>
                    <th width="10%" class="pb-3">訂單建立日期</th>
                    <th width="20%" class="pb-3">顧客姓名</th>
                    <th width="10%" class="pb-3 text-end">訂單金額</th>
                    <th width="10%" class="pb-3 text-center">訂單狀態</th>
                    <th width="20%" class="pb-3 text-end">訂單處理</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.create_at }}</td>
                    <td>{{ order.user.name }}</td>
                    <td class="text-end">NT$ <b>{{ order.total }}</b></td>
                    <td class="text-center" :class="order.is_paid ? 'text-success' : 'text-danger'">
                        {{ order.is_paid ? '已付款' : '未付款' }}
                    </td>
                    <td class="text-end">
                        <div class="d-flex gap-2">
                            <button type="button" class="w-100 btn btn-sm btn-outline-dark"
                                    @click="orderDetail = order">
                            <i class="bi bi-search me-2"></i>查看</button>
                            <button type="button" class="w-100 btn btn-sm btn-outline-danger"
                                    @click="deleteOrder(order.id)">
                            <i class="bi bi-trash3-fill me-2"></i>刪除</button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="col-lg-4">
            <div class="alert bg-secondary-subtle py-4
                        d-flex justify-content-center align-items-center">
                <p class="fs-5 mb-0" v-if="!orderDetail.id">請點選任一訂單查看內容</p>
                <div class="w-100 h-100 d-flex flex-column justify-content-between" v-else>
                    <div>
                        <h4 class="mb-4">訂單內容</h4>
                        <table class="table mb-4">
                            <tbody>
                            <tr v-for="(item, key) in orderDetail.products" :key="key">
                                <td>{{ item.product.title }}</td>
                                <td>{{ item.qty }} {{ item.product.unit }}</td>
                                <td class="text-end">NT$ {{ item.total}}</td>
                            </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colspan="3">
                                總計<span class="float-end">NT$ {{ orderDetail.total }}</span>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div>
                        <h4 class="mb-4">客戶資訊</h4>
                        <div class="alert bg-white mb-0">
                            <p><b>訂單成立日期</b>：{{ format(orderDetail.create_at) }}</p>
                            <hr>
                            <p><b>姓名：</b>{{ orderDetail.user.name }}</p>
                            <hr>
                            <p><b>電話：</b>{{ orderDetail.user.tel }}</p>
                            <hr>
                            <p><b>地址：</b></p>
                            <p>{{ orderDetail.user.address }}</p>
                            <hr>
                            <p><b>信箱：</b>{{ orderDetail.user.email }}</p>
                            <hr>
                            <p><b>✨ 來自客戶的天音：</b></p>
                            <p class="pre-wrap">{{ orderDetail.message }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="alert bg-warning-subtle text-center" v-else>沒有訂單記錄</div>
</div>

</template>

<script>

import moment from 'moment';

import { mapState, mapActions } from 'pinia';

import adminStore from '@/stores/adminStore';

export default {

  data() {
    return { orderDetail: {} };
  },

  computed: {

    ...mapState(adminStore, ['orders']),

  },

  methods: {

    ...mapActions(adminStore, ['checkLogin', 'deleteOrder']),

    format(time) { return moment(time * 1000).format('YYYY/MM/DD A hh:mm:ss'); },

  },

  created() { this.checkLogin(this.$route.name); },

};

</script>
