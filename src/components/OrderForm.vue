<template>

<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="mb-4">填寫寄送資訊</h3>
            <div class="alert bg-secondary-subtle px-4">
                <span class="text-danger me-2">*</span>為必填欄位哦！
            </div>
            <VForm class="card p-4" v-slot="{ errors }" @submit="submitOrder">
                <div class="mb-3">
                    <label for="name" class="form-label">
                        <span class="text-danger fst-italic me-1">*</span>
                        您的大名</label>
                    <VField
                        type="text" id="name"
                        class="form-control mb-2" :class="{ 'is-invalid': errors['name'] }"
                        name="name" rules="required">
                    </VField>
                    <ErrorMessage name="name" v-slot="{ message }">
                        <p class="invalid-feedback">{{ localizeMessage(message, 'name') }}</p>
                    </ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">
                        <span class="text-danger fst-italic me-1">*</span>
                        電子信箱</label>
                    <VField
                        type="email" id="email"
                        class="form-control mb-2" :class="{ 'is-invalid': errors['email'] }"
                        name="email" rules="required|email">
                    </VField>
                    <ErrorMessage name="email" v-slot="{ message }">
                        <p class="invalid-feedback">{{ localizeMessage(message, 'email') }}</p>
                    </ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="tel" class="form-label">
                        <span class="text-danger fst-italic me-1">*</span>
                        您的手機</label>
                    <VField
                        type="tel" id="tel"
                        class="form-control mb-2" :class="{ 'is-invalid': errors['tel'] }"
                        name="tel" :rules="tel">
                    </VField>
                    <ErrorMessage name="tel" v-slot="{ message }">
                        <p class="invalid-feedback">{{ localizeMessage(message, 'tel') }}</p>
                    </ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">
                        <span class="text-danger fst-italic me-1">*</span>
                        寄送地址</label>
                    <VField
                        type="text" id="address"
                        class="form-control mb-2" :class="{ 'is-invalid': errors['address'] }"
                        name="address" rules="required">
                    </VField>
                    <ErrorMessage name="address" v-slot="{ message }">
                        <p class="invalid-feedback">{{ localizeMessage(message, 'address') }}</p>
                    </ErrorMessage>
                </div>
                <div class="mb-3">
                    <label for="project" class="form-label">選擇要贊助的專案（ 我們會將收入的 20% 投注於此！ ）</label>
                    <VField
                        id="project"
                        class="form-select mb-2" value=""
                        name="project" as="select">
                        <option value="" selected>不指定</option>
                        <option value="偏鄉小學移動圖書館">偏鄉小學行動圖書館</option>
                        <option value="獨居老人關懷計畫">獨居老人關懷計畫</option>
                        <option value="野生動物救援行動">野生動物救援行動</option>
                    </VField>
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">備註與留言</label>
                    <VField
                        id="message"
                        class="form-control mb-2" rows="5"
                        name="message" as="textarea"></VField>
                </div>
                <button type="submit" class="btn btn-secondary" :disabled="!carts.length">
                確定送出</button>
            </VForm>
        </div>
    </div>
</div>

</template>

<script>

// mixins

import validation from '@/mixins/validation';

// pinia

import { mapState, mapActions } from 'pinia';

import orderStore from '@/stores/orderStore';
import cartStore from '@/stores/cartStore';

export default {

  mixins: [validation],

  computed: {

    ...mapState(cartStore, ['carts']),

  },

  methods: {

    ...mapActions(orderStore, ['submitOrder']),

  },

};

</script>
