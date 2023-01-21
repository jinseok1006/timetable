export const cartColors = [
  '#ffa8a8',
  '#74c0fc',
  '#ffe066',
  '#b197fc',
  '#66d9e8',
  '#a9e34b',
  '#63e6be',
  '#748ffc',
];

// 내부적으로는 1-A 2-B 와 같이 처리하는방식은 피함.
// 무조건 정수로 연산, 외부로 출력할때는 다시 포매팅해서
export function toJbnuPeriod(period) {
  const jbnuPeriod = Math.floor(period / 2) + 1;
  const type = period % 2 == 0 ? 'A' : 'B';
  return `${jbnuPeriod}-${type}`;
}

export function weekKRtoInt(week) {
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

export function weekIntToKR(int) {
  switch (int) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
    default:
      throw new Error(`올바르지 않은 정수 ${int}`);
  }
}
