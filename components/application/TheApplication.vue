<template>
    <div
        class="the-application"
        :class="[currentScheme === scheme.LIGHT ? 'light' : 'dark', backgroundClass]"
    >
        <application-header data-test-id="application-header" />

        <div class="the-application__component" :style="componentStyleObject">
            <form-holder
                v-if="isFormFillingPhase"
                v-model="applicationForm"
                data-test-id="form-holder"
                :filing-of-personal-info="filingOfPersonalInfo"
                :filing-of-additional-info="filingOfAdditionalInfo"
                :filing-of-additional-files="filingOfAdditionalFiles"
                :current-step="currentStep"
                :available-steps="availableSteps"
                @step-selected="onStepSelect"
                @next-step-selected="onNextStepSelected"
            />

            <component
                :is="currentComponent"
                v-else
                data-test-id="dynamic-component"
                :filing-of-personal-info="filingOfPersonalInfo"
                :is-personal-info-completed="isPersonalInfoCompleted"
                :filing-of-additional-info="filingOfAdditionalInfo"
                :is-additional-info-completed="isAdditionalInfoCompleted"
                :filing-of-additional-files="filingOfAdditionalFiles"
                :is-additional-files-completed="isAdditionalFilesCompleted"
                :current-step="currentStep"
                :loading="loading"
                :available-steps="availableSteps"
                @started="onStart"
                @step-selected="onStepSelect"
                @filled="onFilled"
                @submited="onSubmit"
                @reseted="onReset"
            />
        </div>

        <scheme-switcher />
    </div>
</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import { Action } from 'vuex-class';
    import { Message } from 'element-ui';
    import TheWelcome from './welcome/TheWelcome.vue';
    import StepSelector from './stepSelector/ApplicationStepSelector.vue';
    import FormHolder from './form/FormHolder.vue';
    import TheSuccess from './success/TheSuccess.vue';
    import ApplicationHeader from './ApplicationHeader.vue';
    import SchemeSwitcher from './SchemeSwitcher.vue';
    import { Step } from './types/index';
    import StyleMixin from './mixins/StyleMixin.vue';
    import DataMixin from './mixins/DataMixin.vue';
    import { Scheme, Phase } from '~/modules/types';
    import { sendApplication } from '@/modules/api/application';

    @Component({
        name: 'TheApplication',
        components: {
            TheWelcome,
            StepSelector,
            FormHolder,
            TheSuccess,
            ApplicationHeader,
            SchemeSwitcher,
        },
        mixins: [StyleMixin],
    })
    export default class TheApplication extends DataMixin {
        // actions
        @Action('application/setPhase') setPhase!: (phase: Phase) => void
        
        // fields
        scheme: typeof Scheme = Scheme;
        loading: boolean = false;

        // hooks

        // getters

        // methods
        /**
         * Method for displaying error message for user. 
         * 
         * @param {string} message
         */
        showErrorMessage(message: string): void {
            Message({
                message,
                showClose: true,
                type: 'error',
                duration: 10 * 1000,
                customClass: 'error-message',
            });
        }

        /**
         * Method for displaying request errors for user. 
         * 
         * @param {any} error
         */
        showRequestErrors(error: any): void {
            const errorData = error.response?.data || null;

            if (errorData === null) {
                this.showErrorMessage('Unknown error');
                return;
            }

            let errorMessage = errorData.message || '';

            const errors = errorData.errors || {};

            errorMessage += Object.values(errors).join(' ');

            this.showErrorMessage(errorMessage);
        }

        // handlers
        /**
         * Handler for starting. 
         */
        onStart(): void {
            this.selectPhase(Phase.STEP_SELECTING);
        }

        /**
         * Handler for next step selecting, according to currentStep. 
         */
        onNextStepSelected(): void {
            switch (this.currentStep) {
                case Step.PERSONAL_INFO: {
                    this.currentStep = Step.ADDITIONAL_INFO;
                    return;
                }
                case Step.ADDITIONAL_INFO: {
                    this.currentStep = Step.ADDITIONAL_FILES;
                    return;
                }
                default: {
                    this.setPhase(Phase.STEP_SELECTING);
                }
            }
        }

        /**
         * Handler for step selecting. 
         * 
         * @param {Step} step
         */
        onStepSelect(step: Step): void {
            this.currentStep = step;

            this.selectPhase(Phase.FORM_FILING);
        }

        /**
         * Handler for ending filling form. 
         */
        onFilled(): void {
            this.selectPhase(Phase.STEP_SELECTING);
        }

        /**
         * Handler for submiting application. 
         */
        async onSubmit(): Promise<void> {
            try {
                const request = await this.buildRequest();

                this.loading = true;

                await sendApplication(request);

                this.setPhase(Phase.SUCCESS);
            } catch (error) {
                this.showRequestErrors(error);
            } finally {
                this.loading = false;
            }
        }

        /**
         * Handler for reseting. 
         */
        onReset(): void {
            this.resetInfo();
            this.resetPhase();
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.the-application
    position: relative
    min-height: calc(100vh - #{variables.$applicationPadding * 2})
    height: auto
    padding: variables.$applicationPadding

    &.light
        &.start
            background: url(#{variables.$assetPath}/white-scheme/background-start.png) no-repeat
            background-size: 100% 100%

        &.common
            background: url(#{variables.$assetPath}/white-scheme/background-common.png) no-repeat
            background-size: 100% 100%

        &.success
            background: url(#{variables.$assetPath}/white-scheme/background-success.png) no-repeat
            background-size: 100% 100%

        ::-webkit-input-placeholder
            color: variables.$darkSchemeLightGray

        :-moz-placeholder
            color: variables.$darkSchemeLightGray

        ::-moz-placeholder
            color: variables.$darkSchemeLightGray

        :-ms-input-placeholder
            color: variables.$darkSchemeLightGray

    &.dark
        &.start
            background: url(#{variables.$assetPath}/dark-scheme/background-start.png) no-repeat
            background-size: 100% 100%

        &.common
            background: url(#{variables.$assetPath}/dark-scheme/background-common.png) no-repeat
            background-size: 100% 100%

        &.success
            background: url(#{variables.$assetPath}/dark-scheme/background-success.png) no-repeat
            background-size: 100% 100%

        ::-webkit-input-placeholder
            color: #737373

        :-moz-placeholder
            color: #737373

        ::-moz-placeholder
            color: #737373

        :-ms-input-placeholder
            color: #737373

.the-application__component
    display: flex
    align-items: center
    justify-content: center
</style>
