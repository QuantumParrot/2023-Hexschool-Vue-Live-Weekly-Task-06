<template>

<FrontNavbar></FrontNavbar>
<RouterView />
<FrontFooter></FrontFooter>

</template>

<script>

import FrontNavbar from '@/components/FrontNavbar.vue';
import FrontFooter from '@/components/FrontFooter.vue';

export default {

  components: { FrontNavbar, FrontFooter },

};

</script>
