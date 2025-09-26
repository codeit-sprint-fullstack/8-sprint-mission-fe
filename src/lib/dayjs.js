import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertTz = (date) => {
  return dayjs.utc(date).tz('Asia/Seoul').format('YYYY. MM. DD');
};

export const formatTimeAgo = (utc) => {
  const now = dayjs().tz('Asia/Seoul');
  const target = dayjs.utc(utc).tz('Asia/Seoul');

  const diffMinutes = now.diff(target, 'minute');
  const diffHours = now.diff(target, 'hour');
  const diffDays = now.diff(target, 'day');

  if (diffHours < 1) {
    return diffMinutes === 0 ? '방금 전' : `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else {
    return `${diffDays}일 전`;
  }
};
