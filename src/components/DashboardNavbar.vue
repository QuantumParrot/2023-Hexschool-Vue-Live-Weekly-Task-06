<template>

<nav class="navbar navbar-expand-lg bg-body-tertiary py-4 sticky-top">
    <div class="container-fluid">
        <h2 class="fs-4 fw-bold me-4 mb-0">後台管理</h2>
        <div class="navbar-collapse">
            <div class="navbar-nav gap-2">
                <RouterLink class="nav-link" to="/admin/products">商品管理</RouterLink>
                <RouterLink class="nav-link" to="/admin/orders">訂單管理</RouterLink>
            </div>
        </div>
        <RouterLink class="nav-link" to="/">回到前台</RouterLink>
    </div>
</nav>

</template>
