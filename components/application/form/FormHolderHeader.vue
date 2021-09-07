<template>
    <div class="form-holder-header">
        <application-step
            class="form-holder-header__application-step"
            :step="step.PERSONAL_INFO"
            :selected="personalInfoSelected"
            :can-be-selected="true"
            :title="personalInfoTitle"
            :progress="filingOfPersonalInfo"
            @step-selected="onStepSelect"
        />

        <application-step
            class="form-holder-header__application-step"
            :step="step.ADDITIONAL_INFO"
            :selected="additionalInfoSelected"
            :can-be-selected="true"
            :title="additionalInfoTitle"
            :progress="filingOfAdditionalInfo"
            @step-selected="onStepSelect"
        />

        <application-step
            class="form-holder-header__application-step"
            :step="step.ADDITIONAL_FILES"
            :selected="additionalFilesSelected"
            :can-be-selected="true"
            :title="additionalFilesTitle"
            :progress="filingOfAdditionalFiles"
            @step-selected="onStepSelect"
        />
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
    import { Step } from '../types';
    import ApplicationStep from './ApplicationStep.vue';

    @Component({
        name: 'FormHolderHeader',
        components: {
            ApplicationStep,
        },
    })
    export default class FormHolderHeader extends Vue {
        // props
        @Prop(Number) readonly currentStep!: Step;
        @Prop(Number) readonly filingOfPersonalInfo!: number;
        @Prop(Number) readonly filingOfAdditionalInfo!: number;
        @Prop(Number) readonly filingOfAdditionalFiles!: number;
        @Prop(Array) readonly availableSteps!: Array<Step>;

        // fields
        step: typeof Step = Step;

        // emits
        /**
         * Emit of select step. 
         * 
         * @param {Step} _step
         */
        @Emit('step-selected') stepSelectEvent(_step: Step): void {
            /* Empty */
        }

        // getters
        /**
         * Getter for title of personal info. 
         * 
         * @returns {string}
         */
        get personalInfoTitle(): string {
            return 'STEP 1';
        }

        /**
         * Getter for title of additional info. 
         * 
         * @returns {string}
         */
        get additionalInfoTitle(): string {
            return 'STEP 2';
        }

        /**
         * Getter for title of additional files. 
         * 
         * @returns {string}
         */
        get additionalFilesTitle(): string {
            return 'STEP 3';
        }

        /**
         * Getter for checking if personal info form selected at this moment. 
         * 
         * @returns {boolean}
         */
        get personalInfoSelected(): boolean {
            return this.currentStep === Step.PERSONAL_INFO;
        }

        /**
         * Getter for checking if additional info form selected at this moment. 
         * 
         * @returns {boolean}
         */
        get additionalInfoSelected(): boolean {
            return this.currentStep === Step.ADDITIONAL_INFO;
        }

        /**
         * Getter for checking if additional files form selected at this moment. 
         * 
         * @returns {boolean}
         */
        get additionalFilesSelected(): boolean {
            return this.currentStep === Step.ADDITIONAL_FILES;
        }

        // methods
        /**
         * Checing if selected step is current. 
         * 
         * @param {Step} step 
         * 
         * @returns {boolean}
         */
        isSelected(step: Step): boolean {
            return this.currentStep === step;
        }

        // handlers
        /**
         * handler for sper select. 
         * 
         * @param {Step} step
         */
        onStepSelect(step: Step): void {
            if (!this.availableSteps.includes(step)) {
                return;
            }

            this.stepSelectEvent(step);
        }
    }
</script>

<style lang="sass">
.form-holder-header
    display: flex
    align-items: center
    justify-content: center

    &__application-step+&__application-step
        margin-left: 85px
</style>
