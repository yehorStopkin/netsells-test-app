<template>
    <div class="progress-bar">
        <div class="progress-bar__empty" />
        <div
            class="progress-bar__filled"
            :style="{ width: `${ filledWidth }` }"
        />
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export default class ProgressBar extends Vue {
        // props
        @Prop(Number) readonly progress!: number;

        // getters
        /**
         * Getter for width style, accoding to percentage of filling. 
         * 
         * @returns {string}
         */
        get filledWidth(): string {
            let progress = this.progress;

            if (this.progress < 0) {
                progress = 0;
            }

            if (this.progress > 100) {
                progress = 100;
            }

            return `${ progress }%`;
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.progress-bar
    position: relative
    height: 10px

    &__empty, &__filled
        height: 10px
        border-radius: 5px

    &__empty
        background-color: variables.$lightSchemeExtraLightGray
        width: 100%

        .dark &
            background-color: variables.$darkSchemeExtraGray

    &__filled
        position: absolute
        top: 0
        left: 0
        background-color: variables.$liveColor
</style>
