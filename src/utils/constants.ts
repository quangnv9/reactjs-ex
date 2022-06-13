export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? '/api' : 'https://google.com';

export const ACCESS_TOKEN_KEY = 'token';

export interface Gender {
  value: string;
  name: string;
}

export interface Region {
  value: number;
  label: string;
}

export interface State {
  value: number;
  label: string;
}

export const GENDER_OPTIONS: Gender[] = [
  { value: 'male', name: 'Nam' },
  { value: 'female', name: 'Nữ' },
];

// export const REGION_OPTIONS: Region[] = [
//   { value: 1, label: 'Việt Nam' },
//   { value: 2, label: 'Trung quốc' },
// ];

export const STATE_OPTIONS: State[] = [
  { value: 1, label: 'Hà Nội' },
  { value: 2, label: 'Bắc Kinh' },
  { value: 3, label: 'Đà Nẵng' },
  { value: 4, label: 'TP Hồ Chí Minh' },
  { value: 5, label: 'Thượng Hải' },
];
