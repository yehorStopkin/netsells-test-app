const { shallowMount, createLocalVue } = require('@vue/test-utils');
const FormPersonalInfo = require('@/components/application/form/FormPersonalInfo').default;

const localVue = createLocalVue();

describe('FormPersonalInfo', () => {
    const _firstName = 'Test first name';
    const _lastName = 'Test last name';
    const _email = 'Test email';
    const _phoneNumber = 'Test phoneNumber';

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

        const rootElement = wrapper.findAll('.form-personal-info');
        expect(rootElement.length).toBe(1);

        const headerElement = wrapper.findAll('.form-personal-info__header');
        expect(headerElement.length).toBe(1);

        const fields = wrapper.findAll('.form-personal-info__field');
        expect(fields.length).toBe(4);

        const actionElement = wrapper.findAll('.form-personal-info__actions');
        expect(actionElement.length).toBe(1);
    });

    test('test filled fields', () => {
        const wrapper = shallowMount(FormPersonalInfo, { localVue, propsData: { personalInfo: getPersonalInfo(_firstName, _lastName, _email, _phoneNumber), step: 0 } });
        
        const firstName = wrapper.find('#firstName');
        expect(firstName.attributes('value')).toBe(_firstName);

        const lastName = wrapper.find('#lastName');
        expect(lastName.attributes('value')).toBe(_lastName);

        const email = wrapper.find('#email');
        expect(email.attributes('value')).toBe(_email);

        const phoneNumber = wrapper.find('#phoneNumber');
        expect(phoneNumber.attributes('value')).toBe(_phoneNumber);
    });

    test('test isFirstNameDirty and isEmailDirty when field changed', () => {
        const wrapper = shallowMount(FormPersonalInfo, { localVue, propsData: { personalInfo: getPersonalInfo(_firstName, _lastName, _email, _phoneNumber), step: 0 } });

        expect(wrapper.vm.isFirstNameDirty).toBe(false);
        wrapper.vm.onFirstNameChange();
        expect(wrapper.vm.isFirstNameDirty).toBe(true);

        expect(wrapper.vm.isEmailDirty).toBe(false);
        wrapper.vm.onEmailChange();
        expect(wrapper.vm.isEmailDirty).toBe(true);
    });
    
    test('test isFirstNameDirty and isEmailDirty when onNextStep', () => {
        const wrapper = shallowMount(FormPersonalInfo, { localVue, propsData: { personalInfo: getPersonalInfo(_firstName, _lastName, _email, _phoneNumber), step: 0 } });

        expect(wrapper.vm.isFirstNameDirty).toBe(false);
        expect(wrapper.vm.isEmailDirty).toBe(false);

        wrapper.vm.onNextStep();

        expect(wrapper.vm.isFirstNameDirty).toBe(true);
        expect(wrapper.vm.isEmailDirty).toBe(true);
    });

    test('test isFirstNameValid', () => {
        const wrapper = shallowMount(FormPersonalInfo, { localVue, propsData: { personalInfo: getPersonalInfo(_firstName, _lastName, _email, _phoneNumber), step: 0 } });

        expect(wrapper.vm.isFirstNameValid).toBe(true);
        wrapper.vm.firstName = '';
        expect(wrapper.vm.isFirstNameValid).toBe(false);
    });

    test('test isEmailValid', () => {
        const wrapper = shallowMount(FormPersonalInfo, { localVue, propsData: { personalInfo: getPersonalInfo(_firstName, _lastName, _email, _phoneNumber), step: 0 } });

        expect(wrapper.vm.isEmailValid).toBe(true);
        wrapper.vm.email = '';
        expect(wrapper.vm.isEmailValid).toBe(false);
    });
});
