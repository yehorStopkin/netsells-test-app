const Vuex = require('vuex');
const { shallowMount, createLocalVue } = require('@vue/test-utils');
const ApplicationStepSelector = require('@/components/application/stepSelector/ApplicationStepSelector').default;

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ApplicationStepSelector', () => {
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
        const wrapper = shallowMount(ApplicationStepSelector, { store, localVue });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
