import { Box, Container } from '@mui/material';
import React, { useState } from 'react';

const ROWS = Array.from({ length: 9 }, () => 0); // 교시
const COLS = Array.from({ length: 7 }, () => 0); // 요일

const WEEKS = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wne',
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

export default function TimeTable() {
  const [state, setState] = useState(ROWS.map(() => COLS.map((col, i) => i)));

  // console.log(state);
  // console.log(state[0][WEEKS.sun]); // 0: 일요일의 1-A 수업은?

  return (
    <Container>
      <Box component="table" sx={{ border: 1 }}>
        <thead>
          <tr>
            <th></th>
            {COLS.map((_, i) => (
              <th key={WEEKS[i]}>{WEEKS[i]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((_, i) => (
            <tr key={i}>
              <th>{i}</th>
              {COLS.map((col, j) => (
                <td key={j}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Box>
    </Container>
  );
}
