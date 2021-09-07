/* eslint-disable no-unused-vars */
export interface PersonalInfo {
    firstName: string;
    lastName?: string;
    email: string;
    phoneNumber?: string;
}

export interface AdditionalInfo {
    liveInUk: boolean | null;
    gitProfile: string;
    aboutYou: string;
}

export interface AdditionalFiles {
    cv: any;
    coverLetter: any;
}

export interface ApplicationForm {
    personalInfo: PersonalInfo;
    additionalInfo: AdditionalInfo;
    additionalFiles: AdditionalFiles;
}

/**
 * Returns default new PersonalInfo object.
 * 
 * @returns {PersonalInfo}
 */
export function getDefaultPersonalInfo(): PersonalInfo {
    return {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    } as PersonalInfo;
}

/**
 * Returns default new AdditionalInfo object.
 * 
 * @returns {AdditionalInfo}
 */
export function getDefaultAdditionalInfo(): AdditionalInfo {
    return {
        liveInUk: null,
        gitProfile: '',
        aboutYou: '',
    } as AdditionalInfo;
}

/**
 * Returns default new AdditionalFiles object.
 * 
 * @returns {AdditionalFiles}
 */
export function getDefaultAdditionalFiles(): AdditionalFiles {
    return {
        cv: null,
        coverLetter: null,
    } as AdditionalFiles;
}

/**
 * Returns default new ApplicationForm object.
 * 
 * @returns {ApplicationForm}
 */
export function getDefaultApplicationForm(): ApplicationForm {
    return {
        personalInfo: getDefaultPersonalInfo(),
        additionalInfo: getDefaultAdditionalInfo(),
        additionalFiles: getDefaultAdditionalFiles(),
    } as ApplicationForm;
}

export enum Step {
    PERSONAL_INFO,
    ADDITIONAL_INFO,
    ADDITIONAL_FILES
}
