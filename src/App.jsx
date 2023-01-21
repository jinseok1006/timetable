import {
  createTheme,
  Container,
  ThemeProvider,
  GlobalStyles,
  CssBaseline,
} from '@mui/material';

import LectureReference from './pages/LectureReference';

const theme = createTheme({
  typography: {
    fontFamily: 'noto sans kr',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { fontFamily: 'noto sans kr' },
        }}
      />
      <Container maxWidth="xl" sx={{ mt: 2 }} fixed disableGutters>
        <LectureReference />
      </Container>
    </ThemeProvider>
  );
}
