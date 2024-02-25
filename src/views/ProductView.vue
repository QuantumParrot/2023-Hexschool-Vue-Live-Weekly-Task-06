<template>

<LoadingOverlay v-model:active="isLoading" :z-index="1000"></LoadingOverlay>

<div class="container my-5" v-if="!isLoading">
    <div class="row">
        <div class="col-md-6">
            <div class="h-100 d-flex flex-column justify-content-between gap-4">
                <div class="card overflow-hidden">
                    <img class="main-img" :src="displayImages.mainImage" :alt="product.title">
                </div>
                <div class="flex-grow-1 justify-content-center card p-3">
                    <div class="d-flex gap-3">
                    <img class="display-img" :src="img" :alt="product.title"
                         v-for="img in displayImages.images" :key="img"
                         @click="changeDisplay(img)">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="h-100 card px-4 pt-5 pb-4
                        d-flex flex-column justify-content-between">
                <div>
                    <h2 class="fw-bold mb-3">{{ product.title }}</h2>
                    <h3 class="fs-6 text-muted fst-italic">{{ product.subtitle }}</h3>
                    <hr>
                    <p class="fs-5">
                    <span class="badge lh-base bg-dark me-2">分類</span>
                    {{ product.category }}</p>
                    <p class="fs-5">
                    <span class="badge lh-base bg-dark me-2">規格</span>
                    {{ product.content }}</p>
                    <hr>
                    <p class="text-description text-justify">{{ product.description }}</p>
                </div>
                <div class="alert bg-secondary-subtle mb-0">
                    <div class="d-flex justify-content-between align-items-center">
                        NT$ {{ product.price }} / {{ product.unit }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<style>

.main-img {

  min-height: 700px;
  object-fit: contain;

}

.display-img {

  cursor: pointer;
  height: 200px;
  object-fit: cover;

}

</style>

<script>

import { mapState, mapActions } from 'pinia';

import loadingStore from '@/stores/loadingStore';
import productStore from '@/stores/productStore';

export default {

  computed: {

    ...mapState(loadingStore, ['isLoading']),

    ...mapState(productStore, ['product', 'displayImages']),

  },

  methods: {

    ...mapActions(productStore, ['getSingleProduct', 'changeDisplay']),

  },

  mounted() {
    // console.log(this.$route.params.id);
    this.getSingleProduct(this.$route.params.id);
  },

};

</script>
