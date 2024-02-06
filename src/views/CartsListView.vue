<template>

<LoadingOverlay v-model:active="isLoading" :z-index="1000"></LoadingOverlay>

<div class="container my-5" style="min-height: 100vh">
    <h2 class="fw-bolder mb-5">購物車</h2>
    <div class="alert bg-secondary-subtle" v-if="!carts.length">
        購物車內目前沒有商品，去<RouterLink to="/products">逛逛</RouterLink>！
    </div>
    <table class="table" v-else>
        <thead>
        <tr>
            <th width="10%">處理</th>
            <th width="50%">商品</th>
            <th width="15%" class="text-end">單價</th>
            <th width="15%" class="text-end">數量</th>
            <th width="10%" class="text-end">小計</th>
        </tr>
        </thead>
        <tbody class="align-middle">
        <tr v-for="cart in carts" :key="cart.id">
            <td>
                <button type="button" class="btn btn-danger" @click="deleteCartItem(cart.id)">
                    <i class="bi bi-trash-fill me-2"></i>
                    <span>刪除</span>
                </button>
            </td>
            <td>
                <img class="cart-img me-4" :src="cart.product.imageUrl" :alt="cart.product.title">
                <div class="d-inline-block align-middle">
                    <p class="fs-5 fw-bold mb-1">{{ cart.product.title }}</p>
                    <p class="fs-7 fst-italic text-muted mb-0">{{ cart.product.content }}</p>
                </div>
            </td>
            <td class="text-end">
                NT$
                <span class="text-muted me-1 text-decoration-line-through"
                      v-if="cart.product.origin_price !== cart.product.price">
                {{ cart.product.origin_price }}
                </span>
                <span>{{ cart.product.price }} 元</span>
            </td>
            <td>
                <div class="input-group ps-3">
                    <select class="form-select" :value="cart.qty"
                            @change="changeCartQty(cart, $event.target.value)">
                        <option v-for="i in 10 * Math.ceil((cart.qty + 1)/10)"
                                :key="i" :value="i">{{ i }}
                        </option>
                    </select>
                    <span class="input-group-text">{{ cart.product.unit }}</span>
                </div>
            </td>
            <td class="text-end fw-bold">NT$ {{ cart.total }} 元</td>
        </tr>
        </tbody>
        <tfoot>
        <tr class="fs-5 fw-bold">
            <td colspan="5" class="py-3">
                <div class="d-flex justify-content-between align-items-center">
                    <button type="button" class="btn btn-outline-danger"
                            @click="confirm('確定清空購物車？', deletAllCart)">清空購物車</button>
                    <div class="d-flex align-items-center gap-3">
                        總計：NT$ {{ total }} 元
                        <button type="button" class="btn btn-secondary" @click="displayForm">
                            <i class="bi bi-cart-check-fill me-2"></i>
                            <span>結帳</span>
                        </button>
                    </div>
                </div>
            </td>
        </tr>
        </tfoot>
    </table>
    <OrderForm v-show="carts.length && showForm"></OrderForm>
</div>

</template>

<style>

.cart-img {

  width: 280px;
  object-fit: cover;

}

</style>

<script>

// pinia

import { mapState, mapActions } from 'pinia';

import loadingStore from '@/stores/loadingStore';
import orderStore from '@/stores/orderStore';
import cartStore from '@/stores/cartStore';

// component

import OrderForm from '@/components/OrderForm.vue';

export default {

  components: { OrderForm },

  computed: {

    ...mapState(loadingStore, ['isLoading']),

    ...mapState(orderStore, ['showForm']),

    ...mapState(cartStore, ['carts', 'total']),

  },

  methods: {

    ...mapActions(orderStore, ['displayForm']),

    ...mapActions(cartStore, ['getCartsData', 'changeCartQty', 'deleteCartItem', 'deletAllCart']),

  },

  mounted() { this.getCartsData(); },

};

</script>
