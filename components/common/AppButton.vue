<template>
    <el-button
        class="app-button"
        :style="styleObject"
        :disabled="disabled"
        @click="clickEvent"
    >
        {{ text }}
    </el-button>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

    @Component
    export default class AppButton extends Vue {
        // props
        @Prop(String) readonly text!: string;
        @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
        @Prop({ type: [Number, String], default: 1 }) readonly borderRadius!: number | string;
        @Prop({ type: [Number, String], default: 100 }) readonly width!: number | string;
        @Prop({ type: [Number, String], default: 0 }) readonly height!: number | string;
        @Prop({ type: [Number, String], default: 14 }) readonly paddingTop!: number | string;
        @Prop({ type: [Number, String], default: 19 }) readonly paddingBottom!: number | string;
        @Prop({ type: [Number, String], default: 20 }) readonly fontSize!: number | string;

        // emits
        /**
         * Emit of click. 
         */
        @Emit('clicked') clickEvent(): void {
            /* Empty */
        }

        // getters
        /**
         * Getter for style object for button, accoding the props.  
         * 
         * @returns {object}
         */
        get styleObject(): object {
            const styleObject = {
                borderRadius: `${ this.borderRadius }px`,
                width: `${ this.width }px`,
                paddingTop: `${ this.paddingTop }px`,
                paddingBottom: `${ this.paddingBottom }px`,
                fontSize: `${ this.fontSize }px`,
            } as any;

            if (this.height !== 0) {
                styleObject.height = `${ this.height }px`;
            }

            return styleObject;
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.app-button
    border: none
    background-color: variables.$liveColor
    color: white
    font-family: "Oswald"

    &:active, &:focus
        color: white

    &:hover
        color: variables.$lightSchemeGray

    &:hover, &:focus, &:active
        background-color: variables.$liveColor

</style>
