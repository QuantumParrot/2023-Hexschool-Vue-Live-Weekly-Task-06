<template>

<LoadingOverlay v-model:active="isLoading" :z-index="1000"></LoadingOverlay>

<div class="container my-5">
    <h2 class="fw-bolder mb-5">本店商品</h2>
    <PaginationComponent
        :current-page="currentPage"
        :total="totalPages"
        @switch-page="switchPage" />
    <ul class="list-unstyled row g-4">
        <template v-for="product in displayProducts" :key="product.id">
            <li class="col-md-4">
                <div class="h-100 card border-0 shadow overflow-hidden">
                    <img class="card-img-top" :src="product.imageUrl" :alt="product.title">
                    <div class="card-body">
                        <div class="mb-3 d-flex gap-2 flex-nowrap overflow-x-scroll">
                            <template v-for="tag in product.tags" :key="tag">
                                <button type="button" class="btn p-0 border-0">
                                    <span class="badge bg-dark py-2">＃{{ tag }}</span>
                                </button>
                            </template>
                        </div>
                        <h3 class="fs-4 mb-3">{{ product.title }}</h3>
                        <p>NT$
                        <span class="text-muted" v-if="product.origin_price !== product.price">原價
                            <span class="text-decoration-line-through">
                            {{ product.origin_price }}
                            </span>
                            <span class="arrow-animation"><span class="arrow">→</span></span>
                        </span>
                        {{ product.price }} 元
                        </p>
                        <div class="d-flex gap-3">
                          <RouterLink :to="`/product/${product.id}`" v-slot="{ navigate }" custom>
                              <button type="button" role="link"
                                      class="w-100 btn btn-outline-primary"
                                      @click="navigate">
                              <i class="bi bi-search me-2"></i>查看詳細內容
                              </button>
                          </RouterLink>
                          <button type="button" class="w-100 btn btn-outline-secondary"
                                  @click="addToCart(product.id)">
                              <i class="bi bi-cart-plus-fill me-2"></i>加入購物車
                          </button>
                        </div>
                    </div>
                </div>
            </li>
        </template>
    </ul>
</div>

</template>

<style>

.card-img-top {

  height: 300px;
  object-fit: cover;

}

.arrow-animation {

  position: relative;
  padding: 0 1rem;

}

.arrow {

  color: tomato;
  position: absolute;
  left: 0.25rem;
  animation: arrow-bounce 1s ease-out infinite;

}

@keyframes arrow-bounce {

  0%, 100% { left: 0.25rem } 25%, 75% { left: 0.5rem } 50% { left: 0.75rem }

}

</style>

<script>

import { mapState, mapActions } from 'pinia';

import loadingStore from '@/stores/loadingStore';
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';

import PaginationComponent from '@/components/PaginationComponent.vue';
import { RouterLink } from 'vue-router';

export default {

  components: { PaginationComponent, RouterLink },

  data() {
    return { currentPage: 1 };
  },

  computed: {

    ...mapState(loadingStore, ['isLoading']),

    ...mapState(productStore, ['products']),

    totalPages() { return Math.ceil(this.products.length / 9); },

    displayProducts() {
      return this.products.filter((i, idx) => Math.floor(idx / 9) + 1 === this.currentPage);
    },

  },

  methods: {

    ...mapActions(productStore, ['getProductsData']),
    ...mapActions(cartStore, ['addToCart']),

    switchPage(num) { this.currentPage = num; },

  },

  mounted() { this.getProductsData(); },

};

</script>
