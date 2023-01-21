import React, { createContext, useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { WEEKS, decodeSchedule, toJbnuPeriod } from './util';

import { useLectureState } from '@/components/LectureContext';

const ROWS = Array.from({ length: 26 }, () => 0); // 교시
const COLS = Array.from({ length: 7 }, () => 0); // 요일

const initTable = ROWS.map(() =>
  COLS.map((col, i) => ({
    preview: { create: true, blank: true, time: null },
    checked: false,
  }))
);

export default function TimeTable({ selectedIndex }) {
  // 테이블 상태
  const [table, setTable] = useState(initTable);

  const { data: lectures } = useLectureState();
  const lecture = selectedIndex !== null ? lectures[selectedIndex] : null;

  const [display, setDisplay] = useState({ preview: null, selected: [] });

  // TODO: #1 (V)
  // schedules가 null이면 그냥 현재 테이블상태를 그대로 유지하고 렌더
  // schedule이 null이 아니면 테이블상태에 반영하고 렌더

  // TODO: #2 (V)
  // state에서 선택된값을 따로 보관한다.. lectrues가 바뀌면 테이블을 렌더링할수 없음

  // TODO: #3 (V)
  // rowspan 유도하기
  // schedules을 {1: {tart:1, end: 3}, ...}식으로 바꿈..

  // TODO: #5
  // 테이블 상태하고 테이블 렌더링을 분리해야할것같음
  useEffect(() => {
    if (selectedIndex !== null) {
      setDisplay((display) => ({
        ...display,
        preview: { ...lectures[selectedIndex] },
      }));
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (display.preview) {
      const schedules = decodeSchedule(display.preview.schedule);

      setTable(
        table.map((row, periodIndex) =>
          row.map((col, weekIndex) => {
            const preview = {
              blank: true,
              time: null,
              create: true,
              title: null,
            };

            if (schedules[weekIndex]) {
              const { start, end } = schedules[weekIndex];
              preview.blank = false;
              if (start === periodIndex) {
                preview.time = end - start + 1;
                preview.title = display.preview.title;
              } else if (periodIndex > start && periodIndex <= end) {
                preview.create = false;
              } else {
                preview.blank = true;
              }
            }

            return { ...table[periodIndex][weekIndex], preview };
          })
        )
      );
    }
  }, [display]);

  return (
    <Container>
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
                <TableCell
                  key={j}
                  preview={week.preview}
                  checked={week.checked}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </Box>
    </Container>
  );
}

function TableCell({ preview, checked }) {
  const { create, blank, time, title } = preview;
  if (create) {
    if (blank) {
      return <Cell />;
    } else {
      return <SelectedCell time={time}>{title}</SelectedCell>;
    }
  } else {
    return null;
  }
}

function SelectedCell({ children, time }) {
  return (
    <Cell
      sx={{
        backgroundColor: '#ffa8a8',
      }}
      rowSpan={time}
    >
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
        {children}
      </Typography>
    </Cell>
  );
}

function Cell({ children, ...props }) {
  return (
    <Box
      component="td"
      sx={{
        border: '1px solid black',
        width: '12.5%',
        height: '25px',
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
