const { shallowMount } = require('@vue/test-utils');
const ProgressBar = require('@/components/common/ProgressBar').default;

describe('ProgressBar', () => {
    test('empty bar', () => {
        const wrapper = shallowMount(ProgressBar, { propsData: { progress: 0 } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
    
    test('half-filled bar', () => {
        const wrapper = shallowMount(ProgressBar, { propsData: { progress: 50 } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('full-filled bar', () => {
        const wrapper = shallowMount(ProgressBar, { propsData: { progress: 100 } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
