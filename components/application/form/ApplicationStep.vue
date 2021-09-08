<template>
    <div
        class="application-step"
        :class="{ selected }"
        @click="onStepSelect"
    >
        <div class="application-step__title">
            {{ title }}
        </div>

        <progress-bar
            class="application-step__progress-bar"
            :progress="progress"
        />
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
    import { Step } from '../types';
    import ProgressBar from '~/components/common/ProgressBar.vue';

    @Component({
        name: 'ApplicationStep',
        components: {
            ProgressBar,
        },
    })
    export default class ApplicationStep extends Vue {
        // props
        @Prop(Number) readonly step!: Step;
        @Prop(Boolean) readonly selected!: boolean;
        @Prop(String) readonly title!: string;
        @Prop(Number) readonly progress!: number;

        // emits
        /**
         * 
         * Step select event. 
         * 
         * @param {Step} _step
         */
        @Emit('step-selected') stepSelectEvent(_step: Step): void {
            /* Empty */
        }

        // handlers
        /**
         * Handler for step selecting.
         */
        onStepSelect(): void {
            this.stepSelectEvent(this.step);
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.application-step
    height: 90px
    border: 2px solid
    border-radius: 5px
    display: flex
    padding: 20px 95px
    width: 300px
    box-sizing: border-box
    flex-direction: column
    justify-content: center
    align-items: center
    cursor: pointer

    .light &
        border-color: #ebebeb
        background: url(#{variables.$assetPath}/white-scheme/background-common.png) no-repeat
        background-size: 100% 100%

    .dark &
        border-color: #383838
        background: url(#{variables.$assetPath}/dark-scheme/background-common.png) no-repeat
        background-size: 100% 100%

    &.selected
        border-color: variables.$liveColor

    &__title
        margin-bottom: 15px
        font-family: "Oswald"
        font-size: 18px

        .light &
            color: #6d6d6d

        .dark &
            color: #c6c6c6

    &__progress-bar
        width: 100%
</style>
