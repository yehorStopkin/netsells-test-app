<template>
    <div class="form-header">
        <div class="form-header__title">
            {{ title }}
        </div>

        <div class="form-header__subtitle">
            <span class="form-header__subtitle required"> {{ subtitle }} </span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export default class FormHeader extends Vue {
        // props
        @Prop(String) readonly title!: string;

        // getters
        /**
         * Getter for subtitle. 
         * 
         * @returns {string}
         */
        get subtitle(): string {
            return 'Required fields are marked by an asterisk';
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.form-header
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

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
        font-size: 16px

        .light &
            color: variables.$darkSchemeLightGray

        .dark & 
            color: #676767

    &__subtitle.required:after
        content: '*'
        color: variables.$liveColor
</style>
