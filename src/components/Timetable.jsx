import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { WEEKS, toJbnuPeriod } from './util';
import { useCartState } from './LectureContext';

import { cartColors } from './util.js';

const ROWS = Array.from({ length: 26 }, () => 0); // 교시
const COLS = Array.from({ length: 7 }, () => 0); // 요일

const createCellDisplayState = (
  create = true,
  blank = true,
  display = null
) => ({
  create,
  blank,
  display,
  toString() {
    return `${create}, ${blank}, ${time}`;
  },
});

const initTable = ROWS.map(() =>
  COLS.map((col, i) => createCellDisplayState())
);

export default function TimeTable() {
  const [table, setTable] = useState(initTable);
  const cart = useCartState();

  useEffect(() => {
    setTable(
      table.map((row, periodIndex) =>
        row.map((col, weekIndex) => {
          let create = true,
            blank = true,
            display = null;

          cart.forEach((lecture, index) => {
            if (lecture.schedules.hasOwnProperty(weekIndex)) {
              const { start, end } = lecture.schedules[weekIndex];

              if (periodIndex >= start && periodIndex <= end) {
                if (start === periodIndex) {
                  blank = false;
                  display = {
                    time: end - start + 1,
                    title: lecture.title,
                    colorIndex: index,
                  };
                } else if (periodIndex > start && periodIndex <= end) {
                  create = false;
                } else {
                  blank = true;
                }
              }
            }
          });

          return createCellDisplayState(create, blank, display);
        })
      )
    );
  }, [cart]);

  return (
    <Box
      component="table"
      sx={{
        border: 1,
        borderCollapse: 'collapse',
        width: '100%',
        tableLayout: 'fixed', // TODO #4
      }}
    >
      <thead>
        <tr>
          <Box component="th" sx={{ border: 1 }}></Box>
          {COLS.map((_, i) => (
            <Box component="th" sx={{ border: 1 }} key={WEEKS[i]}>
              {WEEKS[i]}
            </Box>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.map((period, i) => (
          <tr key={i}>
            <Box component="th" sx={{ border: 1 }}>
              {toJbnuPeriod(i)}
            </Box>
            {period.map((week, j) => (
              <TableCell key={j} state={week} />
            ))}
          </tr>
        ))}
      </tbody>
    </Box>
  );
}

function TableCell({ state }) {
  const { create, blank, display } = state;
  if (create) {
    if (blank) {
      return <Cell />;
    } else {
      return <SelectedCell display={display} />;
    }
  } else {
    return null;
  }
}

function SelectedCell({ display }) {
  const { time, colorIndex, title } = display;
  return (
    <Cell colorIndex={colorIndex} rowSpan={time}>
      <Typography
        variant="body2"
        textAlign="center"
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          // whiteSpace: 'nowrap',
          // textOverflow: 'ellipsis', // TODO #4
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
    </Cell>
  );
}

function Cell({ children, colorIndex, rowSpan }) {
  return (
    <Box
      component="td"
      sx={{
        border: '1px solid black',
        width: '12.5%',
        height: '30px',
        backgroundColor: cartColors[colorIndex],
      }}
      rowSpan={rowSpan}
    >
      {children}
    </Box>
  );
}
