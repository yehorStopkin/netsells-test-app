const { shallowMount } = require('@vue/test-utils');
const TheSuccess = require('@/components/application/success/TheSuccess').default;

describe('TheSuccess', () => {
    test('component default', () => {
        const wrapper = shallowMount(TheSuccess);
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component default', () => {
        const wrapper = shallowMount(TheSuccess);
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const rootElement = wrapper.findAll('.the-success');
        expect(rootElement.length).toBe(1);

        const titleElement = wrapper.findAll('.the-success__title');
        expect(titleElement.length).toBe(1);

        const subtitleElement = wrapper.findAll('.the-success__subtitle');
        expect(subtitleElement.length).toBe(1);

        const messageElement = wrapper.findAll('.the-success__message');
        expect(messageElement.length).toBe(1);

        const actionElement = wrapper.findAll('.the-success__actions');
        expect(actionElement.length).toBe(1);
    });

    test('check click on button', () => {
        const wrapper = shallowMount(TheSuccess);

        const button = wrapper.find('*[data-test-id="app-button"]');
        expect(button.exists()).toBeTruthy();

        button.trigger('clicked');

        wrapper.vm.resetEvent = jest.fn();
        expect(wrapper.vm.resetEvent).toHaveBeenCalledTimes(0);
    });
});
