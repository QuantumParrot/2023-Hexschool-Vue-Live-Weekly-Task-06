<template>

<div class="h-100 bg-dark text-white">
    <div class="h-100 container d-flex justify-content-center align-items-center">
        <div class="text-center">
            <h2 class="display-1 font-dancing-script mb-5">Oops ... !</h2>
            <img class="rembrandt mb-5" src="/rembrandt-self-portrait.jpg" alt="rembrandt-shock">
            <p>查無此路由！請稍候片刻，將為您導回首頁，或是您也可以直接點擊連結：<RouterLink to="/">首頁</RouterLink></p>
        </div>
    </div>
</div>

</template>

<style>

.rembrandt {

  height: 500px;
  object-fit: cover;
  border: 5px solid #CEC0B1;

}

</style>

<script>

export default {

  mounted() {
    setTimeout(() => {
      this.$router.replace('/');
    }, 3000);
  },

};

</script>
