/* eslint-disable require-jsdoc-except/require-jsdoc */
const Vuex = require('vuex');
const { shallowMount, createLocalVue } = require('@vue/test-utils');
const ApplicationStepSelector = require('@/components/application/stepSelector/ApplicationStepSelector').default;

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ApplicationStepSelector', () => {
    let actions;
    let getters;
    let store;

    const getDefaultData = (
        isPersonalInfoCompleted = false,
        isAdditionalInfoCompleted = false,
        isAdditionalFilesCompleted = false,
        loading = false,
        availableSteps = [0],
    ) => {
        return {
            filingOfPersonalInfo: 0,
            filingOfAdditionalInfo: 0,
            filingOfAdditionalFiles: 0,
            isPersonalInfoCompleted,
            isAdditionalInfoCompleted,
            isAdditionalFilesCompleted,
            loading,
            availableSteps,
        };
    };

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
        const wrapper = shallowMount(ApplicationStepSelector, { store, localVue, propsData: { ...getDefaultData() } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const rootElement = wrapper.findAll('.application-step-selector');
        expect(rootElement.length).toBe(1);

        const headerElement = wrapper.findAll('.application-step-selector__header');
        expect(headerElement.length).toBe(1);

        const stepsWrapper = wrapper.findAll('.application-step-selector__steps');
        expect(stepsWrapper.length).toBe(1);

        const steps = wrapper.findAll('.application-step-selector__step');
        expect(steps.length).toBe(3);

        const confirmButton = wrapper.findAll('.application-step-selector__actions');
        expect(confirmButton.length).toBe(0);
    });

    test('check canSubmit by default', () => {
        const wrapper = shallowMount(ApplicationStepSelector, { store, localVue, propsData: { ...getDefaultData() } });
        expect(wrapper.vm.canSubmit).toBe(false);
    });

    test('check if submitButton displayed when form completed', () => {
        const wrapper = shallowMount(ApplicationStepSelector, {
            store, localVue, propsData: {
                isPersonalInfoCompleted: true,
                isAdditionalInfoCompleted: true,
                isAdditionalFilesCompleted: true,
            },
        });
        expect(wrapper.vm.canSubmit).toBe(true);
        expect(wrapper.element).toMatchSnapshot();

        const confirmButton = wrapper.findAll('.application-step-selector__actions');
        expect(confirmButton.length).toBe(1);
    });

    test('check personalInfoStep', () => {
        const wrapper = shallowMount(ApplicationStepSelector, { store, localVue, propsData: { ...getDefaultData() } });

        const personalInfoStep = {
            stepNumber: 0,
            filingPercentage: wrapper.vm.filingOfPersonalInfo,
            isCompleted: wrapper.vm.isPersonalInfoCompleted,
            title: 'STEP 1',
            subtitle: 'Personal Details',
            details:
                'Please complete your personal details section by clicking complete.',
        };

        expect(JSON.stringify(wrapper.vm.personalInfoStep)).toBe(JSON.stringify(personalInfoStep));
    });

    test('check additionalInfoStep', () => {
        const wrapper = shallowMount(ApplicationStepSelector, { store, localVue, propsData: { ...getDefaultData() } });

        const additionalInfoStep = {
            stepNumber: 1,
            filingPercentage: wrapper.vm.filingOfAdditionalInfo,
            isCompleted: wrapper.vm.isAdditionalInfoCompleted,
            title: 'STEP 2',
            subtitle: 'More About You',
            details: 'Please complete this section by clicking complete.',
        };

        expect(JSON.stringify(wrapper.vm.additionalInfoStep)).toBe(JSON.stringify(additionalInfoStep));
    });

    test('check additionalFilesStep', () => {
        const wrapper = shallowMount(ApplicationStepSelector, { store, localVue, propsData: { ...getDefaultData() } });

        const additionalFilesStep = {
            stepNumber: 2,
            filingPercentage: wrapper.vm.filingOfAdditionalFiles,
            isCompleted: wrapper.vm.isAdditionalFilesCompleted,
            title: 'STEP 3',
            subtitle: 'Files Upload',
            details: 'Just upload your cover letter to complete this section.',
        };

        expect(JSON.stringify(wrapper.vm.additionalFilesStep)).toBe(JSON.stringify(additionalFilesStep));
    });

    test('check if can onSelectStep', () => {
        const wrapper = shallowMount(ApplicationStepSelector, { store, localVue, propsData: { ...getDefaultData() } });
        
        wrapper.vm.onSelectStep(0);

        expect(wrapper.emitted()['step-selected']).toBeTruthy();
    });

    test('check if can onSelectStep while loading', () => {
        const wrapper = shallowMount(ApplicationStepSelector, { store, localVue, propsData: { ...getDefaultData(false, false, false, true) } });
        
        wrapper.vm.onSelectStep(0);

        expect(wrapper.emitted()['step-selected']).not.toBeTruthy();
    });

    test('check if can onSelectStep when step is not allowed', () => {
        const wrapper = shallowMount(ApplicationStepSelector, { store, localVue, propsData: { ...getDefaultData() } });
        
        wrapper.vm.onSelectStep(1);

        expect(wrapper.emitted()['step-selected']).not.toBeTruthy();
    });

    test('check canSubmit getter when all completed', () => {
        const wrapper = shallowMount(ApplicationStepSelector, { store, localVue, propsData: { ...getDefaultData(true, true, true) } });
        
        expect(wrapper.vm.canSubmit).toBe(true);
    });

});
