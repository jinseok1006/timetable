import React, { useState } from 'react';
import axios from 'axios';

import { Box, TextField, Button } from '@mui/material';

import { useLectureActionHandler } from '@/components/LectureContext';

async function fetchLectures(params) {
  const response = await axios.get(
    `https://${import.meta.env.VITE_FETCH_URL}/lectures${params}.json`
  );
  return response.data;
}

export default function LectureSearch({ reset }) {
  const [input, setInput] = useState('');
  const actionHandler = useLectureActionHandler();

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = async (e) => {
    const { name } = e.target;
    actionHandler(fetchLectures, name);
    reset();
  };

  return (
    <Box>
      <TextField
        label="과목명"
        size="small"
        value={input}
        onChange={onChange}
        fullWidth
        sx={{ mb: 1 }}
      />
      <Button fullWidth variant="contained" disabled>
        검색
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 1 }}
        name="1"
        onClick={handleSearch}
      >
        request lecture1.json
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 1 }}
        name="2"
        onClick={handleSearch}
      >
        request lecture2.json
      </Button>
    </Box>
  );
}
