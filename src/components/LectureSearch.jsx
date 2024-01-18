import { Box, TextField } from '@mui/material';

export default function LectureSearch({ titleInput, onChange }) {
  return (
    <Box sx={{ px: 2 }}>
      <TextField
        label="과목명"
        size="small"
        value={titleInput}
        onChange={onChange}
        fullWidth
        sx={{ mb: 1 }}
      />
    </Box>
  );
}
