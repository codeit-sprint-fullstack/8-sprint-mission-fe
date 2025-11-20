import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertTz = (date: string) => {
  return dayjs.utc(date).tz('Asia/Seoul').format('YYYY.MM.DD');
};
