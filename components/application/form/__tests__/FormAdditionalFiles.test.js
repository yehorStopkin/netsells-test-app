const { shallowMount, createLocalVue } = require('@vue/test-utils');
const FormAdditionalFiles = require('@/components/application/form/FormAdditionalFiles').default;

const localVue = createLocalVue();

describe('FormAdditionalFiles', () => {
    getAdditionalFiles = (cv = null, coverLetter = null) => {
        return {
            cv,
            coverLetter,
        };
    };

    const uploadedFile = {
        name: 'Test file name.pdf',
    };

    test('component default', () => {
        const wrapper = shallowMount(FormAdditionalFiles, { localVue, propsData: { additionalFiles: getAdditionalFiles(), step: 2 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component uploaded cv', () => {
        const wrapper = shallowMount(FormAdditionalFiles, { localVue, propsData: { additionalFiles: getAdditionalFiles(uploadedFile), step: 2 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component uploaded cover letter', () => {
        const wrapper = shallowMount(FormAdditionalFiles, { localVue, propsData: { additionalFiles: getAdditionalFiles(null, uploadedFile), step: 2 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
