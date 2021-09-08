<template>
    <div class="form-additional-files">
        <form-header
            class="form-additional-files__header"
            :title="headerTitle"
        />

        <div class="form-additional-files__field">
            <el-upload
                v-validate="cvValidator"
                drag
                action=""
                :auto-upload="autoUpload"
                :show-file-list="showFileList"
                :on-change="onCvChanged"
            >
                <div
                    v-if="!cvUploaded"
                    class="form-additional-files__field_empty"
                >
                    <div class="form-additional-files__field-icon required" />
                    <div class="form-additional-files__field-title">
                        {{ cvEmptyTitle }}
                    </div>
                    <div class="form-additional-files__field-subtitle">
                        <span>{{ cvEmptySubtitle }}</span>
                        <span class="form-additional-files__field-upload-link">
                            {{ uploadLinkText }}
                        </span>
                    </div>
                </div>
                <div v-else class="form-additional-files__field_uploaded">
                    <div class="form-additional-files__field-title-wrapper">
                        <div class="form-additional-files__field-icon" />
                        <div
                            class="form-additional-files__field-title"
                            :title="cvName"
                        >
                            {{ cvName }}
                        </div>
                    </div>

                    <div class="form-additional-files__field-subtitle">
                        <span>{{ uploadedTitle }}</span>
                        <span class="form-additional-files__field-upload-link">
                            {{ uploadLinkText }}
                        </span>
                    </div>
                </div>
            </el-upload>
        </div>

        <div class="form-additional-files__field">
            <el-upload
                drag
                action=""
                :auto-upload="autoUpload"
                :show-file-list="showFileList"
                :on-change="onCoverLetterChanged"
            >
                <div
                    v-if="!coverLetterUploaded"
                    class="form-additional-files__field_empty"
                >
                    <div class="form-additional-files__field-icon" />
                    <div class="form-additional-files__field-title">
                        {{ coverLetterEmptyTitle }}
                    </div>
                    <div class="form-additional-files__field-subtitle">
                        <span>{{ coverLetterEmptySubtitle }}</span>
                        <span class="form-additional-files__field-upload-link">
                            {{ uploadLinkText }}
                        </span>
                    </div>
                </div>
                <div v-else class="form-additional-files__field_uploaded">
                    <div class="form-additional-files__field-title-wrapper">
                        <div class="form-additional-files__field-icon" />
                        <div
                            class="form-additional-files__field-title"
                            :title="coverLetterName"
                        >
                            {{ coverLetterName }}
                        </div>
                    </div>

                    <div class="form-additional-files__field-subtitle">
                        <span>{{ uploadedTitle }}</span>
                        <span class="form-additional-files__field-upload-link">
                            {{ uploadLinkText }}
                        </span>
                    </div>
                </div>
            </el-upload>
        </div>

        <div class="form-additional-files__actions">
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
    import { AdditionalFiles, Step } from '../types';
    import FormHeader from './FormHeader.vue';
    import { Validation } from '~/modules/types';

    @Component({
        name: 'FormAdditionalFiles',
        components: {
            FormHeader,
        },
    })
    export default class FormAdditionalFiles extends Vue {
        // props
        @Prop(Object) readonly additionalFiles!: AdditionalFiles;
        @Prop(Number) readonly step!: Step;

        // fields
        autoUpload: boolean = false;
        showFileList: boolean = false;
        cv: any = null;
        coverLetter: any = null;

        isCvDirty: boolean = false;

        // watchers
        /**
         * Watcher on isFormValid. 
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
         * Emit input event of additionalFiles for v-model. 
         * 
         * @param {AdditionalFiles} _additionalFiles
         */
        @Emit('update:additionalFiles') updateEvent(_additionalFiles: AdditionalFiles): void {
            /* Empty */
        }

        /**
         * Emit next step select event. 
         */
        @Emit('next-step-selected') nextStepSelectEvent(): void {
            /* Empty */
        }

        /**
         * Emit validation change event of current step. 
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
            this.cv = this.additionalFiles.cv;
            this.coverLetter = this.additionalFiles.coverLetter || null;
        }

        // getters
        /**
         * Getter for header title. 
         * 
         * @returns {string}
         */
        get headerTitle(): string {
            return 'Files Upload';
        }

        /**
         * Getter for title of epmty cv. 
         * 
         * @returns {string}
         */
        get cvEmptyTitle(): string {
            return 'Upload Your CV';
        }

        /**
         * Getter for title of uploaded file. 
         * 
         * @returns {string}
         */
        get uploadedTitle(): string {
            return 'Reupload a new file';
        }

        /**
         * Getter for subtitle of empty cv. 
         * 
         * @returns {string}
         */
        get cvEmptySubtitle(): string {
            return 'Drag and drop or Upload your CV file';
        }

        /**
         * Getter for upload link. 
         * 
         * @returns {string}
         */
        get uploadLinkText(): string {
            return 'here';
        }

        /**
         * Getter for check if cv is uploaded. 
         * 
         * @returns {boolean}
         */
        get cvUploaded(): boolean {
            return this.cv !== null;
        }

        /**
         * Getter for checking if cover letter is uploaded. 
         * 
         * @returns {boolean}
         */
        get coverLetterUploaded(): boolean {
            return this.coverLetter !== null;
        }

        /**
         * Getter for name of uploaded cv. 
         * 
         * @returns {string}
         */
        get cvName(): string {
            if (this.cv === null) {
                return '';
            }

            return this.cv.name;
        }

        /**
         * Getter for name of uploaded cover letter. 
         * 
         * @returns {string}
         */
        get coverLetterName(): string {
            if (this.coverLetter === null) {
                return '';
            }

            return this.coverLetter.name;
        }

        /**
         * Getter for title of empty cover letter. 
         * 
         * @returns {string}
         */
        get coverLetterEmptyTitle(): string {
            return 'Upload Your Cover Letter';
        }

        /**
         * Getter for subtitle of cover letter. 
         * 
         * @returns {string}
         */
        get coverLetterEmptySubtitle(): string {
            return 'Drag and frop or Upload your Cover Letter file';
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
         * Getter for additional files. 
         * 
         * @returns {AdditionalFiles}
         */
        get currentAdditionalFiles(): AdditionalFiles {
            return {
                cv: this.cv,
                coverLetter: this.coverLetter,
            } as AdditionalFiles;
        }

        /**
         * Getter for checking if cv valid. 
         * 
         * @returns {boolean}
         */
        get isCvValid(): boolean {
            return this.cv !== null;
        }

        /**
         * Getter for validation message for fields. 
         * 
         * @returns {string}
         */
        get validationMessage(): string {
            return 'This field is required.';
        }

        /**
         * Getter for cv validator for directive v-validate. 
         * 
         * @returns {Validation}
         */
        get cvValidator(): Validation {
            return {
                skipValidation: !this.isCvDirty,
                isValid: this.isCvValid,
                querySelector: '.el-upload-dragger',
                validationMessage: this.validationMessage,
            } as Validation;
        }

        /**
         * Getter for checking if form valid. 
         * 
         * @returns {boolean}
         */
        get isFormValid(): boolean {
            return this.isCvValid;
        }

        // handlers
        /**
         * Handler for changing upload cv. 
         * 
         * @param {any} cv
         */
        onCvChanged(cv: any): void {
            this.cv = cv;
            this.isCvDirty = true;
            this.updateEvent(this.currentAdditionalFiles);
        }

        /**
         * Handler for changing upload cover letter. 
         * 
         * @param {any} coverLetter
         */
        onCoverLetterChanged(coverLetter: any): void {
            this.coverLetter = coverLetter;
            this.updateEvent(this.currentAdditionalFiles);
        }

        /**
         * Handler for selecting next step. 
         */
        onNextStep(): void {
            this.isCvDirty = true;

            if (this.isFormValid) {
                this.nextStepSelectEvent();
            }
        }
    }
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.form-additional-files
    &__header
        margin-top: 65px
        margin-bottom: 110px

        width: 485px

    &__field+&__field
        margin-top: 75px

    &__field
        &-title-wrapper
            display: flex
            align-items: center
            justify-content: center

        &-title-wrapper &-icon
            margin-right: 20px

        &-title
            font-family: "Oswald"
            font-size: 22px
            max-width: 400px
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap

            &-wrapper
                margin-bottom: 10px

            .light &
                color: variables.$lightSchemeExtraGray

            .dark &
                color: #f4f4f4

        &-subtitle
            font-family: "Oswald"
            font-size: 16px
            color: variables.$darkSchemeLightGray

        &-upload-link
            color: variables.$liveColor

        &_empty, &_uploaded
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center

        .el-upload-dragger
            display: flex
            align-items: center
            justify-content: center
            max-width: 485px
            background-color: transparent
            border-radius: 0
            border: 1.5px solid

            .light &
                border-color: #d4d4d4

            .dark &
                border-color: #4a4a4a

        .el-upload, .el-upload-dragger
            width: 100%
            height: 220px

        &_empty &-icon
            .light &
                background: url(#{variables.$assetPath}/white-scheme/file-empty.svg) no-repeat

            .dark &
                background: url(#{variables.$assetPath}/dark-scheme/file-empty.svg) no-repeat

        &_uploaded &-icon
            .light &
                background: url(#{variables.$assetPath}/white-scheme/file-uploaded.svg) no-repeat

            .dark &
                background: url(#{variables.$assetPath}/dark-scheme/file-uploaded.svg) no-repeat

        &-icon
            position: relative
            width: 16px
            height: 20px

            &.required:after
                position: absolute
                left: 18px
                top: -8px
                content: "*"
                color: #e16969

    &__actions
        display: flex
        justify-content: flex-end
        margin-top: 55px
</style>
