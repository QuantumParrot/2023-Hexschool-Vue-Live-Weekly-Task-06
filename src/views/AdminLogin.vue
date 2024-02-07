<template>

<LoadingOverlay v-model:active="isLoading" :z-index="1000"></LoadingOverlay>

<div class="container my-5 py-5 h-100">
    <div class="row justify-content-center align-items-center h-100">
        <div class="col-md-6">
            <div class="card p-5 border-0 shadow">
                <VForm v-slot="{ errors }" @submit="login">
                    <h2 class="text-center fw-bolder mb-5">管理員登入</h2>
                    <div class="mb-3">
                        <label for="username" class="form-label">帳號</label>
                        <VField
                            type="email" id="username" class="form-control mb-2"
                            :class="{ 'is-invalid': errors['username'] }"
                            name="username" rules="required|email"
                        ></VField>
                        <ErrorMessage name="username" v-slot="{ message }">
                            <p class="invalid-feedback">
                            {{ localizeMessage(message, 'username') }}
                            </p>
                        </ErrorMessage>
                    </div>
                    <div class="position-relative mb-5">
                        <label for="password" class="form-label">密碼</label>
                        <VField
                            :type="isPwdVisible ? 'text' : 'password'" id="password"
                            class="form-control mb-2" :class="{ 'is-invalid': errors['password'] }"
                            name="password" rules="required"
                        ></VField>
                        <button type="button" class="btn border-0 btn-pwd-display"
                                v-show="!errors['password']" @click="isPwdVisible = !isPwdVisible">
                          <i class="bi" :class="isPwdVisible ? 'bi-eye' : 'bi-eye-slash'"></i>
                        </button>
                        <ErrorMessage name="password" v-slot="{ message }">
                            <p class="invalid-feedback">
                            {{ localizeMessage(message, 'password') }}
                            </p>
                        </ErrorMessage>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-secondary px-4 py-2">登入</button>
                    </div>
                </VForm>
            </div>
        </div>
    </div>
</div>

</template>

<script>

// mixins

import validation from '@/mixins/validation';

// pinia

import { mapActions, mapState } from 'pinia';

import loadingStore from '@/stores/loadingStore';
import adminStore from '@/stores/adminStore';

export default {

  mixins: [validation],

  data() {
    return {
      isPwdVisible: false,
    };
  },

  computed: {

    ...mapState(loadingStore, ['isLoading']),

  },

  methods: {

    ...mapActions(adminStore, ['login', 'checkLogin']),

  },

  mounted() { this.checkLogin(this.$route.name); },

};

</script>
