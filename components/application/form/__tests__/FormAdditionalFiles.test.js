const { shallowMount, createLocalVue } = require('@vue/test-utils');
const FormAdditionalFiles = require('@/components/application/form/FormAdditionalFiles').default;

const localVue = createLocalVue();

describe('FormAdditionalFiles', () => {
    const _cv = {};
    const _coverLetter = {};

    getAdditionalFiles = (cv = null, coverLetter = null) => {
        return {
            cv,
            coverLetter,
        };
    };

    test('component default', () => {
        const wrapper = shallowMount(FormAdditionalFiles, { localVue, propsData: { personalInfo: getAdditionalFiles(), step: 0 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const rootElement = wrapper.findAll('.form-additional-files');
        expect(rootElement.length).toBe(1);

        const headerElement = wrapper.findAll('.form-additional-files__header');
        expect(headerElement.length).toBe(1);

        const fields = wrapper.findAll('.form-additional-files__field');
        expect(fields.length).toBe(2);

        const actionElement = wrapper.findAll('.form-additional-files__actions');
        expect(actionElement.length).toBe(1);
    });

    test('test isCvDirty when field changed', () => {
        const wrapper = shallowMount(FormAdditionalFiles, { localVue, propsData: { personalInfo: getAdditionalFiles(_cv, _coverLetter), step: 0 } });

        expect(wrapper.vm.isCvDirty).toBe(false);
        wrapper.vm.onCvChanged();
        expect(wrapper.vm.isCvDirty).toBe(true);
    });
    
    test('test isCvDirty when onNextStep', () => {
        const wrapper = shallowMount(FormAdditionalFiles, { localVue, propsData: { personalInfo: getAdditionalFiles(_cv, _coverLetter), step: 0 } });

        expect(wrapper.vm.isCvDirty).toBe(false);

        wrapper.vm.onNextStep();

        expect(wrapper.vm.isCvDirty).toBe(true);
    });

    test('test isCvValid', () => {
        const wrapper = shallowMount(FormAdditionalFiles, { localVue, propsData: { personalInfo: getAdditionalFiles(_cv, _coverLetter), step: 0 } });

        expect(wrapper.vm.isCvValid).toBe(true);
        wrapper.vm.cv = null;
        expect(wrapper.vm.isCvValid).toBe(false);
    });
   
});
