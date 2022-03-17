<template>
    <div class="inner-content">
        <section>
            <div class="container-fluid">
                <div class="row m-0">
                    <div class="col-12">
                        <div class="card">
                            <div
                                class="card-header card-header-primary d-flex flex-wrap align-items-center position-relative"
                            >
                                <div class="content-card-left">
                                    <h4 class="card-title text-white">Accounts</h4>
                                    <p class="card-category mb-0">
                                        Here you can manage All Accounts
                                    </p>
                                </div>
                                <div class="content-card-right ms-auto">
                                    <a
                                        href="#edit"
                                        data-bs-toggle="modal"
                                        data-bs-target="#add"
                                        @click.prevent
                                        class="btn btn-add d-flex flex-wrap align-items-center justify-content-center rounded-circle"
                                    >
                                        <i class="bi bi-plus-square-fill text-white"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="header-content">
                                    <div class="table-responsive mb-0">
                                        <table id="my-table" class="custom-table shop-table">
                                            <thead>
                                                <tr>
                                                    <th class="text-capitalize">Id</th>
                                                    <th class="text-capitalize">Name</th>
                                                    <th class="text-capitalize">Number</th>
                                                    <th class="text-capitalize">Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="shop in shops" :key="shop.id">
                                                    <td>{{ shop.id }}</td>
                                                    <td>{{ shop.name }}</td>
                                                    <td>{{ shop.number }}</td>

                                                    <td>{{ shop.balance }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="card-footer card-footer custom-pagination d-flex flex-wrap justify-content-between m-0 px-4 pb-0 border-0 bg-transparent"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <account-add-modal @alert-event="showGrowl"></account-add-modal>

    <Alert
        v-if="growlMessage"
        :name="alert_m.name"
        :alertHeading="alert_m.heading"
        :alertDescription="alert_m.description"
    >
    </Alert>
</template>

<script>
import '@/assets/scss/pages/shop.scss';
import accountServices from '@/services/AccountServices';
import { onMounted, ref, reactive } from 'vue';
import Alert from '@/components/alert';

import AccountAddModal from '@/components/modals/AccountAddModal.vue';

export default {
    name: 'Accounts',
    components: {
        AccountAddModal,
        Alert
    },
    setup() {
        const shops = ref([]);

        const alert_m = reactive({
            name: '',
            heading: '',
            description: ''
        });
        const growlMessage = ref(false);
        const loadData = async () => {
            await accountServices.getAllAccounts().then(response => {
                shops.value = response.data.data;
                console.log(shops.value);
            });
        };
        const showGrowl = alertType => {
            if (alertType == 'add') {
                alert_m.name = 'success';
                alert_m.description = 'Record Added Successfully';
            } else {
                alert_m.name = 'danger';
                alert_m.description = 'No Record Found. Please try with valid data';
            }

            alert_m.heading = 'Account';
            growlMessage.value = true;
            setTimeout(() => {
                growlMessage.value = false;
            }, 5000);
        };

        onMounted(() => {
            loadData();
        });

        return {
            shops,
            loadData,
            showGrowl,
            alert_m,
            growlMessage
        };
    }
};
</script>
