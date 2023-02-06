import {IInputOptions} from "../interfaces";
import {inputsFilters} from "./inputsFilters";

export const inputsEditeForm: IInputOptions[] = [
  ...inputsFilters,
  {inputName: 'Message', inputServerName: 'msg', isNotSelect: true, selectOptions: [], type: 'text'},
  {inputName: 'Sum', inputServerName: 'sum', isNotSelect: true, selectOptions: [], type: 'number'},
  {inputName: 'Already Paid', inputServerName: 'alreadyPaid', isNotSelect: true, selectOptions: [], type: 'number'},
];
