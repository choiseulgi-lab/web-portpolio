import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

const FONT = 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif'
const PC_URL     = 'https://drive.google.com/file/d/10WFrFyzY9-qzqWNVWRSAoG2BjbAshF_c/view?usp=sharing'
const MOBILE_URL = 'https://drive.google.com/file/d/1jHO4RdJauhlDtm01QdL1IkJtSXNDfUKI/view?usp=sharing'

export default function WebDesignLoading() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 400)

    const isMobile = window.innerWidth < 768
    const redirect = setTimeout(() => {
      window.location.href = isMobile ? MOBILE_URL : PC_URL
    }, 2000)

    return () => {
      clearInterval(dotInterval)
      clearTimeout(redirect)
    }
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0E0E0E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        '@keyframes spin': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      }}
    >
      {/* 스피너 */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.08)',
          borderTopColor: '#21F1A8',
          animation: 'spin 0.9s linear infinite',
        }}
      />

      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: { xs: '1rem', md: '1.125rem' },
            fontWeight: 400,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '-0.01em',
          }}
        >
          포트폴리오를 불러오는 중입니다{dots}
        </Typography>
      </Box>
    </Box>
  )
}
