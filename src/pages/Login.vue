<template>
    <div class="login">
        <div fluid class="container-fluid h-100">
            <div class="row m-0 align-items-center justify-content-center h-100">
                <div class="col-lg-3 col-md-4 col-sm-8 col-12">
                    <div class="card">
                        <div
                            class="card-header card-header-primary d-flex flex-wrap align-items-center position-relative"
                        >
                            <div class="content-card-left w-100">
                                <h4 class="card-title text-white">Login</h4>
                                <p class="card-category mb-0">Enter Credentials To Continue</p>
                            </div>
                        </div>
                        <div class="card-body pt-0">
                            <Form
                                class="custom-form mt-2"
                                @submit="submit"
                                @keydown="errors_v.clear($event.target.name)"
                                :validation-schema="schema"
                                v-slot="{ errors }"
                            >
                                <div class="position-relative mb-5">
                                    <Field
                                        type="email"
                                        name="email"
                                        v-model="form.email"
                                        :class="[
                                            form.email == '' ? '' : 'active',
                                            'border-0 position-relative w-100'
                                        ]"
                                    />
                                    <label for="" class="mb-0 placeholder-label"
                                        >Email Address</label
                                    >
                                    <p v-if="errors.email" class="invalid-message mb-0 pt-2">
                                        {{ errors.email }}
                                    </p>
                                </div>
                                <div class="position-relative mb-2">
                                    <Field
                                        :type="this.type"
                                        name="password"
                                        v-model="form.password"
                                        :class="[
                                            form.password == '' ? '' : 'active',
                                            'border-0 position-relative w-100 input-icon'
                                        ]"
                                    />
                                    <label for="" class="mb-0 placeholder-label">password</label>

                                    <p v-if="errors.email" class="invalid-message mb-0 pt-2">
                                        {{ errors.password }}
                                    </p>
                                    <p
                                        v-if="errors_v.has('password')"
                                        class="invalid-message mb-0 pt-2"
                                    >
                                        {{ errors_v.get('password') }}
                                    </p>
                                </div>

                                <div>
                                    <button
                                        class=" btn btn-primary text-center w-100 mt-2 py-2"
                                        :disabled="searchDisabled"
                                    >
                                        <div
                                            v-if="loader"
                                            class="spinner-border me-2"
                                            role="status"
                                        ></div>
                                        LOGIN
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Alert
        v-if="growlMessage"
        :name="alert_m.name"
        :alertHeading="alert_m.heading"
        :alertDescription="alert_m.description"
    >
    </Alert>
</template>

<script>
import '@/assets/scss/pages/_login.scss';
import AuthService from '@/services/AuthService';
import { onMounted, reactive, watch } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Alert from '@/components/alert';
import Errors from '@/utils/Errors';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

export default {
    name: 'Login',
    components: {
        Form,
        Field,
        Alert
    },
    setup() {
        const schema = Yup.object().shape({
            email: Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
        });
        const loader = ref(false);
        const growlMessage = ref(false);
        const type = ref('password');
        const store = useStore();
        const form = reactive({
            email: '',
            password: ''
        });

        const alert_m = reactive({
            name: '',
            heading: '',
            description: ''
        });
        const errors_v = reactive(new Errors());
        const error = null;
        const searchDisabled = ref(false);
        const showPassword = () => {
            if (type.value === 'password') {
                type.value = 'text';
            } else {
                type.value = 'password';
            }
        };

        onMounted(async () => {
            await store.dispatch('Auth/logout');
        });

        const router = useRouter();
        const loaderfun = () => {
            return 0;
        };
        const submit = async () => {
            loader.value = true;
            searchDisabled.value = true;
            const payload = {
                email: form.email,
                password: form.password
            };

            await AuthService.login(payload)
                .then(async response => {
                    const data = await store.dispatch('Auth/getAuthUser');
                    if (data.role.name == 'super_admin') router.push('/accounts');
                    else router.push('/');
                })
                .catch(error => {
                    alert_m.name = 'danger';
                    alert_m.heading = 'Invalid Credentials';
                    alert_m.description = 'Invalid Username or Password';
                    growlMessage.value = true;
                    loader.value = false;
                    searchDisabled.value = false;
                    setTimeout(() => {
                        growlMessage.value = false;
                    }, 5000);
                });
        };
        return {
            schema,
            type,
            form,
            error,
            showPassword,
            submit,
            loaderfun,
            errors_v,
            searchDisabled,
            loader,
            growlMessage,
            alert_m
        };
    }
};
</script>
