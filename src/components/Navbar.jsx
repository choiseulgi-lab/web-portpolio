import { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useLocation } from 'react-router-dom'

const FONT = 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif'

const navLinks = [
  { label: 'About Me', path: '/about' },
  { label: 'Web Design', href: 'https://drive.google.com/file/d/1q803WkrCIcXrSKl6rXk7jIKebjMihU_k/view?usp=sharing' },
  { label: 'Editorial Design', path: '/projects' },
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
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
        <Toolbar sx={{ width: '100%', mx: 'auto', px: { xs: '20px', md: '80px' } }}>
          {/* 로고 */}
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
              fontFamily: FONT,
            }}
          >
            Portfolio
          </Typography>

          {/* 데스크탑 메뉴 */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {navLinks.map(({ label, path, href }) => {
              const active = path && location.pathname === path
              return href ? (
                <Button
                  key={label}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#FBFBFB',
                    borderBottom: '2px solid transparent',
                    borderRadius: 0,
                    px: 2,
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    letterSpacing: '-0.01em',
                    fontFamily: FONT,
                    textTransform: 'none',
                    transition: 'color 0.2s',
                    '&:hover': { color: 'var(--color-primary)', backgroundColor: 'transparent' },
                  }}
                >
                  {label}
                </Button>
              ) : (
                <Button
                  key={label}
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
                    fontFamily: FONT,
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

          {/* 모바일 햄버거 */}
          <IconButton
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#FBFBFB' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 모바일 드로어 */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: '100vw',
            backgroundColor: 'rgba(14,14,14,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* 닫기 버튼 */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: '20px' }}>
          <IconButton onClick={() => setOpen(false)} sx={{ color: '#FBFBFB' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* 메뉴 목록 */}
        <List sx={{ px: '20px', mt: 4, flexGrow: 1 }}>
          {navLinks.map(({ label, path, href }) => {
            const active = path && location.pathname === path
            return (
              <ListItemButton
                key={label}
                component={href ? 'a' : Link}
                {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { to: path })}
                onClick={() => setOpen(false)}
                sx={{
                  py: 2.5,
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontFamily: FONT,
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    color: active ? 'var(--color-primary)' : '#FBFBFB',
                  }}
                />
              </ListItemButton>
            )
          })}
        </List>
      </Drawer>
    </>
  )
}
