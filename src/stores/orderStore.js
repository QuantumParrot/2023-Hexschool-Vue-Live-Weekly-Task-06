import axios from 'axios';
import Swal from 'sweetalert2';

import { defineStore, mapActions } from 'pinia';

import loadingStore from './loadingStore';
import messageStore from './messageStore';
import cartStore from './cartStore';

const { VITE_APP_SITE, VITE_APP_PATH } = import.meta.env;

export default defineStore('orderStore', {

  state: () => ({ showForm: false }),

  actions: {

    ...mapActions(loadingStore, ['createLoader', 'removeLoader']),

    ...mapActions(messageStore, ['toastAlert', 'errorHandle']),

    ...mapActions(cartStore, ['getCartsData']),

    displayForm() { this.showForm = true; },

    submitOrder(data, { resetForm }) {
      Swal.fire({
        title: '確定送出訂單？',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          this.createLoader('submitOrder');
          const newData = {
            user: {
              name: data.name,
              address: data.address,
              tel: data.tel,
              email: data.email,
            },
            message: data.message || '無',
          };
          axios.post(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/order`, { data: newData })
            .then((res) => {
              // console.log(res);
              resetForm();
              this.toastAlert(`${res.data.message}，感謝您的訂購！`, 'success');
              this.getCartsData();
            })
            .catch((error) => this.errorHandle(error, 'error'))
            .finally(() => this.removeLoader('submitOrder'));
        }
      });
    },

  },

});
