const { shallowMount } = require('@vue/test-utils');
const FormHeader = require('@/components/application/form/FormHeader').default;

describe('FormHeader', () => {
    test('component default', () => {
        const wrapper = shallowMount(FormHeader, { propsData: { title: 'Test title' } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
