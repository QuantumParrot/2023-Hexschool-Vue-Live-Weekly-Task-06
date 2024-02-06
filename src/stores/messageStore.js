import Swal from 'sweetalert2';

import { defineStore } from 'pinia';

export default defineStore('messageStore', {

  actions: {

    modalAlert(config) {
      const { title, text, icon } = config;
      Swal.fire({
        title,
        icon,
        text: text || '',
        confirmButtonColor: '#dc3545',
      });
    },

    toastAlert(text, icon) {
      Swal.fire({
        icon,
        text,
        showConfirmButton: false,
        toast: true,
        timer: 1500,
        position: 'center',
      });
    },

    errorHandle(error, icon = 'warning') {
      console.log(error);
      if (error.code === 'ERR_NETWORK') {
        this.modalAlert({ title: '網路連線異常，請重新確認連線狀態後再嘗試', icon: 'error' });
      } else if (error.response) {
        this.toastAlert(error.response.data.message, icon);
      }
    },

  },

});
