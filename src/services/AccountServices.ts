import * as API from '@/services/API';

export default {
    getAllAccounts() {
        const data = {};
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + process.env.VUE_APP_API_KEY
        };
        return API.apiClient.post('/accounts/search', data, {
            headers: headers
        });
    },

    async insertAccount(payload) {
        const data = {
            data: {
                name: payload.account_name
            }
        };
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + process.env.VUE_APP_API_KEY
        };
        return API.apiClient.post('/accounts', data, {
            headers: headers
        });
    }
};
