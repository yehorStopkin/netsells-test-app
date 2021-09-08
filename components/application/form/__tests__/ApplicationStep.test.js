const { shallowMount } = require('@vue/test-utils');
const ApplicationStep = require('@/components/application/form/ApplicationStep').default;

describe('ApplicationStep', () => {
    getData = (step = 0, selected = false, canBeSelected = false, progress = 0) => {
        return {
            step,
            selected,
            canBeSelected,
            title: 'Test title',
            progress,
        };
    };

    test('component default', () => {
        const wrapper = shallowMount(ApplicationStep, { propsData: { ...getData() } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component selected', () => {
        const wrapper = shallowMount(ApplicationStep, { propsData: { ...getData(0, true) } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component can be selected', () => {
        const wrapper = shallowMount(ApplicationStep, { propsData: { ...getData(0, false, true) } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
