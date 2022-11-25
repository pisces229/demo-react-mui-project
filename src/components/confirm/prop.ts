export interface CompoentConfirmProp {
	display: boolean;
	title: string;
	message: string;
	agree: string;
	disagree: string;
}
export const initialCompoentConfirmProp : CompoentConfirmProp = {
	display: false,
	title: '',
	message: 'Confirm?',
	agree: 'Yes',
	disagree: 'No',
}
