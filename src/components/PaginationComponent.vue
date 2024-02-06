<template>

<nav aria-label="page navigation">
    <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': currentPage - 1 < 1 }">
            <a href="#" class="page-link"
               aria-label="prev"
               @click.prevent="switchPage(currentPage - 1)">
            <span aria-hidden="true">&laquo;</span></a>
        </li>
        <template v-for="i in total" :key="i">
            <li class="page-item" :class="{ 'active': currentPage === i }">
                <a class="page-link" href="#" :aria-label="`page ${i}`"
                   @click.prevent="switchPage(i)">{{ i }}</a>
            </li>
        </template>
        <li class="page-item" :class="{ 'disabled': currentPage + 1 > total }">
            <a href="#" class="page-link"
               aria-label="next"
               @click.prevent="switchPage(currentPage + 1)">
            <span aria-hidden="true">&raquo;</span></a>
        </li>
    </ul>
</nav>

</template>

<script>

export default {

  props: ['currentPage', 'total'],

  methods: {

    switchPage(num) { this.$emit('switch-page', num); },

  },

};

</script>
