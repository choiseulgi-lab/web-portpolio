import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#21F1A8',
      light: '#4FF5BC',
      dark: '#15C989',
      contrastText: '#0E0E0E',
    },
    secondary: {
      main: '#1E1E1E',
      light: '#2A2A2A',
      dark: '#0E0E0E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#171717',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FBFBFB',
      secondary: '#888888',
      disabled: '#555555',
    },
    divider: '#2A2A2A',
  },
  typography: {
    fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.01em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontWeight: 500, letterSpacing: '-0.01em' },
    body1: { letterSpacing: '-0.01em' },
    body2: { letterSpacing: '-0.01em' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#21F1A8',
          color: '#0E0E0E',
          fontWeight: 700,
          '&:hover': { backgroundColor: '#4FF5BC' },
        },
        outlinedPrimary: {
          borderColor: '#21F1A8',
          color: '#21F1A8',
          '&:hover': {
            borderColor: '#4FF5BC',
            color: '#4FF5BC',
            backgroundColor: 'rgba(33, 241, 168, 0.08)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: { letterSpacing: '-0.01em' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          border: '1px solid #2A2A2A',
          borderRadius: 12,
        },
      },
    },
  },
})

export default theme
