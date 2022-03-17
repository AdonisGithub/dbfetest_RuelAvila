import {createStore} from 'vuex'
import AuthModule from '@/store/AuthModule'
import UserModule from "@/store/UserModule";
export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        User: UserModule,
        Auth: AuthModule
    }
})

