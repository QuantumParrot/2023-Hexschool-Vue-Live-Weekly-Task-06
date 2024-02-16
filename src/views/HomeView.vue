<template>

<FrontNavbar></FrontNavbar>
    <div style="min-height: calc(100vh - 152px)">
        <RouterView />
    </div>
<FrontFooter></FrontFooter>

</template>

<script>

import FrontNavbar from '@/components/FrontNavbar.vue';
import FrontFooter from '@/components/FrontFooter.vue';

export default {

  components: { FrontNavbar, FrontFooter },

};

</script>
