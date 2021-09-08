const Vuex = require('vuex');
const { shallowMount, createLocalVue } = require('@vue/test-utils');
const TheApplication = require('@/components/application/TheApplication').default;

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TheApplication', () => {
    let actions;
    let getters;
    let store;

    beforeEach(() => {
        actions = {
            setScheme: jest.fn(),
        };
        getters = {
            scheme: () => 0,
            'application/phase': () => 0,
        };
        store = new Vuex.Store({
            actions, getters, 
        });
    });

    test('component default', () => {
        const wrapper = shallowMount(TheApplication, { store, localVue });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
