import { ActionTree } from "vuex";
import jwt_decode from "jwt-decode";

const actions: ActionTree<any, any> = {
    async setUser({state, commit}, user: any) {
        const decoded = jwt_decode(user);
        console.log('decoded>>>>>>>>>>>>>', decoded);
        commit("SET_USER", user);
    }

}

export default actions;