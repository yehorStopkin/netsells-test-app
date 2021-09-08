<template>
    <div class="form-personal-info">
        <form-header class="form-personal-info__header" :title="headerTitle" />

        <div class="form-personal-info__field">
            <div class="form-personal-info__field-title required">
                <label for="firstName">First Name</label>
            </div>

            <el-input
                id="firstName"
                v-model="firstName"
                v-validate="firstNameValidation"
                @change="onFirstNameChange"
            />
        </div>

        <div class="form-personal-info__field">
            <div class="form-personal-info__field-title">
                <label for="lastName">Second Name</label>
            </div>

            <el-input id="lastName" v-model="lastName" @change="onDataChange" />
        </div>

        <div class="form-personal-info__field">
            <div class="form-personal-info__field-title required">
                <label for="email">Email Address</label>
            </div>

            <el-input
                id="email"
                v-model="email"
                v-validate="emailValidation"
                @change="onEmailChange"
            />
        </div>

        <div class="form-personal-info__field">
            <div class="form-personal-info__field-title">
                <label for="phoneNumber">Phone Number</label>
            </div>

            <el-input
                id="phoneNumber"
                v-model="phoneNumber"
                @change="onDataChange"
            />
        </div>

        <div class="form-personal-info__actions">
            <app-button
                width="115"
                :text="nextButtonText"
                @clicked="onNextStep"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Emit, Prop, Watch } from 'vue-property-decorator';
    import { PersonalInfo, Step } from '../types';
    import FormHeader from './FormHeader.vue';
    import { Validation } from '~/modules/types';

    @Component({
        name: 'FormPersonalInfo',
        components: {
            FormHeader,
        },
    })
    export default class FormPersonalInfo extends Vue {
        // props
        @Prop(Object) readonly personalInfo!: PersonalInfo;
        @Prop(Number) readonly step!: Step;

        // fields
        firstName: string = '';
        lastName: string = '';
        email: string = '';
        phoneNumber: string = '';

        isFirstNameDirty: boolean = false;
        isEmailDirty: boolean = false;

        // watchers
        /**
         * Watcher of isFormValid, for emitting if it is changed. 
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
         * Emit input event of personalInfo for v-model. 
         * 
         * @param {PersonalInfo} _personalInfo
         */
        @Emit('update:personalInfo') updateEvent(_personalInfo: PersonalInfo): void {
            /* Empty */
        }

        /**
         * Emit next step select event. 
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
        created(): void {
            this.firstName = this.personalInfo.firstName;
            this.lastName = this.personalInfo.lastName || '';
            this.email = this.personalInfo.email;
            this.phoneNumber = this.personalInfo.phoneNumber || '';
        }

        // getters
        /**
         * Getter for title of header. 
         * 
         * @returns {string}
         */
        get headerTitle(): string {
            return 'Personal Details';
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
         * Getter for personalInfo. 
         * 
         * @returns {PersonalInfo}
         */
        get currentPersonalInfo(): PersonalInfo {
            return {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phoneNumber: this.phoneNumber,
            } as PersonalInfo;
        }

        /**
         * Getter for checking if firstName is valid. 
         * 
         * @returns {boolean}
         */
        get isFirstNameValid(): boolean {
            return this.firstName !== '';
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
         * Getter for firstName validator for directive v-validate. 
         * 
         * @returns {Validation}
         */
        get firstNameValidation(): Validation {
            return {
                skipValidation: !this.isFirstNameDirty,
                isValid: this.isFirstNameValid,
                querySelector: 'input',
                validationMessage: this.validationMessage,
            } as Validation;
        }

        /**
         * Getter for checking if email is valid. 
         * 
         * @returns {boolean}
         */
        get isEmailValid(): boolean {
            return this.email !== '';
        }

        /**
         * Getter for email validator for directive v-validate. 
         * 
         * @returns {Validation}
         */
        get emailValidation(): Validation {
            return {
                skipValidation: !this.isEmailDirty,
                isValid: this.isEmailValid,
                querySelector: 'input',
                validationMessage: this.validationMessage,
            } as Validation;
        }

        /**
         * Getter for checking if form is valid. 
         * 
         * @returns {boolean}
         */
        get isFormValid(): boolean {
            return this.isFirstNameValid && this.isEmailValid;
        }

        // handlers
        /**
         * Handler fro changing unvalidated field.
         */
        onDataChange(): void {
            this.updateEvent(this.currentPersonalInfo);
        }

        /**
         * Handler fro changing firstName. 
         * Start validation. 
         */
        onFirstNameChange(): void {
            this.isFirstNameDirty = true;
            this.updateEvent(this.currentPersonalInfo);
        }

        /**
         * Handler for changing email. 
         * Start validation. 
         */
        onEmailChange(): void {
            this.isEmailDirty = true;
            this.updateEvent(this.currentPersonalInfo);
        }

        /**
         * Handler for next step. 
         */
        onNextStep(): void {
            this.isFirstNameDirty = true;
            this.isEmailDirty = true;

            if (this.isFormValid) {
                this.nextStepSelectEvent();
            }
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.form-personal-info
    width: 485px

    &__header
        margin: 65px 0 60px 0

    &__field
        margin-bottom: 30px

        .el-input__inner
            background: transparent
            height: 70px
            font-family: "Oswald"
            font-size: 16px
            border-radius: 0

            .light &
                border-color: #d4d4d4
                color: variables.$lightSchemeExtraGray

            .dark &
                border-color: #4a4a4a
                color: #f4f4f4

    &__field-title
        margin-bottom: 20px
        font-family: "Oswald"
        font-size: 22px

        .light &
            color: variables.$lightSchemeExtraGray

        .dark &
            color: #f4f4f4

        &.required:after
            content: '*'
            color: variables.$liveColor

    &__actions
        display: flex
        justify-content: flex-end
</style>
