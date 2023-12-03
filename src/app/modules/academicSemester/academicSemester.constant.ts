import {
  IMonth,
  ISemesterCode,
  ISemesterCodeMapper,
  ISemesterName,
} from './academicSemester.interface';

export const Months: IMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const SemesterNameSchema: ISemesterName[] = ['Autumn', 'Summer', 'Fall'];

export const SemesterCodeSchema: ISemesterCode[] = ['01', '02', '03'];

export const semesterCodeMapper: ISemesterCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
