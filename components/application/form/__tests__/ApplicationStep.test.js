const { shallowMount } = require('@vue/test-utils');
const ApplicationStep = require('@/components/application/form/ApplicationStep').default;

describe('ApplicationStep', () => {
    getData = (step = 0, selected = false, progress = 0) => {
        return {
            step,
            selected,
            title: 'Test title',
            progress,
        };
    };

    test('component default', () => {
        const wrapper = shallowMount(ApplicationStep, { propsData: { ...getData() } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const rootElement = wrapper.findAll('.application-step');
        expect(rootElement.length).toBe(1);
        
        const titleElement = wrapper.findAll('.application-step__title');
        expect(titleElement.length).toBe(1);

        const progressBar = wrapper.findAll('.application-step__progress-bar');
        expect(progressBar.length).toBe(1);

    });

    test('check selected', () => {
        const wrapper = shallowMount(ApplicationStep, { propsData: { ...getData(0, true) } });
        const rootElement = wrapper.find('.application-step');
        expect(rootElement.classes().includes('selected')).toBe(true);
    });

    test('check click event', () => {
        const currentStep = 2;
        const wrapper = shallowMount(ApplicationStep, { propsData: { ...getData(currentStep) } });

        const rootElement = wrapper.find('.application-step');
        rootElement.trigger('click');

        expect(wrapper.emitted()['step-selected'][0][0]).toEqual(currentStep);
    });
});
