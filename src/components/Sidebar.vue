<template>
    <aside class="sidebar position-fixed">
        <div class="logo position-relative">
            <p class="text-center mb-0 text-uppercase">Demo</p>
        </div>
        <div class="sidelinks-wrapper">
            <ul class="list-unstyled p-0">
                <li>
                    <router-link to="/accounts" class="d-flex flex-wrap align-items-center">
                        <i class="bi bi-shop position-relative"></i>
                        <p class="mb-0">Accounts</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>
<script>
import '@/assets/scss/layout/_sidebar.scss';

export default {
    name: 'Sidebar'
};
</script>
