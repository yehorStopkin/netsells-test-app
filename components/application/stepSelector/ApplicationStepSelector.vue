<template>
    <div class="application-step-selector">
        <div class="application-step-selector__header">
            <div class="application-step-selector__title">
                {{ title }}
            </div>

            <div class="application-step-selector__subtitle">
                {{ subtitle }}
            </div>
        </div>

        <div class="application-step-selector__steps">
            <application-step-info
                class="application-step-selector__step"
                :data="personalInfoStep"
                @selected="onSelectStep"
            />

            <application-step-info
                class="application-step-selector__step"
                :data="additionalInfoStep"
                @selected="onSelectStep"
            />

            <application-step-info
                class="application-step-selector__step"
                :data="additionalFilesStep"
                @selected="onSelectStep"
            />
        </div>

        <div v-if="canSubmit" class="application-step-selector__actions">
            <app-button
                v-loading="loading"
                padding-top="24"
                padding-bottom="29"
                width="220"
                border-radius="0"
                :text="submitButtonText"
                @clicked="submitEvent"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Emit, Prop } from 'vue-property-decorator';
    import { Step } from '../types';
    import ApplicationStepInfo from './ApplicationStepInfo.vue';
    import { ApplicationStepInfoData } from './types';

    @Component({
        name: 'StepSelector',
        components: { ApplicationStepInfo },
    })
    export default class StepSelector extends Vue {
        // props
        @Prop(Number) readonly filingOfPersonalInfo!: number;
        @Prop(Number) readonly filingOfAdditionalInfo!: number;
        @Prop(Number) readonly filingOfAdditionalFiles!: number;
        @Prop(Boolean) readonly isPersonalInfoCompleted!: boolean;
        @Prop(Boolean) readonly isAdditionalInfoCompleted!: boolean;
        @Prop(Boolean) readonly isAdditionalFilesCompleted!: boolean;
        @Prop(Boolean) readonly loading!: boolean;
        @Prop(Array) readonly availableSteps!: Array<Step>;

        // fields
        step: typeof Step = Step;

        // emits
        /**
         * Emit of step select. 
         * 
         * @param {Step} _step
         */
        @Emit('step-selected') selectStepEvent(_step: number): void {
            /* Empty */
        }

        /**
         * Emit of submit. 
         */
        @Emit('submited') submitEvent(): void {
            /* Empty */
        }

        // getters
        /**
         * Getter for title. 
         * 
         * @returns {string}
         */
        get title(): string {
            return 'Applications Steps';
        }

        /**
         * Getter for subtitle. 
         * 
         * @returns {string}
         */
        get subtitle(): string {
            return 'Select the step you wish to complete.';
        }

        /**
         * Getter for submit button text. 
         * 
         * @returns {string}
         */
        get submitButtonText(): string {
            return 'SUBMIT APPLICATION';
        }

        /**
         * Getter for checking if can submit application. 
         * 
         * @returns {boolean}
         */
        get canSubmit(): boolean {
            return (
                this.isPersonalInfoCompleted 
                && this.isAdditionalInfoCompleted 
                && this.isAdditionalFilesCompleted
            );
        }

        /**
         * Getter for personalInfoStep. 
         * 
         * @returns {ApplicationStepInfoData}
         */
        get personalInfoStep(): ApplicationStepInfoData {
            return {
                stepNumber: Step.PERSONAL_INFO,
                filingPercentage: this.filingOfPersonalInfo,
                isCompleted: this.isPersonalInfoCompleted,
                title: 'Step 1',
                subtitle: 'Personal Details',
                details:
                    'Please complete your personal details section by clicking complete.',
            } as ApplicationStepInfoData;
        }

        /**
         * Getter for additionalInfoStep. 
         * 
         * @returns {ApplicationStepInfoData}
         */
        get additionalInfoStep(): ApplicationStepInfoData {
            return {
                stepNumber: Step.ADDITIONAL_INFO,
                filingPercentage: this.filingOfAdditionalInfo,
                isCompleted: this.isAdditionalInfoCompleted,
                title: 'Step 2',
                subtitle: 'More About You',
                details: 'Please complete this section by clicking complete.',
            } as ApplicationStepInfoData;
        }

        /**
         * Getter for additionalFilesStep. 
         * 
         * @returns {ApplicationStepInfoData}
         */
        get additionalFilesStep(): ApplicationStepInfoData {
            return {
                stepNumber: Step.ADDITIONAL_FILES,
                filingPercentage: this.filingOfAdditionalFiles,
                isCompleted: this.isAdditionalFilesCompleted,
                title: 'Step 3',
                subtitle: 'Files Upload',
                details: 'Just upload your cover letter to complete this section.',
            } as ApplicationStepInfoData;
        }

        // methods

        // handlers
        /**
         * Handler for step selecting. 
         * 
         * @param {number} step
         */
        onSelectStep(step: number): void {
            if (this.loading) {
                return;
            }

            if (!this.availableSteps.includes(step)) {
                return;
            }
            
            this.selectStepEvent(step);
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.application-step-selector
    &__header
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center

        .application-step-selector
            &__title
                font-family: "Heebo"
                font-size: 30px
                font-weight: bold

                .light &
                    color: variables.$lightSchemeExtraGray

                .dark &
                    color: #f4f4f4

            &__subtitle
                font-family: "Oswald"
                font-weight: 16px
                margin-bottom: 80px

                .light &
                    color: #8d8d8d

                .dark &
                    color: variables.$darkSchemeLightGray

    &__steps
        display: flex

    &__step+&__step
        margin-left: 85px

    &__actions
        display: flex
        align-items: center
        justify-content: center
        margin-top: 65px
</style>
