import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'About Me', path: '/about' },
  { label: 'Web Design', path: '/projects' },
  { label: 'Editorial Design', path: '/projects' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'rgba(20, 20, 20, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ maxWidth: '100%', width: '100%', mx: 'auto', px: { xs: '20px', md: '80px' } }}>
        <Typography
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: '#FBFBFB',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
          }}
        >
          Portfolio
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {navLinks.map(({ label, path }) => {
            const active = location.pathname === path
            return (
              <Button
                key={path}
                component={Link}
                to={path}
                sx={{
                  color: active ? 'var(--color-primary)' : '#FBFBFB',
                  borderBottom: active ? '2px solid var(--color-primary)' : '2px solid transparent',
                  borderRadius: 0,
                  px: 2,
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: '-0.01em',
                  textTransform: 'none',
                  transition: 'color 0.2s',
                  '&:hover': { color: 'var(--color-primary)', backgroundColor: 'transparent' },
                }}
              >
                {label}
              </Button>
            )
          })}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
