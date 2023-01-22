import React, { useState } from 'react';
import axios from 'axios';

import { Button, MenuItem, Grid, TextField } from '@mui/material';

import { useLectureActionHandler } from '@/components/LectureContext';

async function fetchLectures(params) {
  const response = await axios.get(
    `${import.meta.env.VITE_FETCH_URL}/${params}`
  );
  return response.data;
}

export default React.memo(function LectureRequest() {
  const actionHandler = useLectureActionHandler();

  const handleSearch = async (name) => {
    actionHandler(fetchLectures, name);
  };

  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <TextField
          select
          label="학년도"
          fullWidth
          size="small"
          defaultValue={'2023-1'}
          disabled
        >
          <MenuItem value={'2023-1'}>2023-1</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField select label="구분" fullWidth size="small">
          <MenuItem value={'2023-1'}>학부전공</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField select label="대학" fullWidth size="small">
          <MenuItem value={'2023-1'}>공과대학</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField select label="학과" fullWidth size="small">
          <MenuItem value={'2023-1'}>IT정보공학과</MenuItem>
        </TextField>
      </Grid>

      <Button
        fullWidth
        variant="contained"
        onClick={() => handleSearch('itinfo.json')}
      >
        request itinfo.json
      </Button>

      <Button
        fullWidth
        variant="contained"
        onClick={() => handleSearch('core.liberal.json')}
      >
        request core.liberal.json
      </Button>
      <Button
        fullWidth
        variant="contained"
        onClick={() => handleSearch('elem.liberal.json')}
      >
        request elem.liberal.json
      </Button>
    </Grid>
  );
});
