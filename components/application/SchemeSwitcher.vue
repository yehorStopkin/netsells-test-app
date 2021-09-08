<template>
    <div class="scheme-switcher">
        <div
            class="scheme-switcher__icon-wrapper"
            @click="onSetScheme(scheme.DARK)"
        >
            <div class="scheme-switcher__icon">
                <el-badge
                    v-if="isDarkMode"
                    class="scheme-switcher__icon-moon-badge"
                    is-dot
                >
                    <img src="~/assets/common/moon.svg" :alt="darkSchemeAlt" />
                </el-badge>

                <img
                    v-else
                    src="~/assets/common/moon.svg"
                    :alt="darkSchemeAlt"
                />
            </div>
        </div>

        <div
            class="scheme-switcher__icon-wrapper"
            @click="onSetScheme(scheme.LIGHT)"
        >
            <div class="scheme-switcher__icon">
                <el-badge
                    v-if="isLightMode"
                    class="scheme-switcher__icon-sun-badge"
                    is-dot
                >
                    <img src="~/assets/common/sun.svg" :alt="lightSchemeAlt" />
                </el-badge>

                <img
                    v-else
                    src="~/assets/common/sun.svg"
                    :alt="lightSchemeAlt"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import { Scheme } from '~/modules/types';

    @Component
    export default class SchemeSwitcher extends Vue {
        // fields
        scheme: typeof Scheme = Scheme;

        // getters
        /**
         * Getter for current scheme. 
         * 
         * @returns {Scheme}
         */
        get currentScheme(): Scheme {
            return this.$store.getters.scheme;
        }

        /**
         * Getter for alt text of dark scheme icon. 
         * 
         * @returns {string}
         */
        get darkSchemeAlt(): string {
            return 'Dark mode.';
        }

        /**
         * Getter for alt text of light scheme icon. 
         * 
         * @returns {string}
         */
        get lightSchemeAlt(): string {
            return 'Light mode.';
        }

        /**
         * Getter for checking if currentScheme is Dark. 
         * 
         * @returns {boolean}
         */
        get isDarkMode(): boolean {
            return this.currentScheme === Scheme.DARK;
        }

        /**
         * Getter for checking if currentScheme is Light. 
         * 
         * @returns {boolean}
         */
        get isLightMode(): boolean {
            return this.currentScheme === Scheme.LIGHT;
        }

        // handlers
        /**
         * Handler for setting scheme. 
         * 
         * @param {Scheme} scheme
         */
        onSetScheme(scheme: Scheme): void {
            if (this.currentScheme === scheme) {
                return;
            }

            this.$store.dispatch('setScheme', scheme);
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.scheme-switcher
    position: fixed
    bottom: variables.$applicationPadding
    left: variables.$applicationPadding
    display: flex

    &__icon-wrapper
        padding: 5px
        cursor: pointer
        margin-right: 20px

    &__icon, &__icon-wrapper, .el-badge
        display: flex
        align-items: center
        justify-content: center

    &__icon-moon-badge .el-badge__content
        top: 1
        left: -13px
        border-color: #303030

    &__icon-sun-badge .el-badge__content
        top: 1px
        left: 5px
</style>
