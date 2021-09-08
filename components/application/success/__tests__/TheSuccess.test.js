const { shallowMount } = require('@vue/test-utils');
const TheSuccess = require('@/components/application/success/TheSuccess').default;

describe('TheSuccess', () => {
    test('component default', () => {
        const wrapper = shallowMount(TheSuccess);
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
