import { createTheme, Container, Grid, ThemeProvider } from '@mui/material';

import LectureReference from './pages/LectureReference';

const theme = createTheme({
  typography: {
    fontFamily: 'noto sans kr',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <LectureReference />
      </Container>
    </ThemeProvider>
  );
}
