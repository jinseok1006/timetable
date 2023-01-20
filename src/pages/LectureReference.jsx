import { useState } from 'react';
import LectureProvider, { useLectureState } from '@/components/LectureContext';

import TimeTable from '@/components/Timetable';
import LectureList from '@/components/LectureList';

import { Grid } from '@mui/material';
import LectureSearch from '@/components/LectureSearch';

// 전역으로 필요한 상태: preview<-selected

export default function LectureReference() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const onSelect = (id) => setSelectedIndex(id);
  const reset = () => setSelectedIndex(null);

  // TODO: #1(no=2369991) -> (CLEAR??????)
  // 그리고 삼항 연산자로 동적 null 때려서 하는 것보단
  // 차라리 if로 구분해서 분기로 처리하는게 유지보수에 더 나을걸.
  // 삼항연산자 남발하면 조건에 따라 값이 여러군데서 바뀌게 되서
  // 로직 구분이 안되서 유지보수 힘들어짐
  // => 테이블에선 가능하긴한데 여기선 값을 던져야하는데??

  return (
    <LectureProvider>
      <Grid container>
        <Grid
          item
          xs={2}
          sx={{ position: 'sticky', alignSelf: 'flex-start', top: '2rem' }}
        >
          <LectureSearch reset={reset} />
        </Grid>
        <Grid item xs={4}>
          <LectureList selectedIndex={selectedIndex} onSelect={onSelect} />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ position: 'sticky', alignSelf: 'flex-start', top: '2rem' }}
        >
          <TimeTable selectedIndex={selectedIndex} />
        </Grid>
      </Grid>
    </LectureProvider>
  );
}
