import axios from 'axios';
import Swal from 'sweetalert2';

import { defineStore, mapActions } from 'pinia';

import loadingStore from './loadingStore';
import messageStore from './messageStore';

const { VITE_APP_SITE, VITE_APP_PATH } = import.meta.env;

export default defineStore('cartStore', {

  state: () => ({ carts: [], total: 0 }),

  actions: {

    ...mapActions(loadingStore, ['createLoader', 'removeLoader']),

    ...mapActions(messageStore, ['toastAlert', 'errorHandle']),

    getCartsData() {
      this.createLoader('getCartsData');
      axios.get(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          const { carts, total } = res.data.data;
          this.carts = carts;
          this.total = total;
        })
        .catch((error) => this.errorHandle(error, 'error'))
        .finally(() => this.removeLoader('getCartsData'));
    },

    addToCart(productId, qty = 1) {
      const isInCart = this.carts.find((item) => item.product.id === productId);
      if (isInCart) {
        let newQty = isInCart.qty;
        this.changeCartQty(isInCart, newQty += qty);
      } else {
        this.createLoader('addToCart');
        axios.post(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/cart`, { data: { product_id: productId, qty } })
          .then((res) => {
            this.toastAlert(res.data.message, 'success');
            this.getCartsData();
          })
          .catch((error) => this.errorHandle(error))
          .finally(() => this.removeLoader('addToCart'));
      }
    },

    changeCartQty(item, qty) {
      this.createLoader('changeCartQty');
      const newQty = qty * 1;
      axios.put(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/cart/${item.id}`, { data: { product_id: item.product.id, qty: newQty } })
        .then((res) => {
          // console.log(res);
          this.toastAlert(res.data.message, 'success');
          this.getCartsData();
        })
        .catch((error) => this.errorHandle(error))
        .finally(() => this.removeLoader('changeCartQty'));
    },

    deleteCartItem(id) {
      this.createLoader('deleteCartItem');
      axios.delete(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/cart/${id}`)
        .then((res) => {
          this.toastAlert(res.data.message, 'success');
          this.getCartsData();
        })
        .catch((error) => this.errorHandle(error))
        .finally(() => this.removeLoader('deleteCartItem'));
    },

    deletAllCart() {
      Swal.fire({
        title: '確定清空購物車的商品嗎？',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          this.createLoader('deleteAllCart');
          axios.delete(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/carts`).then((res) => {
            // console.log(res);
            this.toastAlert(res.data.message, 'success');
            this.getCartsData();
          }).catch((error) => this.errorHandle(error)).finally(() => this.removeLoader('deleteAllCart'));
        }
      });
    },

  },

});
