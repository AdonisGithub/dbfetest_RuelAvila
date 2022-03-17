import axios from 'axios';
import store from '@/store';

export const authClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL
    //withCredentials: true // required to handle the CSRF token
});

/*
 * Add a response interceptor
 */
authClient.interceptors.response.use(
    response => {
        return response;
    },
    function(error) {
        if (
            error.response &&
            [401, 419].includes(error.response.status) &&
            store.getters['auth/authUser'] &&
            !store.getters['auth/guest']
        ) {
            console.log('this is error man');
            console.log(error);
            store.dispatch('auth/logout');
        }
        return Promise.reject(error);
    }
);

export default {
    async login(payload) {
        if (payload.email === 'adilbingulzar@gmail.com' && payload.password === '123456') {
            const d = new Date();
            d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
            const expires = 'expires=' + d.toUTCString();
            document.cookie = 'is_login=true;' + expires + ';path=/';
            return { is_login: true };
        } else {
            throw Error('Invalid credentials');
        }
    },

    async logout() {
        document.cookie = 'is_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    },
    async getAuthUser() {
        const name = 'is_login=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return {
                    id: 2,
                    name: 'ADil',
                    email: 'adilbingulzar@gmail.com',
                    role: { id: 2, name: 'super_admin' }
                };
            }
        }
        return '';
    }
};
