<template>

<LoadingOverlay v-model:active="isLoading" :z-index="1100"></LoadingOverlay>

<div class="modal modal-lg fade" aria-hidden="true" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" aria-label="Close" @click="hide"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="imageUrl" class="form-label">主圖網址</label>
                            <input type="text" id="imageUrl" class="form-control mb-3"
                                   v-model="product.imageUrl">
                            <img class="mb-3" :src="product.imageUrl" :alt="product.title">
                            <div>
                                <template v-if="showUploadForm">
                                    <form class="card p-3 mb-3"
                                          enctype="multipart/form-data" method="post">
                                    <input type="file" class="form-control"
                                           name="file-to-upload" ref="file">
                                    <div class="text-end mt-3">
                                        <button type="button" class="btn btn-outline-secondary"
                                                @click="upload"
                                                :disabled="Array.isArray(product.imagesUrl) &&
                                                           product.imagesUrl.length == 5">
                                        確認上傳</button>
                                    </div></form>
                                </template>
                            </div>
                            <div class="d-flex gap-2 mb-3">
                                <button type="button" class="w-100 btn btn-warning"
                                        @click="product.imagesUrl.push('')"
                                        :disabled="Array.isArray(product.imagesUrl) &&
                                                   product.imagesUrl.length == 5">
                                新增圖片</button>
                                <button type="button" class="w-100 btn btn-dark"
                                        @click="showUploadForm = !showUploadForm"
                                        :disabled="Array.isArray(product.imagesUrl) &&
                                                   product.imagesUrl.length == 5">
                                上傳圖片</button>
                            </div>
                            <div class="d-flex flex-column gap-3">
                                <div v-for="(img, idx) in product.imagesUrl" :key="img">
                                    <div class="position-relative">
                                        <input type="text" class="form-control pe-5 mb-3"
                                               v-model="product.imagesUrl[idx]">
                                        <button type="button" class="btn border-0 btn-remove"
                                                @click="product.imagesUrl.splice(idx, 1)">
                                        <i class="bi bi-x"></i>
                                        </button>
                                    </div>
                                    <img :src="img" :alt="product.title" v-if="img">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="title" class="form-label">商品名稱</label>
                                <input type="text" id="title" class="form-control"
                                       v-model="product.title">
                            </div>
                            <div class="mb-3">
                                <label for="subtitle" class="form-label">商品別稱</label>
                                <input type="text" id="subtitle" class="form-control"
                                       v-model="product.subtitle">
                            </div>
                            <div class="mb-3">
                                <label for="content" class="form-label">商品規格</label>
                                <input type="text" id="content" class="form-control"
                                       v-model="product.content">
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">商品介紹</label>
                                <textarea id="description" class="form-control" rows="10"
                                          v-model="product.description"></textarea>
                            </div>
                            <div class="mb-3">
                                <div class="row row-cols-2 g-2">
                                    <div class="col">
                                        <label for="category">分類</label>
                                        <input type="text" id="category"
                                               class="form-control" v-model="product.category">
                                    </div>
                                    <div class="col">
                                        <label for="unit">單位</label>
                                        <input type="text" id="unit"
                                               class="form-control" v-model="product.unit">
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="row row-cols-2 g-2">
                                    <div class="col">
                                        <label for="origin_price" class="form-label">原價</label>
                                        <input id="origin_price" type="number" min="1"
                                               class="form-control"
                                               v-model.number="product.origin_price">
                                    </div>
                                    <div class="col">
                                        <label for="price" class="form-label">售價</label>
                                        <input id="price" type="number" min="1"
                                               class="form-control"
                                               v-model.number="product.price">
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <p>
                                商品標籤
                                <button type="button" class="float-end btn btn-sm"
                                        @click="addTag('')">
                                新增標籤</button>
                                </p>
                                <div class="d-flex flex-wrap gap-2 mb-3">
                                    <button type="button" class="badge bg-secondary"
                                            v-for="tag in tags" :key="tag" @click="addTag(tag)">
                                    {{ tag }}</button>
                                </div>
                                <div class="row row-cols-2 g-2 mb-3">
                                    <div class="col position-relative"
                                         v-for="(tag, idx) in product.tags" :key="tag">
                                        <input type="text" class="form-control"
                                               v-model="product.tags[idx]">
                                        <button type="button" class="btn border-0 btn-remove"
                                                @click="removeTag(tag)">
                                        <i class="bi bi-x"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" @click="saveProduct">確認更新</button>
                <button type="button" class="btn btn-secondary" @click="hide">取消</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import axios from 'axios';

import Modal from 'bootstrap/js/dist/modal';

import { mapState, mapActions } from 'pinia';

import loadingStore from '@/stores/loadingStore';
import messageStore from '@/stores/messageStore';
import adminStore from '@/stores/adminStore';

const { VITE_APP_SITE, VITE_APP_PATH } = import.meta.env;

export default {

  props: ['tempProduct'],

  data() {
    return {
      modal: '',
      product: {},
      isLoading: false,
      showUploadForm: false,
    };
  },

  computed: {

    ...mapState(adminStore, ['tags']),
    ...mapState(loadingStore, ['loadingQueue']),

  },

  watch: {

    tempProduct() {
      this.product = this.tempProduct;
      const { imagesUrl, tags } = this.product;
      this.product.tags = Array.isArray(tags) ? [...tags] : [];
      this.product.imagesUrl = Array.isArray(imagesUrl) ? [...imagesUrl] : [];
    },

  },

  methods: {

    ...mapActions(messageStore, ['toastAlert', 'errorHandle']),

    ...mapActions(adminStore, ['createProduct', 'updateProduct']),

    upload() {
      const file = this.$refs.file.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file-to-upload', file);
        this.isLoading = true;
        axios.post(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/upload`, formData)
          .then((res) => {
            // console.log(res);
            this.toastAlert('圖片上傳成功！', 'success');
            this.product.imagesUrl.push(res.data.imageUrl);
            this.$refs.file.files.length = 0;
          })
          .catch((error) => this.errorHandle(error)).finally(() => { this.isLoading = false; });
      } else {
        this.toastAlert('必須選擇檔案才能上傳', 'warning');
      }
    },

    saveProduct() {
      this.product.imagesUrl = this.product.imagesUrl.filter((img) => img);
      this.product.tags = this.product.tags.filter((tag) => tag);
      if (this.product.id) {
        this.updateProduct(this.product, this.hide);
      } else { this.createProduct(this.product, this.hide); }
    },

    show() { this.modal.show(); },
    hide() { this.modal.hide(); },

    addTag(tag) { this.product.tags.push(tag); },

    removeTag(tag) {
      const index = this.product.tags.indexOf(tag);
      this.product.tags.splice(index, 1);
    },

  },

  mounted() {
    this.modal = new Modal(this.$refs.modal, { backdrop: 'static' });
    this.product = this.tempProduct;
  },

};

</script>
