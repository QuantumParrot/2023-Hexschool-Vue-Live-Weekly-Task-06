import { defineStore } from 'pinia';

export default defineStore('loadingStore', {

  state: () => ({

    loadingQueue: [],

  }),

  getters: {

    isLoading: ({ loadingQueue }) => !!loadingQueue.length,

  },

  actions: {

    createLoader(task) { this.loadingQueue.push(task); },
    removeLoader(task) { this.loadingQueue.splice(this.loadingQueue.indexOf(task), 1); },

  },

});
