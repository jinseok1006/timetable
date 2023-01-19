import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { WEEKS, decodeSchedule } from './util';

import { useLectureState } from '@/components/LectureContext';

const ROWS = Array.from({ length: 25 }, () => 0); // 교시
const COLS = Array.from({ length: 7 }, () => 0); // 요일

const initTable = ROWS.map(() =>
  COLS.map((col, i) => ({ preview: false, checked: false }))
);

export default function TimeTable({ selectedIndex }) {
  // 테이블 상태
  const [table, setTable] = useState(initTable);

  const { data: lectures } = useLectureState();
  const lecture = selectedIndex !== null ? lectures[selectedIndex] : null;

  const [display, setDisplay] = useState({ preview: null, selected: [] });

  // console.log(table[0][WEEKS.sun]); // 0: 일요일의 1-A 수업은?

  // TODO: #1
  // schedules가 null이면 그냥 현재 테이블상태를 그대로 유지하고 렌더
  // schedule이 null이 아니면 테이블상태에 반영하고 렌더

  // TODO: #2
  // state에서 선택된값을 따로 보관한다.. lectrues가 바뀌면 테이블을 렌더링할수 없음

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
          row.map((col, weekIndex) => ({
            ...table[periodIndex][weekIndex],
            preview: schedules.some(
              ({ week, period }) => weekIndex === week && periodIndex === period
            )
              ? 1
              : 0,
          }))
        )
      );
    }

    console.log(display);
  }, [display]);

  // useEffect(() => {
  //   if (lecture) {
  //     const schedules = decodeSchedule(lecture.schedule);

  //     setTable(
  //       table.map((row, periodIndex) =>
  //         row.map((col, weekIndex) => ({
  //           ...table[periodIndex][weekIndex],
  //           preview: schedules.some(
  //             ({ week, period }) => weekIndex === week && periodIndex === period
  //           )
  //             ? 1
  //             : 0,
  //         }))
  //       )
  //     );
  //   }
  // }, [lecture]);

  return (
    <Container>
      <Box component="table" sx={{ border: 1, borderCollapse: 'collapse' }}>
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
                {i}
              </Box>
              {period.map((week, j) => {
                const { preview, checked } = week;
                return (
                  <SelectedCell
                    key={j}
                    preview={preview}
                    checked={checked}
                  ></SelectedCell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Box>
    </Container>
  );
}

function SelectedCell({ children, preview, checked }) {
  return (
    <Box
      component="td"
      sx={{
        border: '1px solid black',
        backgroundColor: preview ? '#ffa8a8' : null,
      }}
    >
      {children}
    </Box>
  );
}
