import { useState } from 'react';

import TimeTable from '@/components/Timetable';
import LectureList from '@/components/LectureList';

import { Grid } from '@mui/material';

export default function LectureSearch() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <Grid container>
      <Grid item xs={6}>
        <TimeTable />
      </Grid>
      <Grid item xs={6}>
        <LectureList />
      </Grid>
    </Grid>
  );
}
