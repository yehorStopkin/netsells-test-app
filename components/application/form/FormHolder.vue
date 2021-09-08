<template>
    <div class="form-holder">
        <form-holder-header
            :current-step="currentStep"
            :filing-of-personal-info="filingOfPersonalInfo"
            :filing-of-additional-info="filingOfAdditionalInfo"
            :filing-of-additional-files="filingOfAdditionalFiles"
            :available-steps="availableSteps"
            @step-selected="onStepSelected"
            @next-step-selected="nextStepSelectEvent"
        />

        <component
            :is="currentForm"
            :step="currentStep"
            :personal-info.sync="personalInfo"
            :additional-info.sync="additionalInfo"
            :additional-files.sync="additionalFiles"
            @validation-changed="onValidationChanged"
            @next-step-selected="nextStepSelectEvent"
        />
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
    import {
        ApplicationForm,
        getDefaultAdditionalFiles,
        getDefaultAdditionalInfo,
        getDefaultPersonalInfo,
        Step,
    } from '../types/index';
    import { AdditionalFiles, AdditionalInfo, PersonalInfo } from '../types';
    import FormHolderHeader from './FormHolderHeader.vue';
    import FormPersonalInfo from './FormPersonalInfo.vue';
    import FormAdditionalInfo from './FormAdditionalInfo.vue';
    import FormAdditionalFiles from './FormAdditionalFiles.vue';

    @Component({
        name: 'FormHolder',
        components: {
            FormHolderHeader,
            FormPersonalInfo,
            FormAdditionalInfo,
            FormAdditionalFiles,
        },
    })
    export default class FormHolder extends Vue {
        // props
        @Prop(Number) readonly filingOfPersonalInfo!: number;
        @Prop(Number) readonly filingOfAdditionalInfo!: number;
        @Prop(Number) readonly filingOfAdditionalFiles!: number;
        @Prop(Object) readonly value!: ApplicationForm;
        @Prop(Number) readonly currentStep!: Step;
        @Prop(Array) readonly availableSteps!: Array<Step>;

        // fields
        innerPersonalInfo: PersonalInfo = getDefaultPersonalInfo();
        innerAdditionalInfo: AdditionalInfo = getDefaultAdditionalInfo();
        innerAdditionalFiles: AdditionalFiles = getDefaultAdditionalFiles();

        isPersonalInfoValid: boolean = false;
        isAdditionalInfoValid: boolean = false;
        isAdditionalFilesValid: boolean = false;

        step: typeof Step = Step;

        // Emits
        /**
         * Emit of applicationForm. 
         * 
         * @param {ApplicationForm} _applicationForm
         */
        @Emit('input') inputEvent(_applicationForm: ApplicationForm): void {
            /* Empty */
        }

        /**
         * Emit of step select. 
         * 
         * @param {Step} _step
         */
        @Emit('step-selected') stepSelectEvent(_step: Step): void {
            /* Empty */
        }

        /**
         * Emit of next step select. 
         */
        @Emit('next-step-selected') nextStepSelectEvent(): void {
            /* Empty */
        }

        // hooks
        created(): void {
            this.innerPersonalInfo = this.value.personalInfo;
            this.innerAdditionalInfo = this.value.additionalInfo;
            this.innerAdditionalFiles = this.value.additionalFiles;
        }

        /**
         * Getter for checking if show form of personal info. 
         * 
         * @returns {boolean}
         */
        get showPersonalInfoForm(): boolean {
            return this.currentStep === Step.PERSONAL_INFO;
        }

        /**
         * Getter for checking if show form of additional info. 
         * 
         * @returns {boolean}
         */
        get showAdditionalInfoForm(): boolean {
            return this.currentStep === Step.ADDITIONAL_INFO;
        }

        /**
         * Getter for checking if show form of additional files. 
         * 
         * @returns {boolean}
         */
        get showAdditionalFilesForm(): boolean {
            return this.currentStep === Step.ADDITIONAL_FILES;
        }

        /**
         * Getter for applicationForm. 
         * 
         * @returns {ApplicationForm}
         */
        get applicationForm(): ApplicationForm {
            return {
                personalInfo: this.innerPersonalInfo,
                additionalInfo: this.innerAdditionalInfo,
                additionalFiles: this.innerAdditionalFiles,
            } as ApplicationForm;
        }

        /**
         * 
         * Getter for name of component of current form. 
         * 
         * @returns {string} 
         */
        get currentForm(): string {
            switch (this.currentStep) {
                case Step.PERSONAL_INFO: {
                    return 'form-personal-info';
                }
                case Step.ADDITIONAL_INFO: {
                    return 'form-additional-info';
                }
                case Step.ADDITIONAL_FILES: {
                    return 'form-additional-files';
                }
            }
        }

        /**
         * Getter for personalInfo. 
         * 
         * @returns {PersonalInfo}
         */
        get personalInfo(): PersonalInfo {
            return this.innerPersonalInfo;
        }

        /**
         * Getter for additionalInfo. 
         * 
         * @returns {AdditionalInfo} 
         */
        get additionalInfo(): AdditionalInfo {
            return this.innerAdditionalInfo;
        }

        /**
         * Getter for additionalFiles. 
         * 
         * @returns {AdditionalFiles}
         */
        get additionalFiles(): AdditionalFiles {
            return this.innerAdditionalFiles;
        }

        // setters
        /**
         * Setter for _personalInfo. 
         * 
         * @param {PersonalInfo} personalInfo
         */
        set personalInfo(personalInfo: PersonalInfo) {
            this.innerPersonalInfo = personalInfo;
            this.inputEvent(this.applicationForm);
        }

        /**
         * Setter for _additionalInfo. 
         * 
         * @param {AdditionalInfo} additionalInfo
         */
        set additionalInfo(additionalInfo: AdditionalInfo) {
            this.innerAdditionalInfo = additionalInfo;
            this.inputEvent(this.applicationForm);
        }

        /**
         * Setter for _additionalFiles. 
         * 
         * @param {AdditionalFiles} additionalFiles
         */
        set additionalFiles(additionalFiles: AdditionalFiles) {
            this.innerAdditionalFiles = additionalFiles;
            this.inputEvent(this.applicationForm);
        }

        // handlers
        /**
         * Handler for changing personalInfo. 
         * 
         * @param {PersonalInfo} personalInfo
         */
        onPersonalInfoChanged(personalInfo: PersonalInfo): void {
            this.personalInfo = personalInfo;
            this.inputEvent(this.applicationForm);
        }

        /**
         * Handler for changing additionalInfo. 
         * 
         * @param {AdditionalInfo} additionalInfo
         */
        onAdditionalInfoChanged(additionalInfo: AdditionalInfo): void {
            this.additionalInfo = additionalInfo;
            this.inputEvent(this.applicationForm);
        }

        /**
         * Handler for changing additionalFiles. 
         * 
         * @param {AdditionalFiles} additionalFiles
         */
        onAdditionalFilesChanged(additionalFiles: AdditionalFiles): void {
            this.additionalFiles = additionalFiles;
            this.inputEvent(this.applicationForm);
        }

        /**
         * Handler for changing form valid for selected step. 
         * 
         * @param {Step} step 
         * 
         * @param {boolean} isValid
         */
        onValidationChanged(step: Step, isValid: boolean): void {
            switch (step) {
                case Step.PERSONAL_INFO: {
                    this.isPersonalInfoValid = isValid;
                    return;
                }
                case Step.ADDITIONAL_INFO: {
                    this.isAdditionalInfoValid = isValid;
                    return;
                }
                case Step.ADDITIONAL_FILES: {
                    this.isAdditionalFilesValid = isValid;
                }
            }
        }

        /**
         * Handler for step select. 
         * 
         * @param {Step} step
         */
        onStepSelected(step: Step): void {
            switch (this.currentStep) {
                case Step.PERSONAL_INFO: {
                    if (this.isPersonalInfoValid) {
                        this.stepSelectEvent(step);
                    }

                    return;
                }
                case Step.ADDITIONAL_INFO: {
                    if (this.isAdditionalInfoValid) {
                        this.stepSelectEvent(step);
                    }

                    return;
                }
                case Step.ADDITIONAL_FILES: {
                    if (this.isAdditionalFilesValid) {
                        this.stepSelectEvent(step);
                    }
                }
            }
        }
    }
</script>

<style lang="sass">
.form-holder
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
</style>
