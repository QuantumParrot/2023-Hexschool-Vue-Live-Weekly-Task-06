<template>

<div class="my-5">
    <h3 class="mb-5">商品管理</h3>
    <button type="button" class="btn btn-warning mb-4" @click="showModal">新增商品</button>
    <table class="table table-hover align-middle">
        <thead>
        <tr>
            <th width="10%">分類</th>
            <th width="50%">商品名稱</th>
            <th width="10%" class="text-end">原價</th>
            <th width="10%" class="text-end">售價</th>
            <th width="10%" class="text-center">是否上架</th>
            <th width="10%" class="text-center">處理</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in products" :key="item.id">
            <td>
            <span class="badge bg-dark">{{ item.category }}</span>
            </td>
            <td>
            <div class="d-flex justify-content-between">
                {{ item.title }}
                <div class="d-flex gap-2">
                    <span class="badge bg-light text-dark py-2 shadow"
                          v-for="tag in item.tags" :key="tag">
                    ＃{{ tag }}</span>
                </div>
            </div>
            </td>
            <td class="text-end">NT$ {{ item.origin_price }}</td>
            <td class="text-end">NT$ {{ item.price }}</td>
            <td>
            <div class="d-flex justify-content-center">
                <div class="form-check form-switch">
                    <input type="checkbox" role="switch" class="form-check-input"
                           :checked="item.is_enabled" @change="switchProductStatus(item)">
                </div>
            </div>
            </td>
            <td>
            <div class="d-flex gap-2">
            <button type="button" class="btn btn-outline-dark"
                    @click="showModal(item)">
                    編輯</button>
            <button type="button" class="btn btn-outline-danger"
                    @click="deleteProduct(item.id)">
                    刪除</button>
            </div>
            </td>
        </tr>
        </tbody>
    </table>
</div>

<ProductModal ref="productModal" :temp-product="tempProduct"></ProductModal>

</template>

<script>

import { mapState, mapActions } from 'pinia';

import adminStore from '@/stores/adminStore';

import ProductModal from '@/components/ProductModal.vue';

export default {

  components: { ProductModal },

  data() {
    return {
      tempProduct: {},
    };
  },

  computed: {

    ...mapState(adminStore, ['products']),

  },

  methods: {

    ...mapActions(adminStore, ['checkLogin', 'switchProductStatus', 'deleteProduct']),

    showModal(item) {
      this.tempProduct = { ...item };
      this.$refs.productModal.show();
    },

  },

  created() { this.checkLogin(this.$route.name); },

};

</script>
