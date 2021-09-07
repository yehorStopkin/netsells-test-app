<template>
    <div class="form-additional-info">
        <form-header
            class="form-additional-info__header"
            :title="headerTitle"
        />

        <div class="form-additional-info__field">
            <div class="form-additional-info__field-title required">
                <label for="liveInUk">Do you live in the UK?</label>
            </div>

            <el-select
                id="liveInUk"
                v-model="liveInUk"
                v-validate="liveInUkValidator"
                popper-class="form-additional-info__field-popper"
                @change="onLiveInUkChange"
            >
                <el-option
                    v-for="item in yesNoOptions"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
        </div>

        <div class="form-additional-info__field">
            <div class="form-additional-info__field-title required">
                <label for="gitProfile">Your Github Profile</label>
            </div>

            <el-input
                id="gitProfile"
                v-model="gitProfile"
                v-validate="gitProfileValidator"
                @change="onGitProfileChange"
            />
        </div>

        <div class="form-additional-info__field">
            <div class="form-additional-info__field-title required">
                <label for="aboutYou">About you</label>
            </div>

            <el-input
                id="aboutYou"
                v-model="aboutYou"
                v-validate="aboutYouValidator"
                type="textarea"
                :placeholder="aboutYourPlaceholder"
                rows="4"
                resize="none"
                @change="onAboutYouChange"
            />
        </div>

        <div class="form-additional-info__actions">
            <app-button
                width="115"
                :text="nextButtonText"
                @clicked="onNextStep"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
    import { AdditionalInfo, Step } from '../types';
    import FormHeader from './FormHeader.vue';
    import { Validation, YES_NO_OPTIONS } from '~/modules/types';

    @Component({
        name: 'FormAdditionalInfo',
        components: {
            FormHeader,
        },
    })
    export default class FormAdditionalInfo extends Vue {
        // props
        @Prop(Object) readonly value!: AdditionalInfo;
        @Prop(Number) readonly step!: Step;

        // fields
        readonly yesNoOptions: Array<object> = YES_NO_OPTIONS;
        liveInUk: null | boolean = null;
        gitProfile: string = '';
        aboutYou: string = '';

        isLiveInUkDirty: boolean = false;
        isGitProfileDirty: boolean = false;
        isAboutYouDirty: boolean = false;

        // watchers
        /**
         * Watcher for isFormValid. 
         * 
         * @param {boolean} val 
         * 
         * @param {boolean} oldVal
         */
        @Watch('isFormValid') watchIsFormValid(val: boolean, oldVal: boolean) {
            if (val === oldVal) {
                return;
            }

            this.validationChangeEvent(this.step, val);
        }

        // emits
        /**
         * Emit of change additionalInfo, as v-model. 
         * 
         * @param {AdditionalInfo} _additionalInfo 
         */
        @Emit('input') inputEvent(_additionalInfo: AdditionalInfo): void {
            /* Empty */
        }

        /**
         * Emit of select next step. 
         */
        @Emit('next-step-selected') nextStepSelectEvent(): void {
            /* Empty */
        }

        /**
         * Emit of change validation of current step. 
         * 
         * @param {Step} _step 
         * 
         * @param {boolean} _isValid
         */
        @Emit('validation-changed') validationChangeEvent(_step: Step, _isValid: boolean): void {
            /* Empty */
        }

        // hooks
        /**
         * Created hook for init data. 
         */
        created(): void {
            this.liveInUk = this.value.liveInUk;
            this.gitProfile = this.value.gitProfile || '';
            this.aboutYou = this.value.aboutYou;
        }

        // getters
        /**
         * Getter for title of header. 
         * 
         * @returns {string}
         */
        get headerTitle(): string {
            return 'More About You';
        }

        /**
         * Getter for placeholder of about you field. 
         * 
         * @returns {string}
         */
        get aboutYourPlaceholder(): string {
            return 'Let us know more about you. What are you in to?';
        }

        /**
         * Getter for text of next button. 
         * 
         * @returns {string}
         */
        get nextButtonText(): string {
            return 'NEXT';
        }

        /**
         * Getter for additionalInfo. 
         * 
         * @returns {AdditionalInfo}
         */
        get additionalInfo(): AdditionalInfo {
            return {
                liveInUk: this.liveInUk,
                gitProfile: this.gitProfile,
                aboutYou: this.aboutYou,
            } as AdditionalInfo;
        }

        /**
         * Getter for checking if isLiveInUk is valid. 
         * 
         * @returns {boolean}
         */
        get isLiveInUkValid(): boolean {
            return this.liveInUk !== null;
        }

        /**
         * Getter for checking if gitProfile is valid. 
         * 
         * @returns {boolean}
         */
        get isGitProfileValid(): boolean {
            return this.gitProfile !== '';
        }

        /**
         * Getter for checking if aboutYou is valid. 
         * 
         * @returns {boolean}
         */
        get isAboutYouValid(): boolean {
            return this.aboutYou !== '';
        }

        /**
         * Getter for validationMessage, when error will be occured. 
         * 
         * @returns {string}
         */
        get validationMessage(): string {
            return 'This field is required.';
        }

        /**
         * Getter for checking if form is valid. 
         * 
         * @returns {boolean}
         */
        get isFormValid(): boolean {
            return (
                this.isLiveInUkValid 
                && this.isGitProfileValid
                && this.isAboutYouValid
            );
        }

        /**
         * Getter for liveInUk validator for directive v-validate. 
         * 
         * @returns {Validation}
         */
        get liveInUkValidator(): Validation {
            return {
                skipValidation: !this.isLiveInUkDirty,
                isValid: this.isLiveInUkValid,
                querySelector: 'input',
                validationMessage: this.validationMessage,
            } as Validation;
        }

        /**
         * Getter for gitProfile validator for directive v-validate. 
         * 
         * @returns {Validation}
         */
        get gitProfileValidator(): Validation {
            return {
                skipValidation: !this.isGitProfileDirty,
                isValid: this.isGitProfileValid,
                querySelector: 'input',
                validationMessage: this.validationMessage,
            } as Validation;
        }

        /**
         * Getter for aboutYou validator for directive v-validate. 
         * 
         * @returns {Validation}
         */
        get aboutYouValidator(): Validation {
            return {
                skipValidation: !this.isAboutYouDirty,
                isValid: this.isAboutYouValid,
                querySelector: 'textarea',
                validationMessage: this.validationMessage,
            } as Validation;
        }

        // handlers
        /**
         * Handler for changing liveInUk. 
         * Start validation. 
         */
        onLiveInUkChange(): void {
            this.isLiveInUkDirty = true;
            this.inputEvent(this.additionalInfo);
        }
        
        /**
         * Handler for changing gitProfile. 
         * Start validation. 
         */
        onGitProfileChange(): void {
            this.isGitProfileDirty = true;
            this.inputEvent(this.additionalInfo);
        }

        /**
         * Handler for changing aboutYou. 
         * Start validation. 
         */
        onAboutYouChange(): void {
            this.isAboutYouDirty = true;
            this.inputEvent(this.additionalInfo);
        }

        /**
         * Handler for next step. 
         */
        onNextStep(): void {
            this.isLiveInUkDirty = true;
            this.isAboutYouDirty = true;
            this.isGitProfileDirty = true;

            if (this.isFormValid) {
                this.nextStepSelectEvent();
            }
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.form-additional-info
    width: 485px

    &__header
        margin: 65px 0

    &__field
        margin-bottom: 30px

        .el-input__inner, .el-textarea__inner
            background: transparent
            border-radius: 0
            font-family: "Oswald"
            font-size: 16px

            .light &
                border-color: #d4d4d4
                color: variables.$lightSchemeExtraGray

            .dark &
                border-color: #4a4a4a
                color: #f4f4f4

        .el-select
            width: 100%

        .el-input__inner
            height: 70px

        &-popper
            font-family: "Oswald"
            font-size: 16px

            .light &
                color: variables.$lightSchemeExtraGray

            .dark &
                color: #f4f4f4

    &__field-title
        margin-bottom: 20px
        font-family: "Oswald"
        font-size: 22px

        .ligth &
            color: variables.$lightSchemeExtraGray

        .dark &
            color: #f4f4f4

        &.required:after
            content: '*'
            color: variables.$liveColor

        &.required:after
            content: '*'
            color: variables.$liveColor

    &__actions
        display: flex
        justify-content: flex-end
</style>
