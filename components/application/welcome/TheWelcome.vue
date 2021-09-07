<template>
    <div class="the-welcome">
        <div class="the-welcome__title">{{ title }}</div>

        <div class="the-welcome__subtitle">{{ subtitle }}</div>

        <div class="the-welcome__actions">
            <app-button
                padding-top="24"
                padding-bottom="29"
                width="160"
                border-radius="0"
                :text="startButtonText"
                @clicked="startEvent"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Emit } from 'vue-property-decorator';

    @Component({
        name: 'TheWelcome',
        components: {},
    })
    export default class TheWelcome extends Vue {
        // emits
        /**
         * Emit of start. 
         */
        @Emit('started') startEvent(): void {
            /* Empty */
        }

        // getters
        /**
         * Getter for title. 
         * 
         * @returns {string}
         */
        get title(): string {
            return 'Welcome';
        }

        /**
         * Getter for subtitle. 
         * 
         * @returns {string}
         */
        get subtitle(): string {
            return 'We’re excited to see what you can do!';
        }

        /**
         * Getter for text of start button. 
         * 
         * @returns {string}
         */
        get startButtonText(): string {
            return 'BEGIN';
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.the-welcome
    max-width: 550px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    &__title
        font-family: "Oswald"
        font-size: 28px
        margin-bottom: 30px
        color: variables.$liveColor

    &__subtitle
        text-align: center
        font-family: "Heebo"
        font-size: 60px
        margin-bottom: 125px
        font-weight: 900

        .light &
            color: variables.$lightSchemeExtraGray

        .dark &
            color: #f4f4f4
</style>
