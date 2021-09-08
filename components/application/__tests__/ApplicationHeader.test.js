const { shallowMount } = require('@vue/test-utils');
const ApplicationHeader = require('@/components/application/ApplicationHeader').default;

describe('ApplicationHeader', () => {
    test('component default', () => {
        const wrapper = shallowMount(ApplicationHeader);

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
