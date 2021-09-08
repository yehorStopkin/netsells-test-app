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
    });
});
