const { shallowMount } = require('@vue/test-utils');
const ProgressBar = require('@/components/common/ProgressBar').default;

describe('ProgressBar', () => {
    test('empty bar', () => {
        const wrapper = shallowMount(ProgressBar, { propsData: { progress: 0 } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const emptyBar = wrapper.find('.progress-bar__empty');
        const filledBar = wrapper.find('.progress-bar__filled');

        expect(emptyBar.exists()).toBeTruthy();
        expect(filledBar.exists()).toBeTruthy();
    });
    
    test('full-filled bar', () => {
        const progress = 100;
        const wrapper = shallowMount(ProgressBar, { propsData: { progress } });

        const filledBar = wrapper.find('.progress-bar__filled');

        expect(filledBar.attributes('style') === `width: ${ progress }%`);
    });
});
