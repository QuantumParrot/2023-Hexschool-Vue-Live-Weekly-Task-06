<template>

<LoadingOverlay v-model:active="isLoading" :z-index="1100"></LoadingOverlay>

<DashboardNavbar />
<div class="container-fluid">
<RouterView />
</div>

</template>

<script>

import { mapState } from 'pinia';

import loadingStore from '@/stores/loadingStore';

import DashboardNavbar from '@/components/DashboardNavbar.vue';

export default {

  components: { DashboardNavbar },

  computed: {

    ...mapState(loadingStore, ['isLoading']),

  },

};

</script>
