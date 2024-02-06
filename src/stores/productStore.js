import axios from 'axios';

import { defineStore, mapActions } from 'pinia';

import loadingStore from './loadingStore';
import messageStore from './messageStore';

const { VITE_APP_SITE, VITE_APP_PATH } = import.meta.env;

export default defineStore('productStore', {

  state: () => ({
    productData: [],
    product: {},
    displayImages: {},
  }),

  getters: {
    products: ({ productData }) => [...productData].sort((a, b) => a.price - b.price),
  },

  actions: {

    ...mapActions(loadingStore, ['createLoader', 'removeLoader']),

    ...mapActions(messageStore, ['errorHandle']),

    getProductsData() {
      this.createLoader('getProductData');
      axios.get(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          const { products } = res.data;
          this.productData = products;
        })
        .catch((error) => this.errorHandle(error, 'error'))
        .finally(() => this.removeLoader('getProductData'));
    },

    getSingleProduct(id) {
      this.createLoader('getSingleProduct');
      axios.get(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          // console.log(res);
          this.product = res.data.product;
          const { imageUrl, imagesUrl } = res.data.product;
          this.displayImages.mainImage = imageUrl;
          this.displayImages.images = [imageUrl];
          if (Array.isArray(imagesUrl)) {
            this.displayImages.images.push(...imagesUrl);
          }
        })
        .catch((error) => this.errorHandle(error, 'error'))
        .finally(() => this.removeLoader('getSingleProduct'));
    },

    changeDisplay(img) { this.displayImages.mainImage = img; },

  },

});
