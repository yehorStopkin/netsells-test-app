const { shallowMount } = require('@vue/test-utils');
const ApplicationStepInfo = require('@/components/application/stepSelector/ApplicationStepInfo').default;

describe('ApplicationStepInfo', () => {
    getData = (stepNumber = 0, filingPercentage = 0, isCompleted = false) => {
        return {
            stepNumber,
            filingPercentage,
            isCompleted,
            title: 'Test title',
            subtitle: 'Test subtitle',
            details: 'Test details',
        };
    };

    test('component default', () => {
        const wrapper = shallowMount(ApplicationStepInfo, { propsData: { data: getData() } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component completed', () => {
        const wrapper = shallowMount(ApplicationStepInfo, { propsData: { data: getData(0, 0, true) } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component half-filled ', () => {
        const wrapper = shallowMount(ApplicationStepInfo, { propsData: { data: getData(0, 50) } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
