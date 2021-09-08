const Vuex = require('vuex');
const { shallowMount, createLocalVue } = require('@vue/test-utils');
const TheApplication = require('@/components/application/TheApplication').default;
const { getDefaultApplicationForm } = require('@/components/application/types/index');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TheApplication', () => {
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
        const wrapper = shallowMount(TheApplication, { store, localVue });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const rootElement = wrapper.findAll('.the-application');
        expect(rootElement.length === 1).toBeTruthy();

        const applicationHeader = wrapper.findAll('*[data-test-id="application-header"]');
        expect(applicationHeader.length === 1).toBeTruthy();

        const componentWrapper = wrapper.findAll('.the-application__component');
        expect(componentWrapper.length === 1).toBeTruthy();

        const formHolder = wrapper.findAll('*[data-test-id="form-holder"]');
        expect(formHolder.length === 0).toBeTruthy();

        const dynamicComponent = wrapper.findAll('*[data-test-id="dynamic-component"]');
        expect(dynamicComponent.length === 1).toBeTruthy();
    });

    test('light class exists with light scheme', () => {
        const wrapper = shallowMount(TheApplication, { store, localVue });
        const rootElement = wrapper.find('.the-application');
        expect(rootElement.classes().includes('light')).toBeTruthy();
    });

    test('dark class does not exist with light scheme', () => {
        const wrapper = shallowMount(TheApplication, { store, localVue });
        const rootElement = wrapper.find('.the-application');
        expect(!rootElement.classes().includes('dark')).toBeTruthy();
    });

    test('dark class exists with dark scheme', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, scheme: () => 1 } });
        const wrapper = shallowMount(TheApplication, { store: updatedStore, localVue });
        const rootElement = wrapper.find('.the-application');
        expect(rootElement.classes().includes('dark')).toBeTruthy();
    });

    test('dark class does not exist with light scheme', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, scheme: () => 1 } });
        const wrapper = shallowMount(TheApplication, { store: updatedStore, localVue });
        const rootElement = wrapper.find('.the-application');
        expect(!rootElement.classes().includes('light')).toBeTruthy();
    });

    test('form-holder does not exist without FillingPhase', () => {
        const wrapper = shallowMount(TheApplication, { store, localVue });
        const formHolder = wrapper.findAll('*[data-test-id="form-holder"]');
        expect(formHolder.length === 0).toBeTruthy();
    });

    test('dynamic-component exists without FillingPhase', () => {
        const wrapper = shallowMount(TheApplication, { store, localVue });
        const dynamicComponent = wrapper.findAll('*[data-test-id="dynamic-component"]');
        expect(dynamicComponent.length === 1).toBeTruthy();
    });

    test('dynamic-component does not exist with FillingPhase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 2 } });
        const wrapper = shallowMount(TheApplication, { store: updatedStore, localVue });
        const dynamicComponent = wrapper.findAll('*[data-test-id="dynamic-component"]');
        expect(dynamicComponent.length === 0).toBeTruthy();
    });

    test('form-holder exists with FillingPhase', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 2 } });
        const wrapper = shallowMount(TheApplication, { store: updatedStore, localVue });
        const formHolder = wrapper.findAll('*[data-test-id="form-holder"]');
        expect(formHolder.length === 1).toBeTruthy();
    });

    test('starter emit change phase to 1', () => {
        const wrapper = shallowMount(TheApplication, { store, localVue });
        wrapper.vm.$emit('started');
        expect(wrapper.emitted().started).toBeTruthy();
        wrapper.vm.onStart();
        expect(actions['application/setPhase']).toHaveBeenCalledTimes(1);
        expect(actions['application/setPhase'].mock.calls[0][1]).toBe(1);
    });

    test('reseted emit change phase to 0 and data to default', () => {
        const wrapper = shallowMount(TheApplication, { store, localVue });
        wrapper.vm.$emit('reseted');
        expect(wrapper.emitted().reseted).toBeTruthy();

        wrapper.vm.applicationForm = {};

        expect(JSON.stringify(wrapper.vm.applicationForm)).not.toBe(JSON.stringify(getDefaultApplicationForm()));

        wrapper.vm.onReset();

        expect(actions['application/setPhase']).toHaveBeenCalledTimes(1);
        expect(actions['application/setPhase'].mock.calls[0][1]).toBe(0);

        expect(JSON.stringify(wrapper.vm.applicationForm)).toBe(JSON.stringify(getDefaultApplicationForm()));
    });

    test('filled emit change phase to 1 ', () => {
        const wrapper = shallowMount(TheApplication, { store, localVue });
        wrapper.vm.$emit('filled');
        expect(wrapper.emitted().filled).toBeTruthy();
        wrapper.vm.onFilled();
        expect(actions['application/setPhase']).toHaveBeenCalledTimes(1);
        expect(actions['application/setPhase'].mock.calls[0][1]).toBe(1);
    });

    test('submit emit change phase to 3 ', async () => {
        const wrapper = shallowMount(TheApplication, { store, localVue });
        wrapper.vm.$emit('submited');
        expect(wrapper.emitted().submited).toBeTruthy();

        wrapper.vm.applicationForm = getDefaultApplicationForm();
        wrapper.vm.applicationForm.additionalFiles.cv = {raw: ''};

        await wrapper.vm.onSubmit();
        expect(actions['application/setPhase']).toHaveBeenCalledTimes(1);
        expect(actions['application/setPhase'].mock.calls[0][1]).toBe(3);
    });

    test('step-selected emit change phase to 2 and sets step as current', () => {
        const wrapper = shallowMount(TheApplication, { store, localVue });
        const newStep = 2;
        wrapper.vm.$emit('step-selected', newStep);
        expect(wrapper.emitted()['step-selected']).toBeTruthy();

        expect(wrapper.vm.currentStep).not.toBe(newStep);

        wrapper.vm.onStepSelect(newStep);

        expect(actions['application/setPhase']).toHaveBeenCalledTimes(1);
        expect(actions['application/setPhase'].mock.calls[0][1]).toBe(2);

        expect(wrapper.vm.currentStep).toBe(newStep);
    });

    test('next-step-selected emit change step from 0 to 1 ', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 2 } });
        const wrapper = shallowMount(TheApplication, { store: updatedStore, localVue });

        wrapper.vm.$emit('next-step-selected');
        expect(wrapper.emitted()['next-step-selected']).toBeTruthy();

        wrapper.vm.currentStep = 0;
        expect(wrapper.vm.currentStep).toBe(0);

        wrapper.vm.onNextStepSelected();

        expect(wrapper.vm.currentStep).toBe(1);
    });

    test('next-step-selected emit change step from 1 to 2 ', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, 'application/phase': () => 2 } });
        const wrapper = shallowMount(TheApplication, { store: updatedStore, localVue });

        wrapper.vm.$emit('next-step-selected');
        expect(wrapper.emitted()['next-step-selected']).toBeTruthy();

        wrapper.vm.currentStep = 1;
        expect(wrapper.vm.currentStep).toBe(1);

        wrapper.vm.onNextStepSelected();

        expect(wrapper.vm.currentStep).toBe(2);
    });

});
