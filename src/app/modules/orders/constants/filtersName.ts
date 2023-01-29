import {IFilterOptions} from "../interfaces";

export const filtersName: IFilterOptions[] = [
  {filterName: 'Name', filterServerName: 'name', isNotSelect: true, selectOptions: []},
  {filterName: 'Surname', filterServerName: 'surname', isNotSelect: true, selectOptions: []},
  {filterName: 'Email', filterServerName: 'email', isNotSelect: true, selectOptions: []},
  {filterName: 'Phone', filterServerName: 'phone', isNotSelect: true, selectOptions: []},
  {filterName: 'Age', filterServerName: 'age', isNotSelect: true, selectOptions: []},
  {
    filterName: 'Course',
    filterServerName: 'course',
    isNotSelect: false,
    selectOptions: ['FS', 'QACX', 'JCX', 'JSCX', 'FE', 'PCX']
  },
  {
    filterName: 'Format',
    filterServerName: 'course_format',
    isNotSelect: false,
    selectOptions: ['static', 'online']
  },
  {
    filterName: 'Type',
    filterServerName: 'course_type',
    isNotSelect: false,
    selectOptions: ['pro', 'minimal', 'premium', 'incubator', 'vip']
  },
  {
    filterName: 'Status',
    filterServerName: 'status',
    isNotSelect: false,
    selectOptions: ['В работе', 'Новый', 'Согласен', 'Не согласен', 'Дубляж']
  },
  {
    filterName: 'Group',
    filterServerName: 'group',
    isNotSelect: false,
    selectOptions: []
  },
];
