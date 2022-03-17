import { User } from '@/models/user';
import { Commit } from 'vuex';
import router from '@/router';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';

export default {
    namespaced: true,
    state: {
        user: new User(),
        loading: false,
        error: null
    },
    mutations: {
        SET_USER(state: { user: User }, user: User) {
            state.user = user;
        },
        SET_LOADING(state: { loading: any }, loading: any) {
            state.loading = loading;
        },
        SET_ERROR(state: { error: any }, error: any) {
            state.error = error;
        }
    },
    actions: {
        setUser: ({ commit }: { commit: Commit }, user: User) => commit('SET_USER', user),
        logout({ commit }) {
            return AuthService.logout()
                .then(() => {
                    commit('SET_USER', null);
                    router.push({ path: '/' });
                })
                .catch(error => {
                    commit('SET_ERROR', getError(error));
                });
        },
        async getAuthUser({ commit }) {
            commit('SET_LOADING', true);
            try {
                const data = await AuthService.getAuthUser();
                commit('SET_USER', data);
                commit('SET_LOADING', false);
                return data;
            } catch (error) {
                commit('SET_LOADING', false);
                commit('SET_USER', null);
                commit('SET_ERROR', getError(error));
            }
        }
    }
};
