import axios from 'axios';
import Swal from 'sweetalert2';

import { defineStore, mapActions } from 'pinia';

import loadingStore from './loadingStore';
import messageStore from './messageStore';

const { VITE_APP_SITE, VITE_APP_PATH } = import.meta.env;

export default defineStore('adminStore', {

  state: () => ({
    products: [],
    orders: [],
  }),

  getters: {
    tags: ({ products }) => {
      const tags = [];
      products.forEach((item) => Array.isArray(item.tags) && item.tags.forEach((tag) => {
        const isRepeated = tags.find((i) => i === tag);
        if (!isRepeated) { tags.push(tag); }
      }));
      return tags;
    },
  },

  actions: {

    ...mapActions(loadingStore, ['createLoader', 'removeLoader']),

    ...mapActions(messageStore, ['toastAlert', 'errorHandle']),

    login(data, { resetForm }) {
      // console.log(data);
      this.createLoader('login');
      axios.post(`${VITE_APP_SITE}/admin/signin`, data)
        .then((res) => {
          // console.log(res);
          const { expired, message, token } = res.data;
          document.cookie = `hexVueToken=${token}; expires=${new Date(expired)}`;
          this.toastAlert(message, 'success');
          setTimeout(() => {
            resetForm();
            this.router.replace('/admin');
          }, 1500);
        })
        .catch((error) => this.errorHandle(error, 'error'))
        .finally(() => this.removeLoader('login'));
    },

    checkLogin(path) {
      const token = document.cookie.split('; ').find((row) => row.startsWith('hexVueToken='))?.split('=')[1];
      // console.log(token);
      if (token) {
        this.createLoader('checkLogin');
        axios.defaults.headers.common.Authorization = token;
        axios.post(`${VITE_APP_SITE}/api/user/check`)
          .then(() => {
            if (path === 'admin-products') {
              this.getProducts();
            } else if (path === 'admin-orders') {
              this.getOrders();
            } else { this.router.replace('/admin/products'); }
          })
          .catch((error) => {
            if (path !== '/admin-login') {
              this.errorHandle(error, 'error');
              this.router.replace('/admin-login');
            }
          })
          .finally(() => this.removeLoader('checkLogin'));
      } else {
        this.router.push('/admin-login');
      }
    },

    getProducts() {
      this.createLoader('getAdminProducts');
      axios.get(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/products/all`)
        .then((res) => {
          // console.log(res);
          this.products = Object.values(res.data.products);
        })
        .catch((error) => this.errorHandle(error))
        .finally(() => this.removeLoader('getAdminProducts'));
    },

    switchProductStatus(item) {
      this.createLoader('switchProductStatus');
      const current = item.is_enabled;
      axios.put(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/product/${item.id}`, {
        data: { ...item, is_enabled: !item.is_enabled },
      }).then(() => {
        this.toastAlert(current ? '成功下架' : '成功上架', 'success');
        this.getProducts();
      }).catch((error) => this.errorHandle(error)).finally(() => this.removeLoader('switchProductStatus'));
    },

    deleteProduct(id) {
      Swal.fire({
        title: '確定刪除商品？',
        text: '此操作無法復原，你要確定喔！',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          this.createLoader('deleteProduct');
          axios.delete(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/product/${id}`).then(() => {
            // console.log(res);
            this.toastAlert('我們懷念它 (´;ω;`)', 'success');
            this.getProducts();
          }).catch((error) => this.errorHandle(error)).finally(() => this.removeLoader('deleteProduct'));
        }
      });
    },

    createProduct(data, hideModal) {
      this.createLoader('createProduct');
      axios.post(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/product`, { data })
        .then((res) => {
          // console.log(res);
          this.toastAlert(res.data.message, 'success');
          hideModal();
          this.getProducts();
        })
        .catch((error) => this.errorHandle(error))
        .finally(() => this.removeLoader('createProduct'));
    },

    updateProduct(data, hideModal) {
      this.createLoader('updateProduct');
      axios.put(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/product/${data.id}`, { data })
        .then((res) => {
          // console.log(res);
          this.toastAlert(res.data.message, 'success');
          hideModal();
          this.getProducts();
        })
        .catch((error) => this.errorHandle(error))
        .finally(() => this.removeLoader('updateProduct'));
    },

    getOrders() {
      this.createLoader('getAdminOrders');
      axios.get(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/orders`)
        .then((res) => {
          // console.log(res);
          this.orders = res.data.orders;
        })
        .catch((error) => this.errorHandle(error))
        .finally(() => this.removeLoader('getAdminOrders'));
    },

    deleteOrder(id) {
      Swal.fire({
        title: '你確定要蛋雕 ... 刪除訂單！？',
        text: '此操作無法復原，客戶的信任也是，你要確定欸！',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          this.createLoader('deleteOrder');
          axios.delete(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/order/${id}`).then((res) => {
            // console.log(res);
            this.toastAlert(res.data.message, 'success');
            this.getOrders();
          }).catch((error) => this.errorHandle(error)).finally(() => this.removeLoader('deleteOrder'));
        }
      });
    },

  },

});
