const { shallowMount } = require('@vue/test-utils');
const AppButton = require('@/components/common/AppButton').default;

describe('AppButton', () => {
    const buttonSelector = '.app-button';

    test('component with default props', () => {
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text' } });

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const button = wrapper.find(buttonSelector);
        expect(button.exists()).toBeTruthy();
    });

    test('check if button disabled', () => {
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', disabled: true } });

        const button = wrapper.find(buttonSelector);

        expect(button.attributes('disabled')).toBeTruthy();
    });

    test('component with border-radius 10', () => {
        const borderRadius = 10;
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', borderRadius } });

        const button = wrapper.find(buttonSelector);
        const styles = button.attributes('style') || '';

        const matchStyle = `border-radius: ${ borderRadius }px`;

        expect(styles.includes(matchStyle)).toBeTruthy();
    });

    test('component with width 100', () => {
        const width = 100;
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', width } });

        const button = wrapper.find(buttonSelector);
        const styles = button.attributes('style') || '';

        const matchStyle = `width: ${ width }px`;

        expect(styles.includes(matchStyle)).toBeTruthy();
    });

    test('component with height 100', () => {
        const height = 100;
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', height } });

        const button = wrapper.find(buttonSelector);
        const styles = button.attributes('style') || '';

        const matchStyle = `height: ${ height }px`;

        expect(styles.includes(matchStyle)).toBeTruthy();
    });

    test('component with height 0', () => {
        const height = 0;
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', height } });

        const button = wrapper.find(buttonSelector);
        const styles = button.attributes('style') || '';

        const matchStyle = `height: ${ height }px`;

        expect(!styles.includes(matchStyle)).toBeTruthy();
    });

    test('component with paddingTop 10', () => {
        const paddingTop = 100;
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', paddingTop } });

        const button = wrapper.find(buttonSelector);
        const styles = button.attributes('style') || '';

        const matchStyle = `padding-top: ${ paddingTop }px`;

        expect(styles.includes(matchStyle)).toBeTruthy();
    });

    test('component with paddingBottom 10', () => {
        const paddingBottom = 100;
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', paddingBottom } });

        const button = wrapper.find(buttonSelector);
        const styles = button.attributes('style') || '';

        const matchStyle = `padding-bottom: ${ paddingBottom }px`;

        expect(styles.includes(matchStyle)).toBeTruthy();
    });

    test('component with fontSize 15', () => {
        const fontSize = 15;
        const wrapper = shallowMount(AppButton, { propsData: { text: 'test text', fontSize } });

        const button = wrapper.find(buttonSelector);
        const styles = button.attributes('style') || '';

        const matchStyle = `font-size: ${ fontSize }px`;

        expect(styles.includes(matchStyle)).toBeTruthy();
    });
});
