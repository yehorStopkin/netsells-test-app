const { shallowMount } = require('@vue/test-utils');
const AppButton = require('@/components/common/AppButton').default;

describe('AppButton', () => {
    test('component with default props', () => {
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text' } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
