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
    });

    test('component selected step 1', () => {
        const wrapper = shallowMount(FormHolderHeader, { propsData: { ...getData(1) } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component different filing percentage', () => {
        const wrapper = shallowMount(FormHolderHeader, { propsData: { ...getData(0, 20, 50, 100) } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
