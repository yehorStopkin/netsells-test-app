<template>
    <div class="application-step-info">
        <div class="application-step-info__wrapper">
            <progress-bar
                class="application-step-info__progress-bar"
                :progress="progress"
            />

            <div class="application-step-info__title">{{ data.title }}</div>

            <div class="application-step-info__subtitle">
                {{ data.subtitle }}
            </div>

            <div class="application-step-info__details">{{ data.details }}</div>
        </div>

        <div class="application-step-info__action" @click="onStepSelect">
            <div v-if="data.isCompleted" class="application-step-info__action">
                <div class="application-step-info__action-text">
                    {{ doneText }}
                </div>
            </div>
            <div v-else class="application-step-info__action">
                <div class="application-step-info__action-text">
                    {{ completeText }}
                </div>
                <div class="application-step-info__action_arrow-icon" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
    import { Step } from '../types';
    import { ApplicationStepInfoData } from './types/index';
    import ProgressBar from '~/components/common/ProgressBar.vue';

    @Component({
        name: 'ApplicationStepInfo',
        components: { ProgressBar },
    })
    export default class ApplicationStepInfo extends Vue {
        // props
        @Prop(Object) readonly data!: ApplicationStepInfoData;

        // emits
        /**
         * Emit of step select. 
         * 
         * @param {Step} _step
         */
        @Emit('selected') selectEvent(_step: Step): void {
            /* Empty */
        }

        // getters
        /**
         * Getter for percentage progress. 
         * 
         * @returns {number}
         */
        get progress(): number {
            return this.data.filingPercentage;
        }

        /**
         * Getter for text of uncompleted. 
         * 
         * @returns {string}
         */
        get completeText(): string {
            return 'COMPLETE';
        }

        /**
         * Getter for text of completed. 
         * 
         * @returns {string}
         */
        get doneText(): string {
            return 'DONE';
        }

        // handlers
        /**
         * Handler for step selecting. 
         */
        onStepSelect(): void {
            this.selectEvent(this.data.stepNumber);
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.application-step-info
    border-radius: 10px

    .light &
        background: url(#{variables.$assetPath}/white-scheme/background-common.png) no-repeat

    .dark &
        background: url(#{variables.$assetPath}/dark-scheme/background-common.png) no-repeat

    &__wrapper
        width: 300px
        height: 386px
        box-sizing: border-box
        border: 3px solid
        border-top-right-radius: 5px
        border-top-left-radius: 5px
        border-bottom: none
        padding: 45px 40px

        .light &
            border-color: #ebebeb

        .dark &
            border-color: #383838

        .application-step-info
            &__progress-bar
                margin-bottom: 40px

            &__title
                margin-bottom: 25px
                font-family: "Oswald"
                font-size: 18px

                .light &
                    color: #6d6d6d

                .dark &
                    color: #c6c6c6

            &__subtitle
                margin-bottom: 30px
                font-family: "Heebo"
                font-weight: bold
                font-size: 30px

                .light &
                    color: variables.$lightSchemeExtraGray

                .dark &
                    color: #f4f4f4

            &__details
                margin-bottom: 70px
                font-family: "Oswald"
                font-size: 16px

                .light &
                    color: #6d6d6d

                .dark &
                    color: variables.$darkSchemeLightGray

    &__action
        display: flex
        align-items: center
        justify-content: center
        height: 70px
        border-bottom-right-radius: 5px
        border-bottom-left-radius: 5px
        cursor: pointer

        &_arrow-icon
            width: 22px
            height: 7px
            margin-top: 6px

            .light &
                background: url(#{variables.$assetPath}/white-scheme/arrow-right.svg) no-repeat

            .dark &
                background: url(#{variables.$assetPath}/dark-scheme/arrow-right.svg) no-repeat

        &-text
            margin-right: 10px
            font-family: "Oswald"
            font-size: 20px

            .light &
                color: variables.$lightSchemeExtraGray

            .dark &
                color: #c8c8c8

        .light &
            background-color: variables.$lightSchemeLightGray

        .dark &
            background-color: variables.$darkSchemeGray
</style>
