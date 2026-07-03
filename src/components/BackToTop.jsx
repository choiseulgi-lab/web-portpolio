import { useState, useEffect } from 'react'
import { Box, IconButton } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1200,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="맨 위로 이동"
        sx={{
          width: 44,
          height: 44,
          backgroundColor: 'rgba(14,14,14,0.85)',
          border: '1px solid rgba(196,224,56,0.35)',
          color: '#C4E038',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(196,224,56,0.12)',
            borderColor: '#C4E038',
            transform: 'translateY(-3px)',
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
    </Box>
  )
}
