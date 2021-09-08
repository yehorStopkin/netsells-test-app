const { shallowMount } = require('@vue/test-utils');
const FormHolder = require('@/components/application/form/FormHolder').default;

describe('FormHolder', () => {
    getValue = () => {
        return {
            personalInfo: {
                firstName: 'Test first name',
                lastName: 'Test last name',
                email: 'Test email',
                phoneNumber: 'Test phone number',
            }, 
            additionalInfo: {
                liveInUk: true,
                gitProfile: 'Test git profile',
                aboutYou: 'Test about you',
            },
            additionalFiles: {
                cv: {},
                coverLetter: {},
            },
        };
    };

    getData = (filingOfPersonalInfo = 0, filingOfAdditionalInfo = 0, filingOfAdditionalFiles = 0, currentStep = 0, availableSteps = [0]) => {
        return {
            filingOfPersonalInfo,
            filingOfAdditionalInfo,
            filingOfAdditionalFiles,
            currentStep,
            availableSteps,
        };
    };

    test('component default', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData() } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const rootElement = wrapper.findAll('.form-holder');
        expect(rootElement.length).toBe(1);

        const formHolderHeader = wrapper.findAll('*[data-test-id="form-holder-header"]');
        expect(formHolderHeader.length).toBe(1);

        const dynamicComponent = wrapper.findAll('*[data-test-id="dynamic-component"]');
        expect(dynamicComponent.length).toBe(1);
    });

    test('check getter applicationForm', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData() } });

        expect(JSON.stringify(wrapper.vm.applicationForm)).toBe(JSON.stringify({
            personalInfo: wrapper.vm.innerPersonalInfo,
            additionalInfo: wrapper.vm.innerAdditionalInfo,
            additionalFiles: wrapper.vm.innerAdditionalFiles,
        }));
    });

    test('currentForm with PERSONAL_INFO', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData() } });

        expect(wrapper.vm.currentForm).toBe('form-personal-info');
    });

    test('currentForm with ADDITIONAL_INFO', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData(0, 0, 0, 1) } });

        expect(wrapper.vm.currentForm).toBe('form-additional-info');
    });

    test('currentForm with ADDITIONAL_INFO', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData(0, 0, 0, 2) } });

        expect(wrapper.vm.currentForm).toBe('form-additional-files');
    });

    test('check getter personalInfo', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData() } });

        expect(JSON.stringify(wrapper.vm.personalInfo)).toBe(JSON.stringify(wrapper.vm.innerPersonalInfo));
    });

    test('check getter additionalInfo', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData() } });

        expect(JSON.stringify(wrapper.vm.additionalInfo)).toBe(JSON.stringify(wrapper.vm.innerAdditionalInfo));
    });

    test('check getter additionalFiles', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData() } });

        expect(JSON.stringify(wrapper.vm.additionalFiles)).toBe(JSON.stringify(wrapper.vm.innerAdditionalFiles));
    });

    test('check onValidationChanged event', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData() } });

        expect(wrapper.vm.isPersonalInfoValid).toBe(false);
        wrapper.vm.onValidationChanged(0, true);
        expect(wrapper.vm.isPersonalInfoValid).toBe(true);

        expect(wrapper.vm.isAdditionalInfoValid).toBe(false);
        wrapper.vm.onValidationChanged(1, true);
        expect(wrapper.vm.isAdditionalInfoValid).toBe(true);

        expect(wrapper.vm.isAdditionalFilesValid).toBe(false);
        wrapper.vm.onValidationChanged(2, true);
        expect(wrapper.vm.isAdditionalFilesValid).toBe(true);
    });

    test('check stepSelected event from PERSONAL_INFO with invalid personal info', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData(0, 0, 0, 0) } });

        wrapper.vm.onStepSelected(0);
        expect(wrapper.emitted('step-selected')).not.toBeTruthy();

        wrapper.vm.onStepSelected(1);
        expect(wrapper.emitted('step-selected')).not.toBeTruthy();

        wrapper.vm.onStepSelected(2);
        expect(wrapper.emitted('step-selected')).not.toBeTruthy();
    });

    test('check stepSelected event from ADDITIONAL_INFO with invalid personal info', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData(0, 0, 0, 1) } });

        wrapper.vm.onStepSelected(0);
        expect(wrapper.emitted('step-selected')).not.toBeTruthy();

        wrapper.vm.onStepSelected(1);
        expect(wrapper.emitted('step-selected')).not.toBeTruthy();

        wrapper.vm.onStepSelected(2);
        expect(wrapper.emitted('step-selected')).not.toBeTruthy();
    });

    test('check stepSelected event from ADDITIONAL_FILES with invalid personal info', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData(0, 0, 0, 2) } });

        wrapper.vm.onStepSelected(0);
        expect(wrapper.emitted('step-selected')).not.toBeTruthy();

        wrapper.vm.onStepSelected(1);
        expect(wrapper.emitted('step-selected')).not.toBeTruthy();

        wrapper.vm.onStepSelected(2);
        expect(wrapper.emitted('step-selected')).not.toBeTruthy();
    });

    test('check stepSelected event from PERSONAL_INFO with valid personal info', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData(0, 0, 0, 0) } });

        wrapper.vm.isPersonalInfoValid = true;
        wrapper.vm.isAdditionalInfoValid = true;
        wrapper.vm.isAdditionalFilesValid = true;

        wrapper.vm.onStepSelected(0);
        expect(wrapper.emitted('step-selected')).toBeTruthy();

        wrapper.vm.onStepSelected(1);
        expect(wrapper.emitted('step-selected')).toBeTruthy();

        wrapper.vm.onStepSelected(2);
        expect(wrapper.emitted('step-selected')).toBeTruthy();
    });

    test('check stepSelected event from ADDITIONAL_INFO with valid personal info', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData(0, 0, 0, 1) } });

        wrapper.vm.isPersonalInfoValid = true;
        wrapper.vm.isAdditionalInfoValid = true;
        wrapper.vm.isAdditionalFilesValid = true;

        wrapper.vm.onStepSelected(0);
        expect(wrapper.emitted('step-selected')).toBeTruthy();

        wrapper.vm.onStepSelected(1);
        expect(wrapper.emitted('step-selected')).toBeTruthy();

        wrapper.vm.onStepSelected(2);
        expect(wrapper.emitted('step-selected')).toBeTruthy();
    });

    test('check stepSelected event from ADDITIONAL_FILES with valid personal info', () => {
        const wrapper = shallowMount(FormHolder, { propsData: { value: getValue(), ...getData(0, 0, 0, 2) } });

        wrapper.vm.isPersonalInfoValid = true;
        wrapper.vm.isAdditionalInfoValid = true;
        wrapper.vm.isAdditionalFilesValid = true;

        wrapper.vm.onStepSelected(0);
        expect(wrapper.emitted('step-selected')).toBeTruthy();

        wrapper.vm.onStepSelected(1);
        expect(wrapper.emitted('step-selected')).toBeTruthy();

        wrapper.vm.onStepSelected(2);
        expect(wrapper.emitted('step-selected')).toBeTruthy();
    });

});
