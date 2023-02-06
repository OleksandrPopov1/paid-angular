import {IInputOptions} from "../interfaces";

export const inputsFilters: IInputOptions[] = [
  {inputName: 'Name', inputServerName: 'name', isNotSelect: true, selectOptions: [], type: 'text'},
  {inputName: 'Surname', inputServerName: 'surname', isNotSelect: true, selectOptions: [], type: 'text'},
  {inputName: 'Email', inputServerName: 'email', isNotSelect: true, selectOptions: [], type: 'text'},
  {inputName: 'Phone', inputServerName: 'phone', isNotSelect: true, selectOptions: [], type: 'text'},
  {inputName: 'Age', inputServerName: 'age', isNotSelect: true, selectOptions: [], type: 'number'},
  {
    inputName: 'Course',
    inputServerName: 'course',
    isNotSelect: false,
    selectOptions: ['FS', 'QACX', 'JCX', 'JSCX', 'FE', 'PCX'],
    type: 'text'
  },
  {
    inputName: 'Format',
    inputServerName: 'course_format',
    isNotSelect: false,
    selectOptions: ['static', 'online'],
    type: 'text'
  },
  {
    inputName: 'Type',
    inputServerName: 'course_type',
    isNotSelect: false,
    selectOptions: ['pro', 'minimal', 'premium', 'incubator', 'vip'],
    type: 'text'
  },
  {
    inputName: 'Status',
    inputServerName: 'status',
    isNotSelect: false,
    selectOptions: ['В работе', 'Новый', 'Согласен', 'Не согласен', 'Дубляж'],
    type: 'text'
  },
  {
    inputName: 'Group',
    inputServerName: 'group',
    isNotSelect: false,
    selectOptions: [],
    type: 'text'
  },
];



