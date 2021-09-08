const Vuex = require('vuex');
const { shallowMount, createLocalVue } = require('@vue/test-utils');
const StyleMixin = require('@/components/application/mixins/StyleMixin').default;

const localVue = createLocalVue();
localVue.use(Vuex);

describe('StyleMixin', () => {
    let actions;
    let getters;
    let store;

    beforeEach(() => {
        actions = {
            setScheme: jest.fn(),
            setPhase: jest.fn(),
            'application/setPhase': jest.fn(),
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
        const wrapper = shallowMount(StyleMixin, { store, localVue });
        expect(wrapper.exists()).toBeTruthy();
    });

    test('check backgroundClass for WELCOME phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 0 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.backgroundClass).toBe('start');
    });

    test('check backgroundClass for STEP_SELECTING phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 1 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.backgroundClass).toBe('common');
    });

    test('check backgroundClass for FORM_FILING phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 2 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.backgroundClass).toBe('common');
    });

    test('check backgroundClass for SUCCESS phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 3 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.backgroundClass).toBe('success');
    });

    test('check currentComponent for WELCOME phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 0 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.currentComponent).toBe('the-welcome');
    });

    test('check currentComponent for STEP_SELECTING phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 1 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.currentComponent).toBe('application-step-selector');
    });

    test('check currentComponent for FORM_FILING phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 2 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.currentComponent).toBe('the-welcome');
    });

    test('check currentComponent for SUCCESS phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 3 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.currentComponent).toBe('the-success');
    });

    test('check currentComponentMarginTop for WELCOME phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 0 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.currentComponentMarginTop).toBe(220);
    });

    test('check currentComponentMarginTop for STEP_SELECTING phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 1 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.currentComponentMarginTop).toBe(85);
    });

    test('check currentComponentMarginTop for FORM_FILING phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 2 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.currentComponentMarginTop).toBe(80);
    });

    test('check currentComponentMarginTop for SUCCESS phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 3 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.currentComponentMarginTop).toBe(300);
    });

    test('check componentStyleObject ', () => {
        const wrapper = shallowMount(StyleMixin, { store, localVue });

        expect(JSON.stringify(wrapper.vm.componentStyleObject)).toBe(JSON.stringify({ marginTop: `${ wrapper.vm.currentComponentMarginTop }px`}));
    });

    test('check isFormFillingPhase on WELCOME phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 0 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.isFormFillingPhase).toBe(false);
    });

    test('check isFormFillingPhase on FORM_FILING phase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 2 } });
        const wrapper = shallowMount(StyleMixin, { store: updatedStore, localVue });

        expect(wrapper.vm.isFormFillingPhase).toBe(true);
    });

});
