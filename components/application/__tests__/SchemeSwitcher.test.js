const Vuex = require('vuex');
const { shallowMount, createLocalVue } = require('@vue/test-utils');
const SchemeSwitcher = require('@/components/application/SchemeSwitcher').default;

const localVue = createLocalVue();
localVue.use(Vuex);

describe('SchemeSwitcher', () => {
    let actions;
    let getters;
    let store;

    beforeEach(() => {
        actions = {
            setScheme: jest.fn(),
        };
        getters = {
            scheme: () => 0,
        };
        store = new Vuex.Store({
            actions, getters, 
        });
    });

    test('component default', () => {
        const wrapper = shallowMount(SchemeSwitcher, { store, localVue });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
