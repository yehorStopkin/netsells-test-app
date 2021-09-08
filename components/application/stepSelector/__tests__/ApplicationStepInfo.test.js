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

        const rootElement = wrapper.findAll('.application-step-info');
        expect(rootElement.length).toBe(1);

        const progressBar = wrapper.findAll('.application-step-info__progress-bar');
        expect(progressBar.length).toBe(1);

        const titleElement = wrapper.findAll('.application-step-info__title');
        expect(titleElement.length).toBe(1);

        const subtitleElement = wrapper.findAll('.application-step-info__subtitle');
        expect(subtitleElement.length).toBe(1);

        const detailsElement = wrapper.findAll('.application-step-info__details');
        expect(detailsElement.length).toBe(1);

        const actionElement = wrapper.findAll('.application-step-info__action');
        expect(actionElement.length).toBe(2);
    });

    test('check actionText of completed step', () => {
        const wrapper = shallowMount(ApplicationStepInfo, { propsData: { data: getData(0, 0, true) } });

        const actionTextElement = wrapper.findAll('.application-step-info__action-text');
        expect(actionTextElement.length).toBe(1);
        expect(actionTextElement.at(0).text()).toBe(wrapper.vm.doneText);
    });

    test('check actionText of uncompleted step', () => {
        const wrapper = shallowMount(ApplicationStepInfo, { propsData: { data: getData() } });

        const actionTextElement = wrapper.findAll('.application-step-info__action-text');
        expect(actionTextElement.length).toBe(1);
        expect(actionTextElement.at(0).text()).toBe(wrapper.vm.completeText);
    });

    test('check select step', () => {
        const wrapper = shallowMount(ApplicationStepInfo, { propsData: { data: getData(2) } });

        const actionTextElement = wrapper.findAll('.application-step-info__action-text');
        actionTextElement.at(0).trigger('click');

        expect(wrapper.emitted().selected[0][0]).toEqual(wrapper.vm.data.stepNumber);
    });

    test('check progress getter', () => {
        const wrapper = shallowMount(ApplicationStepInfo, { propsData: { data: getData() } });
        expect(wrapper.vm.progress).toBe(wrapper.vm.data.filingPercentage);
    });
});
