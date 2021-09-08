const { shallowMount } = require('@vue/test-utils');
const FormPersonalInfo = require('@/components/application/form/FormPersonalInfo').default;

describe('FormPersonalInfo', () => {
    getValue = (firstName = '', lastName = '', email = '', phoneNumber = '') => {
        return {
            firstName,
            lastName,
            email,
            phoneNumber,
        };
    };

    test('component default', () => {
        const wrapper = shallowMount(FormPersonalInfo, { propsData: { value: getValue(), step: 0 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component firstName filled', () => {
        const wrapper = shallowMount(FormPersonalInfo, { propsData: { value: getValue('Test first name'), step: 0 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component lastName filled', () => {
        const wrapper = shallowMount(FormPersonalInfo, { propsData: { value: getValue('', 'Test last name'), step: 0 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component email filled', () => {
        const wrapper = shallowMount(FormPersonalInfo, { propsData: { value: getValue('', '', 'Test email'), step: 0 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component phoneNumber filled', () => {
        const wrapper = shallowMount(FormPersonalInfo, { propsData: { value: getValue('', '', '', 'Test phone number'), step: 0 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
