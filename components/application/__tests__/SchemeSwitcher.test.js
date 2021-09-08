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

    test('dark badge displayed in case dark scheme is selected', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, scheme: () => 1 } });
        const wrapper = shallowMount(SchemeSwitcher, { localVue, store: updatedStore });

        const darkBadge = wrapper.find('.scheme-switcher__icon-moon-badge');
        expect(darkBadge.exists()).toBeTruthy();

        const alternativeDarkImage = wrapper.find('*[data-test-id="moonImage"]');
        expect(alternativeDarkImage.exists()).toBeFalsy();

        const lightBadge = wrapper.find('.scheme-switcher__icon-sun-badge');
        expect(lightBadge.exists()).toBeFalsy();

        const alternativeSunImage = wrapper.find('*[data-test-id="sunImage"]');
        expect(alternativeSunImage.exists()).toBeTruthy();
    });

    test('light badge displayed in case light scheme is selected', () => {
        const wrapper = shallowMount(SchemeSwitcher, { localVue, store });

        const alternativeSunImage = wrapper.find('*[data-test-id="sunImage"]');
        expect(alternativeSunImage.exists()).toBeFalsy();

        const darkBadge = wrapper.find('.scheme-switcher__icon-moon-badge');
        expect(darkBadge.exists()).toBeFalsy();

        const alternativeDarkImage = wrapper.find('*[data-test-id="moonImage"]');
        expect(alternativeDarkImage.exists()).toBeTruthy();

        const lightBadge = wrapper.find('.scheme-switcher__icon-sun-badge');
        expect(lightBadge.exists()).toBeTruthy();
    });

    test('when dark scheme selected', () => {
        const wrapper = shallowMount(SchemeSwitcher, { localVue, store });
        const darkElementSelector = wrapper.find('*[data-test-id="darkThemeSwitcher"]');

        darkElementSelector.trigger('click');

        expect(actions.setScheme).toHaveBeenCalledTimes(1);
        expect(actions.setScheme.mock.calls[0][1]).toBe(1);
    });

    test('when light scheme selected', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, scheme: () => 1 } });
        const wrapper = shallowMount(SchemeSwitcher, { localVue, store: updatedStore });
        const lightElementSelector = wrapper.find('*[data-test-id="lightThemeSwitcher"]');

        lightElementSelector.trigger('click');

        expect(actions.setScheme).toHaveBeenCalledTimes(1);
        expect(actions.setScheme.mock.calls[0][1]).toBe(0);
    });

    test('when same theme selected', () => {
        const wrapper = shallowMount(SchemeSwitcher, { localVue, store });
        const lightElementSelector = wrapper.find('*[data-test-id="lightThemeSwitcher"]');

        lightElementSelector.trigger('click');

        expect(actions.setScheme).toHaveBeenCalledTimes(0);
    });
});
