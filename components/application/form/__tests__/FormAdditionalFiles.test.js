const { shallowMount } = require('@vue/test-utils');
const FormAdditionalFiles = require('@/components/application/form/FormAdditionalFiles').default;

describe('FormAdditionalFiles', () => {
    getValue = (cv = null, coverLetter = null) => {
        return {
            cv,
            coverLetter,
        };
    };

    const uploadedFile = {
        name: 'Test file name.pdf',
    };

    test('component default', () => {
        const wrapper = shallowMount(FormAdditionalFiles, { propsData: { value: getValue(), step: 2 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component uploaded cv', () => {
        const wrapper = shallowMount(FormAdditionalFiles, { propsData: { value: getValue(uploadedFile), step: 2 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    test('component uploaded cover letter', () => {
        const wrapper = shallowMount(FormAdditionalFiles, { propsData: { value: getValue(null, uploadedFile), step: 2 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
