<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import { Phase, Scheme } from '@/modules/types';

    @Component
    export default class StyleMixin extends Vue {
        // fields

        // getters
        /**
         * Getter for current phase. 
         * 
         * @returns {Phase}
         */
        get currentPhase(): Phase {
            return this.$store.getters['application/phase'];
        }

        /**
         * Getter for background class, according of current phase. 
         * 
         * @returns {string}
         */
        get backgroundClass(): string {
            switch (this.currentPhase) {
                case Phase.WELCOME: {
                    return 'start';
                }
                case Phase.STEP_SELECTING: {
                    return 'common';
                }
                case Phase.FORM_FILING: {
                    return 'common';
                }
                case Phase.SUCCESS: {
                    return 'success';
                }
            }
        }
        
        /**
         * Getter for current component, according of current phase. 
         * 
         * @returns {string}
         */
        get currentComponent(): string {
            switch (this.currentPhase) {
                case Phase.WELCOME: {
                    return 'the-welcome';
                }
                case Phase.STEP_SELECTING: {
                    return 'application-step-selector';
                }
                case Phase.SUCCESS: {
                    return 'the-success';
                }
                default: {
                    return 'the-welcome';
                }
            }
        }

        /**
         * Getter for component margin top, according of current phase. 
         * 
         * @returns {number}
         */
        get currentComponentMarginTop(): number {
            switch (this.currentPhase) {
                case Phase.WELCOME: {
                    return 220;
                }
                case Phase.STEP_SELECTING: {
                    return 85;
                }
                case Phase.FORM_FILING: {
                    return 80;
                }
                case Phase.SUCCESS: {
                    return 300;
                }
            }
        }

        /**
         * Getter for style object for component. 
         * 
         * @returns {object}
         */
        get componentStyleObject(): object {
            return {
                marginTop: `${ this.currentComponentMarginTop }px`,
            };
        }

        /**
         * Getter for checking if current phase is FORM_FILING. 
         * 
         * @returns {boolean}
         */
        get isFormFillingPhase(): boolean {
            return this.currentPhase === Phase.FORM_FILING;
        }

        /**
         * Getter for scheme. 
         * 
         * @returns {Scheme}
         */
        get currentScheme(): Scheme {
            return this.$store.getters.scheme;
        }
    }
</script>
