const { shallowMount } = require('@vue/test-utils');
const ProgressBar = require('@/components/common/ProgressBar').default;

describe('ProgressBar', () => {
    test('empty bar', () => {
        const wrapper = shallowMount(ProgressBar, { propsData: { progress: 0 } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const emptyBar = wrapper.find('.js-progress-bar__empty');
        const filledBar = wrapper.find('.js-progress-bar__filled');

        expect(emptyBar.exists()).toBeTruthy();
        expect(filledBar.exists()).toBeTruthy();
    });
    
    test('half-filled bar', () => {
        const progress = 50;
        const wrapper = shallowMount(ProgressBar, { propsData: { progress } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const filledBar = wrapper.find('.js-progress-bar__filled');

        expect(filledBar.attributes('style') === `width: ${ progress }%`);
    });

    test('full-filled bar', () => {
        const progress = 100;
        const wrapper = shallowMount(ProgressBar, { propsData: { progress } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const filledBar = wrapper.find('.js-progress-bar__filled');

        expect(filledBar.attributes('style') === `width: ${ progress }%`);
    });
});
