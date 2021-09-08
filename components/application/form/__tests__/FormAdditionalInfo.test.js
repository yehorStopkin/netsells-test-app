const { shallowMount } = require('@vue/test-utils');
const FormAdditionalInfo = require('@/components/application/form/FormAdditionalInfo').default;

describe('FormAdditionalInfo', () => {
    getValue = (liveInUk = null, gitProfile = '', aboutYou = '') => {
        return {
            liveInUk,
            gitProfile,
            aboutYou,
        };
    };

    test('component default', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { propsData: { value: getValue(), step: 1 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component liveInUk', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { propsData: { value: getValue(true), step: 1 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component gitProfile filled', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { propsData: { value: getValue(false, 'test git profile'), step: 1 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component aboutYou filled', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { propsData: { value: getValue(false, '', 'test about you'), step: 1 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
