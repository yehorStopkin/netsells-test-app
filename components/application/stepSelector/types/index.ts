import { Step } from '../../types';

export interface ApplicationStepInfoData {
    stepNumber: Step;
    filingPercentage: number;
    isCompleted: boolean;
    title: string;
    subtitle: string;
    details: string;
}
