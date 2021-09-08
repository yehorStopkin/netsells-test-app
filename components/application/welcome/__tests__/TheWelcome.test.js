const { shallowMount } = require('@vue/test-utils');
const TheWelcome = require('@/components/application/welcome/TheWelcome').default;

describe('TheWelcome', () => {
    test('component default', () => {
        const wrapper = shallowMount(TheWelcome);
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const rootElement = wrapper.findAll('.the-welcome');
        expect(rootElement.length).toBe(1);

        const titleElement = wrapper.findAll('.the-welcome__title');
        expect(titleElement.length).toBe(1);

        const subtitleElement = wrapper.findAll('.the-welcome__subtitle');
        expect(subtitleElement.length).toBe(1);

        const actionElement = wrapper.findAll('.the-welcome__actions');
        expect(actionElement.length).toBe(1);
    });

    test('check click on button', () => {
        const wrapper = shallowMount(TheWelcome);

        const button = wrapper.find('*[data-test-id="app-button"]');
        expect(button.exists()).toBeTruthy();

        button.trigger('clicked');

        wrapper.vm.startEvent = jest.fn();
        expect(wrapper.vm.startEvent).toHaveBeenCalledTimes(0);
    });
});
