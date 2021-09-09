const { shallowMount, createLocalVue } = require('@vue/test-utils');
const FormAdditionalInfo = require('@/components/application/form/FormAdditionalInfo').default;

const localVue = createLocalVue();

describe('FormAdditionalInfo', () => {
    const _liveInUk = true;
    const _gitProfile = 'Test git profile';
    const _aboutYou = 'Test about you';

    getAdditionalInfo = (liveInUk = null, gitProfile = '', aboutYou = '') => {
        return {
            liveInUk,
            gitProfile,
            aboutYou,
        };
    };

    test('component default', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { localVue, propsData: { additionalInfo: getAdditionalInfo(), step: 0 } });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();

        const rootElement = wrapper.findAll('.form-additional-info');
        expect(rootElement.length).toBe(1);

        const headerElement = wrapper.findAll('.form-additional-info__header');
        expect(headerElement.length).toBe(1);

        const fields = wrapper.findAll('.form-additional-info__field');
        expect(fields.length).toBe(3);

        const actionElement = wrapper.findAll('.form-additional-info__actions');
        expect(actionElement.length).toBe(1);
    });

    test('test filled fields', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { localVue, propsData: { additionalInfo: getAdditionalInfo(_liveInUk, _gitProfile, _aboutYou ), step: 0 } });
        
        const liveInUk = wrapper.find('#liveInUk');
        expect(liveInUk.attributes('value')).toBe(`${ _liveInUk }`);

        const gitProfile = wrapper.find('#gitProfile');
        expect(gitProfile.attributes('value')).toBe(_gitProfile);

        const aboutYou = wrapper.find('#aboutYou');
        expect(aboutYou.attributes('value')).toBe(_aboutYou);
    });

    test('test isLiveInUkDirty, isLiveInUkDirty and isAboutYouDirty when field changed', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { localVue, propsData: { additionalInfo: getAdditionalInfo(_liveInUk, _gitProfile, _aboutYou ), step: 0 } });

        expect(wrapper.vm.isLiveInUkDirty).toBe(false);
        wrapper.vm.onLiveInUkChange();
        expect(wrapper.vm.isLiveInUkDirty).toBe(true);

        expect(wrapper.vm.isGitProfileDirty).toBe(false);
        wrapper.vm.onGitProfileChange();
        expect(wrapper.vm.isGitProfileDirty).toBe(true);

        expect(wrapper.vm.isAboutYouDirty).toBe(false);
        wrapper.vm.onAboutYouChange();
        expect(wrapper.vm.isAboutYouDirty).toBe(true);
    });
    
    test('test isLiveInUkDirty, isLiveInUkDirty and isAboutYouDirty when onNextStep', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { localVue, propsData: { additionalInfo: getAdditionalInfo(_liveInUk, _gitProfile, _aboutYou ), step: 0 } });

        expect(wrapper.vm.isLiveInUkDirty).toBe(false);
        expect(wrapper.vm.isGitProfileDirty).toBe(false);
        expect(wrapper.vm.isAboutYouDirty).toBe(false);

        wrapper.vm.onNextStep();

        expect(wrapper.vm.isLiveInUkDirty).toBe(true);
        expect(wrapper.vm.isGitProfileDirty).toBe(true);
        expect(wrapper.vm.isAboutYouDirty).toBe(true);
    });

    test('test isLiveInUkValid', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { localVue, propsData: { additionalInfo: getAdditionalInfo(_liveInUk, _gitProfile, _aboutYou ), step: 0 } });

        expect(wrapper.vm.isLiveInUkValid).toBe(true);
        wrapper.vm.liveInUk = null;
        expect(wrapper.vm.isLiveInUkValid).toBe(false);
    });

    test('test isGitProfileValid', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { localVue, propsData: { additionalInfo: getAdditionalInfo(_liveInUk, _gitProfile, _aboutYou ), step: 0 } });

        expect(wrapper.vm.isGitProfileValid).toBe(true);
        wrapper.vm.gitProfile = '';
        expect(wrapper.vm.isGitProfileValid).toBe(false);
    });

    test('test isEmailValid', () => {
        const wrapper = shallowMount(FormAdditionalInfo, { localVue, propsData: { additionalInfo: getAdditionalInfo(_liveInUk, _gitProfile, _aboutYou ), step: 0 } });

        expect(wrapper.vm.isAboutYouValid).toBe(true);
        wrapper.vm.aboutYou = '';
        expect(wrapper.vm.isAboutYouValid).toBe(false);
    });
});
