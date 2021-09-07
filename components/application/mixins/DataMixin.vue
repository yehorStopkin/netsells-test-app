<script lang="ts" >
    import { Vue, Component } from 'vue-property-decorator';
    import {
        AdditionalFiles,
        AdditionalInfo,
        ApplicationForm,
        getDefaultApplicationForm,
        PersonalInfo,
        Step,
    } from '../types';
    import { Phase } from '~/modules/types';

    @Component
    export default class DataMixin extends Vue {
        // fields
        currentStep: Step = Step.PERSONAL_INFO;
        applicationForm: ApplicationForm = getDefaultApplicationForm();

        // getters
        /**
         * Getter for personalInfo. 
         * 
         * @returns {PersonalInfo}
         */
        get personalInfo(): PersonalInfo {
            return this.applicationForm.personalInfo;
        }

        /**
         * Getter for additionalInfo. 
         * 
         * @returns {AdditionalInfo}
         */
        get additionalInfo(): AdditionalInfo {
            return this.applicationForm.additionalInfo;
        }

        /**
         * Getter for additionalFiles. 
         * 
         * @returns {AdditionalFiles}
         */
        get additionalFiles(): AdditionalFiles {
            return this.applicationForm.additionalFiles;
        }

        /**
         * Getter for percentage of personal info filled. 
         * 
         * @returns {number}
         */
        get filingOfPersonalInfo(): number {
            let result = 0;

            result += this.personalInfo.firstName !== '' ? 25 : 0;
            result += this.personalInfo.lastName !== '' ? 25 : 0;
            result += this.personalInfo.email !== '' ? 25 : 0;
            result += this.personalInfo.phoneNumber !== '' ? 25 : 0;

            return result;
        }

        /**
         * Getter for checking if personal info completed. 
         * 
         * @returns {boolean}
         */
        get isPersonalInfoCompleted(): boolean {
            if (this.personalInfo.firstName === '' || this.personalInfo.email === '') {
                return false;
            }

            return true;
        }

        /**
         * Getter for percentage of additional info filled. 
         * 
         * @returns {number}
         */
        get filingOfAdditionalInfo(): number {
            let result = 0;

            result += this.additionalInfo.liveInUk !== null ? 33 : 0;
            result += this.additionalInfo.gitProfile !== '' ? 33 : 0;
            result += this.additionalInfo.aboutYou !== '' ? 33 : 0;

            if (result === 99) {
                result = 100;
            }

            return result;
        }

        /**
         * Getter for checking if additional info completed. 
         * 
         * @returns {boolean}
         */
        get isAdditionalInfoCompleted(): boolean {
            return this.filingOfAdditionalInfo === 100;
        }

        /**
         * Getter for percentage of additional files filled. 
         * 
         * @returns {number}
         */
        get filingOfAdditionalFiles(): number {
            let result = 0;

            result += this.additionalFiles.cv !== null ? 50 : 0;
            result += this.additionalFiles.coverLetter !== null ? 50 : 0;

            return result;
        }

        /**
         * Getter for checking if additional files completed. 
         * 
         * @returns {boolean}
         */
        get isAdditionalFilesCompleted(): boolean {
            if (this.additionalFiles.cv === null) {
                return false;
            }

            return true;
        }

        /**
         * Getter for available steps, according to completion of steps. 
         * 
         * @returns {Array<Step>}
         */
        get availableSteps(): Array<Step> {
            const result = [Step.PERSONAL_INFO];

            if (this.isPersonalInfoCompleted) {
                result.push(Step.ADDITIONAL_INFO);
            }

            if (this.isAdditionalInfoCompleted) {
                result.push(Step.ADDITIONAL_FILES);
            }

            return result;
        }

        // methods
        /**
         * Reset filled info. 
         */
        resetInfo(): void {
            this.applicationForm = getDefaultApplicationForm();
        }

        /**
         * Reset current phase. 
         */
        resetPhase(): void {
            this.$store.dispatch('application/setPhase', Phase.WELCOME);
        }

        /**
         * Select current phase. 
         * 
         * @param {Phase} phase
         */
        selectPhase(phase: Phase): void {
            this.$store.dispatch('application/setPhase', phase);
        }

        /**
         * Get data for request. 
         * 
         * @returns {FormData}
         */
        buildRequest(): FormData {
            const formData = new FormData();

            formData.append(
                'first_name',
                this.applicationForm.personalInfo.firstName,
            );

            formData.append(
                'last_name',
                this.applicationForm.personalInfo.lastName || '',
            );

            formData.append('email', this.applicationForm.personalInfo.email);

            formData.append(
                'phone_number',
                this.applicationForm.personalInfo.phoneNumber || '',
            );

            formData.append(
                'live_in_uk',
                String(this.applicationForm.additionalInfo.liveInUk),
            );

            formData.append(
                'git_profile',
                this.applicationForm.additionalInfo.gitProfile,
            );

            formData.append(
                'about_you',
                this.applicationForm.additionalInfo.aboutYou,
            );

            formData.append('cv', this.applicationForm.additionalFiles.cv.raw);

            const coverLetter = this.applicationForm.additionalFiles.coverLetter;

            if (coverLetter !== null) {
                formData.append(
                    'cover_letter',
                    this.applicationForm.additionalFiles.coverLetter.raw,
                );
            }

            return formData;
        }
    }
</script>
