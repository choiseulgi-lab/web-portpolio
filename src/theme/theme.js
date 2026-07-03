import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C4E038',
      light: '#D6F04A',
      dark: '#9DB82C',
      contrastText: '#0E0E0E',
    },
    secondary: {
      main: '#1E1E1E',
      light: '#2A2A2A',
      dark: '#0E0E0E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#141414',
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
          backgroundColor: '#C4E038',
          color: '#0E0E0E',
          fontWeight: 700,
          '&:hover': { backgroundColor: '#D6F04A' },
        },
        outlinedPrimary: {
          borderColor: '#C4E038',
          color: '#C4E038',
          '&:hover': {
            borderColor: '#D6F04A',
            color: '#D6F04A',
            backgroundColor: 'rgba(196, 224, 56, 0.08)',
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
