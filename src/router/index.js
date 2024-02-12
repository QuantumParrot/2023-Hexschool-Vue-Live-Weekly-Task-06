import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('../views/IndexView.vue'),
        },
        {
          path: 'products',
          name: 'front-products',
          component: () => import('../views/ProductsListView.vue'),
        },
        {
          path: 'product/:id',
          name: 'front-product',
          component: () => import('../views/ProductView.vue'),
        },
        {
          path: 'carts',
          name: 'front-carts',
          component: () => import('../views/CartsListView.vue'),
        },
        {
          path: 'admin-login',
          name: 'admin-login',
          component: () => import('../views/AdminLogin.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminView.vue'),
      children: [
        {
          path: '',
          redirect: {
            name: 'admin-products',
          },
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/admin/AdminProductsView.vue'),
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/admin/AdminOrdersView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ],
  scrollBehavior() { return { top: 0 }; },
  linkExactActiveClass: 'active',
});

export default router;
