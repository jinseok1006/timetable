import {
  List,
  ListItem,
  ListItemButton,
  Checkbox,
  FormGroup,
  Radio,
  RadioGroup,
  FormControl,
  ListItemText,
} from '@mui/material';
import { useLectureState } from './LectureContext';

// 내가 선택한 lecture의 정보를 timetable도 알아야한다.. => 상태 끌어올리기

export default function LectureList({ selectedIndex, onSelect }) {
  const { loading, error, data: lectures } = useLectureState();

  if (loading) {
    return <div>로딩중...</div>;
  }
  if (error) {
    return <div>에러발생!</div>;
  }
  if (!lectures) return null;

  return (
    <List dense>
      {lectures.map((lecture, i) => (
        <LectureItem
          key={i}
          id={i}
          lecture={lecture}
          onSelect={onSelect}
          selectedIndex={selectedIndex}
        />
      ))}
    </List>
  );
}

function LectureItem({ id, onSelect, lecture, selectedIndex }) {
  return (
    <ListItem>
      <Checkbox size="small" />
      <ListItemButton
        selected={id === selectedIndex}
        onClick={() => onSelect(id)}
      >
        <ListItemText primary={lecture.title} />
      </ListItemButton>
    </ListItem>
  );
}
