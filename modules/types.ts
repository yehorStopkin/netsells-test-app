/* eslint-disable no-unused-vars */
export enum Scheme {
    LIGHT,
    DARK
};

export enum Phase {
    WELCOME,
    STEP_SELECTING,
    FORM_FILING,
    SUCCESS
}

export const YES_NO_OPTIONS = [
    {
        label: 'Yes',
        value: true,
    },
    {
        label: 'No',
        value: false,
    },
];

export interface Validation {
    skipValidation: boolean;
    isValid: boolean;
    validationMessage: string;
    querySelector: string;
}
