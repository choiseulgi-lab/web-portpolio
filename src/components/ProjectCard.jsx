import { useState } from 'react'
import { Box, Typography, Skeleton } from '@mui/material'

function OverlayButton({ href, label }) {
  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 1,
        minWidth: 148,
        border: '1.5px solid #21F1A8',
        borderRadius: '4px',
        color: '#21F1A8',
        backgroundColor: 'transparent',
        fontSize: '0.8rem',
        fontWeight: 700,
        letterSpacing: 0.5,
        textDecoration: 'none',
        transition: 'background-color 0.2s ease, color 0.2s ease, transform 0.15s ease',
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': { color: '#0E0E0E', backgroundColor: '#21F1A8' },
        '&:active': { transform: 'scale(0.95)' },
      }}
    >
      {label}
    </Box>
  )
}

export default function ProjectCard({ project }) {
  const [isActive, setIsActive] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0

  const handleMouseEnter = () => { if (!isTouchDevice()) setIsActive(true) }
  const handleMouseLeave = () => { if (!isTouchDevice()) setIsActive(false) }
  const handleCardClick  = () => { if (isTouchDevice()) setIsActive((prev) => !prev) }

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        backgroundColor: '#1E1E1E',
        border: '1px solid #2A2A2A',
        overflow: 'hidden',
        cursor: isTouchDevice() ? 'pointer' : 'default',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
        transform: isActive ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
        boxShadow: isActive
          ? '0 20px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(33,241,168,0.12)'
          : '0 2px 8px rgba(0,0,0,0.25)',
        willChange: 'transform',
        '&:active': { backgroundColor: isTouchDevice() ? '#222222' : '#1E1E1E' },
      }}
    >
      {/* 썸네일 (16:9) */}
      <Box
        sx={{
          position: 'relative',
          paddingTop: '56.25%',
          overflow: 'hidden',
          borderRadius: '12px 12px 0 0',
          backgroundColor: '#2A2A2A',
        }}
      >
        {!imgLoaded && !imgError && (
          <Skeleton
            variant="rectangular"
            sx={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              backgroundColor: '#2A2A2A',
              '&::after': { background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' },
            }}
          />
        )}

        {imgError && (
          <Box
            sx={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 50%, #1A1A1A 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: 'rgba(33,241,168,0.25)', fontSize: '2.5rem' }}>⚡</Typography>
          </Box>
        )}

        {!imgError && (
          <Box
            component="img"
            src={project.thumbnail_url}
            alt={project.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            sx={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}

        {/* 호버/터치 오버레이 */}
        <Box
          sx={{
            position: 'absolute', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 1.5,
            opacity: isActive ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 2,
          }}
        >
          <OverlayButton href={project.detail_url} label="Live Demo" />
          <OverlayButton href={project.detail_url} label="View Details" />
        </Box>
      </Box>

      {/* 카드 본문 */}
      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1rem', mb: 1, wordBreak: 'keep-all' }}>
          {project.title}
        </Typography>
        <Typography sx={{ color: '#888888', fontSize: '0.85rem', lineHeight: 1.75, mb: 2, wordBreak: 'keep-all' }}>
          {project.description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2.5 }}>
          {project.tech_stack?.map((tech) => (
            <Box
              key={tech}
              sx={{
                px: 1.25, py: 0.3,
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '100px',
                backgroundColor: 'rgba(42,42,42,0.9)',
                color: 'rgba(224,224,224,0.65)',
                fontSize: '0.7rem', fontWeight: 500,
                whiteSpace: 'nowrap', lineHeight: 1.6,
              }}
            >
              {tech}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1 }}>
          {project.duration && (
            <Typography sx={{ color: 'rgba(224,224,224,0.28)', fontSize: '0.75rem' }}>
              {project.duration}
            </Typography>
          )}
          {project.participation && (
            <Typography sx={{ color: 'rgba(33,241,168,0.45)', fontSize: '0.75rem' }}>
              {project.participation}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
