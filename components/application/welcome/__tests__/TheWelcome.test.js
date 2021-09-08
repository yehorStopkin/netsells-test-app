const { shallowMount } = require('@vue/test-utils');
const TheWelcome = require('@/components/application/welcome/TheWelcome').default;

describe('TheWelcome', () => {
    test('component default', () => {
        const wrapper = shallowMount(TheWelcome);
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
