import { CommonOptionState } from "../../state";

export interface FormState {
  textFieldValue: string;
  rocDateValue: string;
  selectSingleValue: string;
  selectMultipleValue: string[];
  autocompleteValue: CommonOptionState | null;
  radioValue: string;
  checkboxValue: string[];
  switchValue: boolean;
  textareaValue: string;
  fileValue: File[];
}
export const initialFormState: FormState = {
  textFieldValue: '',
  rocDateValue: '',
  selectSingleValue: '',
  selectMultipleValue: [],
  autocompleteValue: null,
  radioValue: '',
  checkboxValue: [],
  switchValue: false,
  textareaValue: '',
  fileValue: [],
};
