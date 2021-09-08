const { shallowMount, createLocalVue } = require('@vue/test-utils');
const FormPersonalInfo = require('@/components/application/form/FormPersonalInfo').default;

const localVue = createLocalVue();

describe('FormPersonalInfo', () => {
    getPersonalInfo = (firstName = '', lastName = '', email = '', phoneNumber = '') => {
        return {
            firstName,
            lastName,
            email,
            phoneNumber,
        };
    };

    test('component default', () => {
        const wrapper = shallowMount(FormPersonalInfo, { localVue, propsData: { personalInfo: getPersonalInfo(), step: 0 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component firstName filled', () => {
        const wrapper = shallowMount(FormPersonalInfo, { localVue, propsData: { personalInfo: getPersonalInfo('Test first name'), step: 0 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component lastName filled', () => {
        const wrapper = shallowMount(FormPersonalInfo, { localVue, propsData: { personalInfo: getPersonalInfo('', 'Test last name'), step: 0 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component email filled', () => {
        const wrapper = shallowMount(FormPersonalInfo, { localVue, propsData: { personalInfo: getPersonalInfo('', '', 'Test email'), step: 0 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component phoneNumber filled', () => {
        const wrapper = shallowMount(FormPersonalInfo, { localVue, propsData: { personalInfo: getPersonalInfo('', '', '', 'Test phone number'), step: 0 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
