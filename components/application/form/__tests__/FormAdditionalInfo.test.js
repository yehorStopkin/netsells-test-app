const { shallowMount, createLocalVue } = require('@vue/test-utils');
const FormAdditionalInfo = require('@/components/application/form/FormAdditionalInfo').default;

const localVue = createLocalVue();

describe('FormAdditionalInfo', () => {
    getAdditionalInfo = (liveInUk = null, gitProfile = '', aboutYou = '') => {
        return {
            liveInUk,
            gitProfile,
            aboutYou,
        };
    };

    test('component default', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { localVue, propsData: { additionalInfo: getAdditionalInfo(), step: 1 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component liveInUk fiiled', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { localVue, propsData: { additionalInfo: getAdditionalInfo(true), step: 1 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component gitProfile filled', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { localVue, propsData: { additionalInfo: getAdditionalInfo(false, 'test git profile'), step: 1 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component aboutYou filled', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { localVue, propsData: { additionalInfo: getAdditionalInfo(false, '', 'test about you'), step: 1 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
