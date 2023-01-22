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
          html: { height: '100%' },
          body: { fontFamily: 'noto sans kr', height: '100%' },
          '#root': { height: '100%' },
        }}
      />
      <Container
        maxWidth="xl"
        sx={{ mt: 0, height: 'inherit', pt: 3 }}
        fixed
        disableGutters
      >
        <LectureReference />
      </Container>
    </ThemeProvider>
  );
}
