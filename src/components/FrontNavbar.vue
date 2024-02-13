<template>

<nav class="navbar bg-dark text-white py-4 sticky-top">
    <div class="container-fluid">
        <h1 class="mb-0 fs-4">
            收藏家
            <span class="font-dancing-script">- The Cultural Collector -</span>
        </h1>
        <ul class="list-unstyled mb-0 d-flex align-items-center gap-3">
            <li>
            <RouterLink to="/" class="nav-link">首頁</RouterLink>
            </li>
            <li>
            <RouterLink to="/products" class="nav-link">商品一覽</RouterLink>
            </li>
            <li class="d-flex align-items-center gap-2">
            <RouterLink to="/carts" class="nav-link">購物車</RouterLink>
            <span class="badge text-bg-danger rounded-pill">{{ carts.length }}</span>
            </li>
        </ul>
    </div>
</nav>

</template>

<style lang="scss" scoped>

.nav-link.active {

  color: #AB3B3A;
  font-weight: 700;

}

</style>

<script>

import { mapState, mapActions } from 'pinia';

import cartStore from '@/stores/cartStore';

export default {

  computed: {

    ...mapState(cartStore, ['carts']),

  },

  methods: {

    ...mapActions(cartStore, ['getCartsData']),

  },

  mounted() {
    if (this.$route.path !== '/carts') { this.getCartsData(); }
  },

};

</script>
