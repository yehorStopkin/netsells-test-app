const { shallowMount } = require('@vue/test-utils');
const ApplicationHeader = require('@/components/application/ApplicationHeader').default;

describe('ApplicationHeader', () => {
    test('component default', () => {
        const wrapper = shallowMount(ApplicationHeader);

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const rootElement = wrapper.find('.application-header');
        expect(rootElement.exists()).toBeTruthy();

        const textElements = wrapper.findAll('.application-header__text');
        expect(textElements.length === 2).toBeTruthy();
    });
});
