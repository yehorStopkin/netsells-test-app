const { shallowMount } = require('@vue/test-utils');
const AppButton = require('@/components/common/AppButton').default;

describe('AppButton', () => {
    const buttonSelector = '.app-button';

    test('component with default props', () => {
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text' } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const button = wrapper.find(buttonSelector);
        expect(button.exists()).toBeTruthy();
    });

    test('check if button disabled', () => {
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', disabled: true } });

        const button = wrapper.find(buttonSelector);

        expect(button.attributes('disabled')).toBeTruthy();
    });

    test('component with border-radius 10', () => {
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', borderRadius: 10 } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component with width 100', () => {
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', width: 100 } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component with height 100', () => {
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', height: 100 } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component with paddingTop 10', () => {
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', paddingTop: 10 } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component with paddingBottom 10', () => {
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', paddingBottom: 10 } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component with fontSize 15', () => {
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', fontSize: 15 } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
