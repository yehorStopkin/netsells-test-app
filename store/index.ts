import { Scheme } from '../modules/types';

/**
 * State function.
 * 
 * @returns {object}
 */
export const state = () => ({
    scheme: Scheme.LIGHT,
});

export const mutations = {
    /**
     * Set scheme mutation.
     * 
     * @param {any} state 
     * @param {Scheme} scheme 
     */
    setScheme(state: any, scheme: Scheme): void {
        state.scheme = scheme;
    },
};

export const actions = {
    /**
     * Set scheme action.
     * 
     * @param {any} param0 
     * @param {any} scheme 
     */
    setScheme({ commit }: { commit: any }, scheme: Scheme): void {
        commit('setScheme', scheme);
    },
};

export const getters = {
    scheme: (store: any) => store.scheme,
};
