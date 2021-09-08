const Vuex = require('vuex');
const { shallowMount, createLocalVue } = require('@vue/test-utils');
const DataMixin = require('@/components/application/mixins/DataMixin').default;
const { getDefaultApplicationForm } = require('@/components/application/types/index');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('DataMixin', () => {
    let actions;
    let getters;
    let store;

    beforeEach(() => {
        actions = {
            setScheme: jest.fn(),
            setPhase: jest.fn(),
            'application/setPhase': jest.fn(),
        };
        getters = {
            scheme: () => 0,
            'application/phase': () => 0,
        };
        store = new Vuex.Store({
            actions, getters,
        });
    });

    test('component default', () => {
        const wrapper = shallowMount(DataMixin, { store, localVue });
        expect(wrapper.exists()).toBeTruthy();
    });

    test('depends filingOfPersonalInfo on personalInfo filing', () => {
        const wrapper = shallowMount(DataMixin, { store, localVue });
        expect(wrapper.vm.filingOfPersonalInfo).toBe(0);

        wrapper.vm.personalInfo.firstName = 'test first name';
        expect(wrapper.vm.filingOfPersonalInfo).toBe(25);

        wrapper.vm.personalInfo.lastName = 'test last name';
        expect(wrapper.vm.filingOfPersonalInfo).toBe(50);

        wrapper.vm.personalInfo.email = 'test email';
        expect(wrapper.vm.filingOfPersonalInfo).toBe(75);

        wrapper.vm.personalInfo.phoneNumber = 'test phone number';
        expect(wrapper.vm.filingOfPersonalInfo).toBe(100);
    });

    test('depends isPersonalInfoCompleted on personalInfo filing', () => {
        const wrapper = shallowMount(DataMixin, { store, localVue });
        expect(wrapper.vm.isPersonalInfoCompleted).toBe(false);

        wrapper.vm.personalInfo.firstName = 'test first name';
        expect(wrapper.vm.isPersonalInfoCompleted).toBe(false);

        wrapper.vm.personalInfo.firstName = '';
        wrapper.vm.personalInfo.email = 'test email';
        expect(wrapper.vm.isPersonalInfoCompleted).toBe(false);

        wrapper.vm.personalInfo.firstName = 'test first name';
        wrapper.vm.personalInfo.email = 'test email';
        expect(wrapper.vm.isPersonalInfoCompleted).toBe(true);
    });

    test('depends filingOfAdditionalInfo on additionalInfo filing', () => {
        const wrapper = shallowMount(DataMixin, { store, localVue });
        expect(wrapper.vm.filingOfAdditionalInfo).toBe(0);

        wrapper.vm.additionalInfo.liveInUk = true;
        expect(wrapper.vm.filingOfAdditionalInfo).toBe(34);

        wrapper.vm.additionalInfo.gitProfile = 'test gitProfile';
        expect(wrapper.vm.filingOfAdditionalInfo).toBe(67);

        wrapper.vm.additionalInfo.aboutYou = 'test aboutYou';
        expect(wrapper.vm.filingOfAdditionalInfo).toBe(100);
    });

    test('depends isAdditionalInfoCompleted on filingOfAdditionalInfo', () => {
        const wrapper = shallowMount(DataMixin, { store, localVue });
        expect(wrapper.vm.isAdditionalInfoCompleted).toBe(false);

        wrapper.vm.additionalInfo.liveInUk = true;
        wrapper.vm.additionalInfo.gitProfile = 'test gitProfile';
        wrapper.vm.additionalInfo.aboutYou = 'test aboutYou';

        expect(wrapper.vm.isAdditionalInfoCompleted).toBe(true);
    });

    test('depends filingOfAdditionalFiles on additionalFiles filing', () => {
        const wrapper = shallowMount(DataMixin, { store, localVue });
        expect(wrapper.vm.filingOfAdditionalFiles).toBe(0);

        wrapper.vm.additionalFiles.cv = {};
        expect(wrapper.vm.filingOfAdditionalFiles).toBe(50);

        wrapper.vm.additionalFiles.coverLetter = {};
        expect(wrapper.vm.filingOfAdditionalFiles).toBe(100);
    });

    test('depends isAdditionalFilesCompleted on additionalFiles filing', () => {
        const wrapper = shallowMount(DataMixin, { store, localVue });
        expect(wrapper.vm.isAdditionalFilesCompleted).toBe(false);

        wrapper.vm.additionalFiles.cv = {};

        expect(wrapper.vm.isAdditionalFilesCompleted).toBe(true);
    });

    test('default availableSteps', () => {
        const wrapper = shallowMount(DataMixin, { store, localVue });
        expect(JSON.stringify(wrapper.vm.availableSteps)).toBe(JSON.stringify([0]));
    });

    test('availableSteps depend on personalInfo and  additionalInfo', () => {
        const wrapper = shallowMount(DataMixin, { store, localVue });
        expect(JSON.stringify(wrapper.vm.availableSteps)).toBe(JSON.stringify([0]));

        wrapper.vm.personalInfo.firstName = 'test first name';
        wrapper.vm.personalInfo.email = 'test email';

        expect(JSON.stringify(wrapper.vm.availableSteps)).toBe(JSON.stringify([0, 1]));

        wrapper.vm.additionalInfo.liveInUk = true;
        wrapper.vm.additionalInfo.gitProfile = 'test gitProfile';
        wrapper.vm.additionalInfo.aboutYou = 'test aboutYou';

        expect(JSON.stringify(wrapper.vm.availableSteps)).toBe(JSON.stringify([0, 1, 2]));
    });

    test('check resetInfo method', () => {
        const wrapper = shallowMount(DataMixin, { store, localVue });

        wrapper.vm.applicationForm = {};

        expect(JSON.stringify(wrapper.vm.applicationForm)).not.toBe(JSON.stringify(getDefaultApplicationForm()));

        wrapper.vm.resetInfo();

        expect(JSON.stringify(wrapper.vm.applicationForm)).toBe(JSON.stringify(getDefaultApplicationForm()));
    });

    test('check resetPhase method', () => {
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, scheme: () => 1 } });
        const wrapper = shallowMount(DataMixin, { store: updatedStore, localVue });

        wrapper.vm.resetPhase();

        expect(actions['application/setPhase']).toHaveBeenCalledTimes(1);
        expect(actions['application/setPhase'].mock.calls[0][1]).toBe(0);
    });

    test('check selectPhase method', () => {
        const newPhase = 3;
        const updatedStore = new Vuex.Store({ actions, getters: { ...getters, scheme: () => 1 } });
        const wrapper = shallowMount(DataMixin, { store: updatedStore, localVue });

        wrapper.vm.selectPhase(newPhase);

        expect(actions['application/setPhase']).toHaveBeenCalledTimes(1);
        expect(actions['application/setPhase'].mock.calls[0][1]).toBe(newPhase);
    });

});
