const { shallowMount } = require('@vue/test-utils');
const FormHolderHeader = require('@/components/application/form/FormHolderHeader').default;

describe('FormHolderHeader', () => {
    getData = (currentStep = 0, filingOfPersonalInfo = 0, filingOfAdditionalInfo = 0, filingOfAdditionalFiles = 0, availableSteps = [0]) => {
        return {
            currentStep,
            filingOfPersonalInfo,
            filingOfAdditionalInfo,
            filingOfAdditionalFiles,
            availableSteps,
        };
    };

    test('component default', () => {
        const wrapper = shallowMount(FormHolderHeader, { propsData: { ...getData() } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const rootElement = wrapper.findAll('.form-holder-header');
        expect(rootElement.length).toBe(1);
        
        const applicationSteps = wrapper.findAll('.form-holder-header__application-step');
        expect(applicationSteps.length).toBe(3);
    });

    test('selected step 1', () => {
        const wrapper = shallowMount(FormHolderHeader, { propsData: { ...getData(0) } });

        expect(wrapper.vm.personalInfoSelected).toBe(true);
        expect(wrapper.vm.additionalInfoSelected).toBe(false);
        expect(wrapper.vm.additionalFilesSelected).toBe(false);
    });

    test('selected step 2', () => {
        const wrapper = shallowMount(FormHolderHeader, { propsData: { ...getData(1) } });
        expect(wrapper.vm.personalInfoSelected).toBe(false);
        expect(wrapper.vm.additionalInfoSelected).toBe(true);
        expect(wrapper.vm.additionalFilesSelected).toBe(false);
    });

    test('selected step 3', () => {
        const wrapper = shallowMount(FormHolderHeader, { propsData: { ...getData(2) } });
        expect(wrapper.vm.personalInfoSelected).toBe(false);
        expect(wrapper.vm.additionalInfoSelected).toBe(false);
        expect(wrapper.vm.additionalFilesSelected).toBe(true);
    });

    test('check onStepSelect with availableStep', () => {
        const wrapper = shallowMount(FormHolderHeader, { propsData: { ...getData(0, 20, 50, 100, [0, 1, 2]) } });

        wrapper.vm.onStepSelect(0);
        expect(wrapper.emitted()['step-selected']).toBeTruthy();

        wrapper.vm.onStepSelect(1);
        expect(wrapper.emitted()['step-selected']).toBeTruthy();

        wrapper.vm.onStepSelect(2);
        expect(wrapper.emitted()['step-selected']).toBeTruthy();
    });

    test('check onStepSelect with unavailableSteps', () => {
        const wrapper = shallowMount(FormHolderHeader, { propsData: { ...getData(0, 20, 50, 100, []) } });

        wrapper.vm.onStepSelect(0);
        expect(wrapper.emitted()['step-selected']).not.toBeTruthy();

        wrapper.vm.onStepSelect(1);
        expect(wrapper.emitted()['step-selected']).not.toBeTruthy();

        wrapper.vm.onStepSelect(2);
        expect(wrapper.emitted()['step-selected']).not.toBeTruthy();
    });
});
