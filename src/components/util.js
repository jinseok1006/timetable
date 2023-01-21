// scheduleString='월 1-A, 월 1-B ...'

export const WEEKS = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wen',
  4: 'thr',
  5: 'fri',
  6: 'sat',
  sun: 0,
  mon: 1,
  tue: 2,
  wen: 3,
  thr: 4,
  fri: 5,
  sat: 6,
};

export function toJbnuPeriod(period) {
  const jbnuPeriod = Math.floor(period / 2) + 1;
  const type = period % 2 == 0 ? 'A' : 'B';
  return `${jbnuPeriod}-${type}`;
}

export function decodeSchedule(schedulesString) {
  const schedules = {};

  schedulesString.split(',').forEach((scheduleString) => {
    const [w, t] = scheduleString.split(' ');
    const [time, type] = t.split('-');
    const week = weekKRtoInt(w);
    const period = (parseInt(time) - 1) * 2 + (type === 'A' ? 0 : 1);

    if (!schedules[week]) {
      schedules[week] = [];
    }

    schedules[week].push(period);
  });

  // 기존 값을 변동시키지 않고 새로운 객체를 생성해서 할당 (tsx 타입에러 피하기->제네릭써야함)
  return Object.keys(schedules).reduce(
    (pre, week) => ({
      ...pre,
      [week]: {
        start: Math.min(...schedules[week]),
        end: Math.max(...schedules[week]),
      },
    }),
    {}
  );
}

function weekKRtoInt(week) {
  switch (week) {
    case '일':
      return 0;
    case '월':
      return 1;
    case '화':
      return 2;
    case '수':
      return 3;
    case '목':
      return 4;
    case '금':
      return 5;
    case '토':
      return 6;
    default:
      throw new Error(`올바르지 않은 요일 ${week}`);
  }
}
