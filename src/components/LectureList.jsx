import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import { useEffect } from 'react';
import {
  useCartDispatch,
  useCartState,
  useLectureState,
} from './LectureContext';

const maxCart = 7;

export default function LectureList() {
  const cart = useCartState();
  const cartDispatch = useCartDispatch();
  const { loading, error, data: lectures } = useLectureState();

  const onAdd = (lecture) => {
    const { id, schedules } = lecture;
    // maxCart
    if (cart.length > maxCart) {
      alert('색상이 모자라서 더이상 추가할 수 없어요');
      return;
    }

    // 동일한 수업일 경우 false
    if (cart.some((sLecture) => sLecture.id === id)) {
      alert('이미 있어요');
      return;
    }

    // 시간이 겹치는 경우 false
    // 포함하는경우? 겹치는경우..
    if (
      cart.some((sLecture) =>
        Object.keys(sLecture.schedules).some((weekIndex) => {
          if (schedules.hasOwnProperty(weekIndex)) {
            const { start: sStart, end: sEnd } = sLecture.schedules[weekIndex];
            const { start, end } = schedules[weekIndex];
            // console.log(sStart, sEnd, start, end);
            return (
              (sStart >= start && sStart <= end) ||
              (start >= sStart && start <= sEnd)
            );
          }
          return false;
        })
      )
    ) {
      alert('시간표가 겹쳐요');
      return;
    }

    cartDispatch({ type: 'ADD', lecture });
  };

  if (loading) {
    return <div>로딩중..</div>;
  }
  if (error) {
    return <div>에러발생!</div>;
  }
  if (!lectures) return null;

  return (
    <List dense>
      {Object.keys(lectures).map((id) => (
        <LectureItem key={id} lecture={lectures[id]} onAdd={onAdd} />
      ))}
    </List>
  );
}

function LectureItem({ lecture, onAdd }) {
  return (
    <ListItem disableGutters>
      <ListItemButton onClick={() => onAdd(lecture)}>
        <ListItemText
          primary={
            <>
              <Typography component="span" variant="subtitle1">
                {lecture.title}
              </Typography>{' '}
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'gray' }}
              >
                {lecture.division}분반
              </Typography>
            </>
          }
          secondary={
            <>
              <Typography
                variant="body2"
                component="span"
                sx={{ display: 'block' }}
              >
                {lecture.professor}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{ display: 'block', fontSize: '0.8rem' }}
              >
                {lecture.schedulesString}
              </Typography>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
