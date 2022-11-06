import { CommonOptionModel } from "../../model";

export interface FormModel {
  textFieldValue: string;
  selectSingleValue: string;
  selectMultipleValue: string[];
  autocompleteValue: CommonOptionModel | null;
  radioValue: string;
  checkboxValue: string;
  switchValue: boolean;
  textareaValue: string;
  fileValue: File[];
}
export const initialFormModel: FormModel = {
  textFieldValue: '',
  selectSingleValue: '',
  selectMultipleValue: [],
  autocompleteValue: null,
  radioValue: '',
  checkboxValue: '',
  switchValue: false,
  textareaValue: '',
  fileValue: [],
};
