<template>
    <!-- modal start -->
    <!-- Edit Modal -->
    <div
        class="modal fade p-0"
        id="add"
        tabindex="-1"
        aria-labelledby="editLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="d-flex flex-wrap w-100 position-relative event-auto">
                <div class="card shadow-none">
                    <div
                        class="card-header card-header-primary d-flex flex-wrap align-items-center position-relative"
                    >
                        <div class="content-card-left w-100">
                            <h4 class="card-title text-white">Add Account</h4>
                            <p class="card-category mb-0">Here you can add New account</p>
                        </div>
                    </div>
                    <div class="card-body">
                        <Form
                            class="custom-form mt-2"
                            @submit="doSubmit"
                            @keydown="errors_v.clear($event.target.name)"
                            :validation-schema="schema"
                            v-slot="{ errors }"
                        >
                            <div class="position-relative mb-5">
                                <Field
                                    type="text"
                                    name="account_name"
                                    :class="[
                                        form.account_name == '' ? '' : 'active',
                                        'border-0 position-relative w-100'
                                    ]"
                                    v-model="form.account_name"
                                />
                                <label for="" class="mb-0 placeholder-label">Account Name</label>
                                <p v-if="errors.account_name" class="invalid-message mb-0 pt-2">
                                    {{ errors.account_name }}
                                </p>
                                <p
                                    v-if="errors_v.get('account_name')"
                                    class="invalid-message mb-0 pt-2"
                                >
                                    {{ errors_v.get('account_name') }}
                                </p>
                            </div>

                            <div class="card-footer px-4 pb-0 border-0 bg-transparent mb-3">
                                <button class="btn btn-primary w-100" :disabled="searchDisabled">
                                    <div
                                        v-if="loader"
                                        class="spinner-border me-2"
                                        role="status"
                                    ></div>
                                    Add Account
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal end -->
</template>

<script>
import { ref, reactive } from 'vue';
import Errors from '@/utils/Errors';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import AccountServices from '@/services/AccountServices';

export default {
    components: {
        Form,
        Field
    },

    setup(props, { emit }) {
        const loader = ref(false);
        const searchDisabled = ref(false);

        const initialState = {
            account_name: ''
        };

        const form = reactive({ ...initialState });

        const schema = Yup.object().shape({
            account_name: Yup.string().required('Name is required')
        });

        const errors_v = reactive(new Errors());
        function resetForm() {
            Object.assign(form, initialState);
        }
        const doSubmit = async (values, actions) => {
            loader.value = true;
            searchDisabled.value = true;
            const payload = {
                account_name: form.account_name
            };

            await AccountServices.insertAccount(payload)
                .then(async response => {
                    const myModalEl = document.getElementById('add');
                    const modal = window.bootstrap.Modal.getInstance(myModalEl);
                    modal.hide();
                    resetForm();
                    emit('alertEvent', 'add');
                    loader.value = false;
                    searchDisabled.value = false;
                    //this.$refs.obs.reset();
                    actions.resetForm();
                })
                .catch(error => {
                    loader.value = false;
                    searchDisabled.value = false;
                    if (error.response.status == 422) {
                        errors_v.record(error.response.data.errors);
                    }
                });
        };
        return {
            schema,
            form,
            doSubmit,
            errors_v,
            resetForm,
            loader,
            searchDisabled
        };
    }
};
</script>
