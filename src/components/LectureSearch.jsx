import React, { useState } from 'react';
import axios from 'axios';

import { Box, TextField, Button } from '@mui/material';

import { useLectureActionHandler } from '@/components/LectureContext';

async function fetchLectures(params) {
  const response = await axios.get(
    `${import.meta.env.VITE_FETCH_URL}/lectures${params}.json`
  );
  return response.data;
}

export default function LectureSearch({ titleInput, onChange }) {
  const actionHandler = useLectureActionHandler();

  const handleSearch = async (e) => {
    const { name } = e.target;
    actionHandler(fetchLectures, name);
  };

  return (
    <Box>
      <TextField
        label="과목명"
        size="small"
        value={titleInput}
        onChange={onChange}
        fullWidth
        sx={{ mb: 1 }}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 1 }}
        name="1"
        onClick={handleSearch}
      >
        request lectures1.json
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 1 }}
        name="2"
        onClick={handleSearch}
      >
        request lectures2.json
      </Button>
    </Box>
  );
}
