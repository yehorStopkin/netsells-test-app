<template>
    <div class="the-success">
        <div class="the-success__title">{{ title }}</div>

        <div class="the-success__subtitle">{{ subtitle }}</div>

        <div class="the-success__message">{{ message }}</div>

        <div class="the-success__actions">
            <app-button
                width="115"
                :text="nextButtonText"
                @clicked="resetEvent"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Emit } from 'vue-property-decorator';

    @Component({
        name: 'TheSuccess',
        components: {},
    })
    export default class TheSuccess extends Vue {
        // emits
        /**
         * Emit of reset. 
         */
        @Emit('reseted') resetEvent(): void {
            /* Empty */
        }

        // getters
        /**
         * Getter for title. 
         * 
         * @returns {string}
         */
        get title(): string {
            return 'Success!';
        }

        /**
         * Getter for subtitle. 
         * 
         * @returns {string}
         */
        get subtitle(): string {
            return 'Thank You';
        }

        /**
         * Getter for message. 
         * 
         * @returns {string}
         */
        get message(): string {
            return 'Our team will response to you within the next 48h';
        }

        /**
         * Getter for text of next button. 
         * 
         * @returns {string}
         */
        get nextButtonText(): string {
            return 'HOME';
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.the-success
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    &__title
        margin-bottom: 30px
        font-family: "Oswald"
        font-size: 28px
        color: variables.$liveColor

    &__subtitle
        margin-bottom: 45px
        font-family: "Heebo"
        font-size: 60px
        font-weight: 900

        .light &
            color: variables.$lightSchemeExtraGray

        .dark &
            color: #f4f4f4

    &__message
        margin-bottom: 65px
        font-family: "Oswald"
        font-size: 22px

        .light &
            color: variables.$darkSchemeLightGray

        .dark &
            color: #f4f4f4
</style>
