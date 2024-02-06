export default {

  data() {
    return {
      messageConfig: {
        username: '帳號',
        password: '密碼',
        name: '名字',
        address: '地址',
        email: '信箱',
        tel: '電話',
      },
    };
  },

  methods: {

    localizeMessage(msg, type) { return msg.replace(/^\w+\s/i, this.messageConfig[type]); },

    tel(value) {
      if (!value) { return '電話為必填'; }
      if (!/^09\d{8}$/.test(value)) { return '電話須填寫國內的行動電話號碼'; }
      return true;
    },

  },

};
