import { Phase } from '../modules/types';

/**
 * State function.
 * 
 * @returns {object}
 */
export const state = () => ({
    phase: Phase.WELCOME,
});

export const mutations = {
    /**
     * Set phase mutation.
     * 
     * @param {any} state 
     * @param {Phase} phase 
     */
    setPhase(state: any, phase: Phase): void {
        state.phase = phase;
    },
};

export const actions = {
    /**
     * Set phase action.
     * 
     * @param {any} param0 
     * @param {Phase} phase 
     */
    setPhase({ commit }: { commit: any }, phase: Phase): void {
        commit('setPhase', phase);
    },
};

export const getters = {
    phase: (store: any) => store.phase,
};
