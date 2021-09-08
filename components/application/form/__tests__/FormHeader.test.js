const { shallowMount } = require('@vue/test-utils');
const FormHeader = require('@/components/application/form/FormHeader').default;

describe('FormHeader', () => {
    const title = 'Test title';

    test('component default', () => {
        const wrapper = shallowMount(FormHeader, { propsData: { title } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const rootElement = wrapper.findAll('.form-header');
        expect(rootElement.exists()).toBeTruthy();

        const titleElement = wrapper.findAll('.form-header__title');
        expect(titleElement.length).toBe(1);

        const subtitleElement = wrapper.findAll('.form-header__subtitle');
        expect(subtitleElement.length).toBe(2);
    });

    test('check title text', () => {
        const wrapper = shallowMount(FormHeader, { propsData: { title } });

        const titleElement = wrapper.find('.form-header__title');
        expect(titleElement.text()).toBe(wrapper.vm.title);
    });

    test('check subtitle text', () => {
        const wrapper = shallowMount(FormHeader, { propsData: { title } });

        const subtitleElement = wrapper.findAll('.form-header__subtitle');
        expect(subtitleElement.at(1).text()).toBe(wrapper.vm.subtitle);
    });
});
