import { useState, useEffect, useRef } from 'react'
import {
  Box, Typography, Button, Container,
  Grid, CircularProgress,
  TextField, Stack, Divider, Snackbar, Alert,
  IconButton, Tooltip, Checkbox, FormControlLabel, Chip,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { skills } from '../data/skills'
import ProjectCard from '../components/ProjectCard'
import { useInView } from '../hooks/useInView'

/* ── 1. Hero 섹션 ─────────────────────────────────────────── */
function HeroSection() {
  const canvasRef = useRef(null)

  const cursorRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999, inside: false })
  const prevTextElRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const hero = canvas.parentElement
    const isMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let dots = []
    let spacing = 0

    const resize = () => {
      canvas.width = hero.offsetWidth
      canvas.height = hero.offsetHeight
      spacing = canvas.width / 30
      dots = []
      for (let x = spacing / 2; x < canvas.width; x += spacing) {
        for (let y = spacing / 2; y < canvas.height; y += spacing) {
          dots.push({ x, y })
        }
      }
    }

    const LIME = [212, 255, 63]
    const RADIUS = 200

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my, inside } = mouseRef.current

      dots.forEach(({ x, y }) => {
        let t = 0
        if (isMouse && inside) {
          const dist = Math.hypot(x - mx, y - my)
          if (dist < RADIUS) t = 1 - dist / RADIUS
        }
        const opacity = 0.17 + t * 0.6
        const r = 2.5 + t * 2.5
        const ri = Math.round(255 * (1 - t) + LIME[0] * t)
        const gi = Math.round(255 * (1 - t) + LIME[1] * t)
        const bi = Math.round(255 * (1 - t) + LIME[2] * t)
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ri},${gi},${bi},${opacity})`
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouseRef.current = { x, y, inside: true }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
        cursorRef.current.style.opacity = '1'
      }

      const el = document.elementFromPoint(e.clientX, e.clientY)
      const textEl = el?.closest('[data-hero-text]')

      if (textEl) {
        if (cursorRef.current) {
          cursorRef.current.style.width = '72px'
          cursorRef.current.style.height = '72px'
        }
        if (prevTextElRef.current !== textEl) {
          if (prevTextElRef.current) prevTextElRef.current.style.transform = ''
          textEl.style.transform = 'scale(1.04)'
          textEl.style.transition = 'transform 0.3s ease'
          prevTextElRef.current = textEl
        }
      } else {
        if (cursorRef.current) {
          cursorRef.current.style.width = '32px'
          cursorRef.current.style.height = '32px'
        }
        if (prevTextElRef.current) {
          prevTextElRef.current.style.transform = ''
          prevTextElRef.current = null
        }
      }
    }

    const onMouseLeave = () => {
      mouseRef.current.inside = false
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0'
        cursorRef.current.style.width = '32px'
        cursorRef.current.style.height = '32px'
      }
      if (prevTextElRef.current) {
        prevTextElRef.current.style.transform = ''
        prevTextElRef.current = null
      }
    }

    resize()
    draw()

    if (isMouse) {
      hero.addEventListener('mousemove', onMouseMove)
      hero.addEventListener('mouseleave', onMouseLeave)
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const OPEN_Q = String.fromCharCode(0x201C)
  const CLOSE_Q = String.fromCharCode(0x201D)

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        marginTop: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        borderBottom: '1px solid var(--color-border-dark)',
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(28px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* 캔버스 dot 그리드 */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      />


      {/* 커서 */}
      <Box
        ref={cursorRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.9)',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 10,
          opacity: 0,
          transition: 'opacity 0.3s ease, width 0.25s ease, height 0.25s ease',
        }}
      />


      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>


        {/* 헤드라인 */}
        <Typography
          data-hero-text="true"
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.4,
            color: 'var(--color-text-primary)',
            mb: 4,
            wordBreak: 'keep-all',
            animation: 'fadeInUp 0.6s ease 0.3s both',
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: { xs: '4rem', sm: '5rem', md: '6.5rem' },
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 400,
              color: 'white',
              lineHeight: 0,
              verticalAlign: '-0.15em',
              mr: '0.08em',
              display: 'inline-block',
            }}
          >{OPEN_Q}</Box>왜 여기에 있어야 할까<Box
            component="span"
            sx={{
              fontSize: { xs: '4rem', sm: '5rem', md: '6.5rem' },
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 400,
              color: 'white',
              lineHeight: 0,
              verticalAlign: '-0.15em',
              ml: '0.08em',
              display: 'inline-block',
            }}
          >{CLOSE_Q}</Box><br />
          이유를 담아 설계하는 디자이너 최슬기입니다
        </Typography>

        {/* 포인트 라인 */}
        <Box
          sx={{
            width: 48,
            height: 2,
            background: 'linear-gradient(90deg, #9DB82C, #C4E038)',
            mx: 'auto',
            mb: 4,
            animation: 'fadeInUp 0.6s ease 0.5s both',
          }}
        />

        {/* 스킬 칩 */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            mb: 4,
            animation: 'fadeInUp 0.6s ease 0.55s both',
          }}
        >
          {skills.map(({ name, tooltip }) => (
            <Tooltip
              key={name}
              title={tooltip || ''}
              placement="top"
              arrow
              disableHoverListener={!tooltip}
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: '#2A2A2A',
                    color: '#C4E038',
                    fontSize: '0.75rem',
                    border: '1px solid rgba(196,224,56,0.2)',
                  },
                },
                arrow: { sx: { color: '#2A2A2A' } },
              }}
            >
              <Chip
                label={name}
                size="small"
                sx={{
                  backgroundColor: 'rgba(224,224,224,0.06)',
                  color: 'rgba(224,224,224,0.6)',
                  border: '1px solid rgba(224,224,224,0.15)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: tooltip ? 'help' : 'default',
                  transition: 'all 0.2s',
                  '&:hover': tooltip ? {
                    backgroundColor: 'rgba(196,224,56,0.1)',
                    color: '#C4E038',
                    borderColor: 'rgba(196,224,56,0.4)',
                  } : {
                    backgroundColor: 'rgba(224,224,224,0.1)',
                    borderColor: 'rgba(224,224,224,0.25)',
                  },
                }}
              />
            </Tooltip>
          ))}
        </Box>

        {/* 이름 — 서명처럼 작게 */}
        <Typography
          data-hero-text="true"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' },
            fontWeight: 600,
            letterSpacing: '0.1em',
            mb: 6,
            background: 'linear-gradient(135deg, #E0E0E0 30%, #C4E038 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'fadeInUp 0.6s ease 0.6s both',
          }}
        >
          Web & Editorial Designer
        </Typography>

        {/* 버튼 */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          sx={{ animation: 'fadeInUp 0.6s ease 0.7s both' }}
        >
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/projects"
            sx={{
              backgroundColor: 'var(--color-button-primary)',
              color: 'var(--color-text-inverse)',
              fontWeight: 700,
              px: 4,
              transition: 'all 0.2s ease',
              '&:hover': { backgroundColor: 'var(--color-button-hover)', transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(196,224,56,0.25)' },
            }}
          >
            PROJECTS
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/about"
            sx={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              px: 4,
              transition: 'all 0.2s ease',
              '&:hover': { borderColor: 'var(--color-primary-light)', color: 'var(--color-primary-light)', backgroundColor: 'rgba(196,224,56,0.08)', transform: 'translateY(-2px)' },
            }}
          >
            About Me
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            sx={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              px: 4,
              transition: 'all 0.2s ease',
              '&:hover': { borderColor: 'var(--color-primary-light)', color: 'var(--color-primary-light)', backgroundColor: 'rgba(196,224,56,0.08)', transform: 'translateY(-2px)' },
            }}
          >
            CONTACT
          </Button>
        </Stack>
      </Container>


</Box>
  )
}

/* ── 2. Projects 섹션 ─────────────────────────────────────── */
function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView()

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order')
        .limit(3)
      if (data) setProjects(data)
      setLoading(false)
    }
    fetchProjects()
  }, [])

  return (
    <Box
      id="projects-preview"
      sx={{
        py: 12,
        backgroundColor: 'var(--color-secondary-light)',
        borderBottom: '1px solid var(--color-border-dark)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          ref={headerRef}
          sx={{
            textAlign: 'center',
            mb: 8,
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: 'var(--color-primary)', letterSpacing: 0, mb: 2, display: 'block' }}
          >
            Projects
          </Typography>
          <Typography variant="h3" sx={{ color: 'var(--color-text-primary)', fontWeight: 700, mb: 2 }}>
            Explore My Work
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--color-text-muted)' }}>
            사용자 관점에서 문제를 발견하고 해결한 프로젝트를 소개합니다.
          </Typography>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: 'var(--color-primary)' }} />
          </Box>
        )}

        {!loading && (
          <Grid ref={gridRef} container spacing={3}>
            {projects.map((project, index) => (
              <Grid
                item xs={12} sm={6} md={4}
                key={project.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: gridInView ? 1 : 0,
                  transform: gridInView ? 'translateY(0)' : 'translateY(28px)',
                  transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
                }}
              >
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/projects"
            sx={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              px: 5,
              '&:hover': {
                borderColor: 'var(--color-primary-light)',
                color: 'var(--color-primary-light)',
                backgroundColor: 'rgba(196,224,56,0.08)',
              },
            }}
          >
            전체 보기
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

/* ── 5. Contact 섹션 ──────────────────────────────────────── */
const inputSx = {
  '& .MuiInput-root': {
    color: '#E0E0E0',
    fontSize: '0.875rem',
    '&:before': { borderBottomColor: 'rgba(224,224,224,0.18)' },
    '&:hover:not(.Mui-disabled):before': { borderBottomColor: 'rgba(224,224,224,0.45)' },
    '&:after': { borderBottomColor: '#C4E038' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(224,224,224,0.3)', fontSize: '0.875rem', letterSpacing: 1 },
  '& .MuiInputLabel-root.Mui-focused': { color: '#C4E038' },
}

const EMOJIS = ['😊', '🔥', '✨', '👍', '💡']

const INFO_ROWS = [
  {
    label: 'EMAIL',
    renderValue: (copied, onCopy) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          component="a"
          href="mailto:choiseulgi91@naver.com"
          className="info-value"
          sx={{ color: '#E0E0E0', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s', '&:hover': { color: '#C4E038' } }}
        >
          choiseulgi91@naver.com
        </Typography>
        <Tooltip title={copied ? '복사됨!' : 'Copy'} placement="top">
          <IconButton
            size="small"
            onClick={onCopy}
            sx={{ color: copied ? '#C4E038' : 'rgba(224,224,224,0.22)', p: 0.5, transition: 'color 0.2s', '&:hover': { color: '#C4E038', backgroundColor: 'transparent' } }}
          >
            <ContentCopyIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
  {
    label: 'LOCATION',
    renderValue: () => (
      <Typography className="info-value" sx={{ color: '#E0E0E0', fontSize: '0.875rem', transition: 'color 0.2s' }}>
        Ulsan, South Korea
      </Typography>
    ),
  },
  {
    label: 'RESUME',
    renderValue: () => (
      <Typography
        component="a"
        href="#"
        className="info-value"
        sx={{ color: '#E0E0E0', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s', '&:hover': { color: '#C4E038' } }}
      >
        Download PDF
      </Typography>
    ),
  },
]

function GuestbookForm({ onSubmitSuccess }) {
  const [form, setForm] = useState({
    writer_name: '',
    email: '',
    is_email_public: false,
    company_or_job: '',
    keyword: '',
    emoji: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.emoji) {
      setSnackbar({ open: true, message: '이모지를 선택해주세요.', severity: 'warning' })
      return
    }
    setSubmitting(true)
    const { error } = await supabase.from('guestbook').insert([{
      writer_name: form.writer_name,
      email: form.email,
      is_email_public: form.is_email_public,
      company_or_job: form.company_or_job || null,
      keyword: form.keyword || null,
      emoji: form.emoji,
      message: form.message,
    }])
    setSubmitting(false)
    if (error) {
      setSnackbar({ open: true, message: '등록에 실패했습니다. 다시 시도해주세요.', severity: 'error' })
    } else {
      setSnackbar({ open: true, message: '방명록이 등록되었습니다!', severity: 'success' })
      setForm({ writer_name: '', email: '', is_email_public: false, company_or_job: '', keyword: '', emoji: '', message: '' })
      onSubmitSuccess?.()
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        name="writer_name"
        label="NAME *"
        value={form.writer_name}
        onChange={handleChange}
        required
        fullWidth
        variant="standard"
        sx={{ ...inputSx, mb: 4 }}
      />

      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mb: 4 }}>
        <TextField
          name="email"
          label="EMAIL *"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          fullWidth
          variant="standard"
          sx={inputSx}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="is_email_public"
              checked={form.is_email_public}
              onChange={handleChange}
              size="small"
              sx={{ color: 'rgba(224,224,224,0.25)', '&.Mui-checked': { color: '#C4E038' }, p: 0.5 }}
            />
          }
          label={
            <Typography sx={{ fontSize: '0.875rem', color: 'rgba(224,224,224,0.4)', whiteSpace: 'nowrap' }}>
              이메일 공개
            </Typography>
          }
          sx={{ mb: 0.3, flexShrink: 0 }}
        />
      </Box>

      <TextField
        name="company_or_job"
        label="COMPANY / JOB (선택)"
        value={form.company_or_job}
        onChange={handleChange}
        fullWidth
        variant="standard"
        sx={{ ...inputSx, mb: 4 }}
      />

      <TextField
        name="keyword"
        label="TODAY'S KEYWORD (선택)"
        value={form.keyword}
        onChange={handleChange}
        fullWidth
        variant="standard"
        sx={{ ...inputSx, mb: 4 }}
      />

      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: '0.875rem', letterSpacing: 1, color: 'rgba(224,224,224,0.3)', mb: 1.5 }}>
          EMOJI *
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {EMOJIS.map(e => (
            <Box
              key={e}
              onClick={() => setForm(prev => ({ ...prev, emoji: e }))}
              sx={{
                width: 42, height: 42,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem',
                cursor: 'pointer',
                border: form.emoji === e
                  ? '1.5px solid #C4E038'
                  : '1px solid rgba(224,224,224,0.12)',
                transition: 'border-color 0.2s, background-color 0.2s',
                backgroundColor: form.emoji === e ? 'rgba(196,224,56,0.06)' : 'transparent',
                '&:hover': { borderColor: 'rgba(196,224,56,0.45)' },
              }}
            >
              {e}
            </Box>
          ))}
        </Box>
      </Box>

      <TextField
        name="message"
        label="MESSAGE *"
        value={form.message}
        onChange={handleChange}
        required
        fullWidth
        multiline
        rows={3}
        variant="standard"
        sx={{ ...inputSx, mb: 5 }}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={submitting}
        sx={{
          backgroundColor: 'var(--color-button-primary)',
          color: 'var(--color-text-inverse)',
          fontWeight: 700,
          px: 4,
          '&:hover': { backgroundColor: 'var(--color-button-hover)' },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(196,224,56,0.3)',
            color: 'rgba(14,14,14,0.4)',
          },
        }}
      >
        {submitting ? '등록 중...' : '등록하기'}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(p => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar(p => ({ ...p, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

function GuestbookFeed({ refreshTrigger }) {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const fetchEntries = async () => {
      const { data } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
      if (data) setEntries(data)
    }
    fetchEntries()
  }, [refreshTrigger])

  if (entries.length === 0) {
    return (
      <Typography sx={{ color: 'rgba(224,224,224,0.18)', fontSize: '0.875rem', mt: 2, py: 4, textAlign: 'center' }}>
        아직 작성된 방명록이 없어요. 첫 번째 방명록을 남겨주세요!
      </Typography>
    )
  }

  return (
    <Box>
      <Divider sx={{ borderColor: 'rgba(224,224,224,0.08)' }} />
      {entries.map(entry => (
        <Box key={entry.id}>
          <Box sx={{ py: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
                <Typography component="span" sx={{ fontSize: '0.875rem', lineHeight: 1 }}>{entry.emoji}</Typography>
                <Typography sx={{ color: '#E0E0E0', fontSize: '0.875rem', fontWeight: 600 }}>
                  {entry.writer_name}
                </Typography>
                {entry.company_or_job && (
                  <Typography sx={{ color: 'rgba(224,224,224,0.35)', fontSize: '0.875rem' }}>
                    · {entry.company_or_job}
                  </Typography>
                )}
                {entry.is_email_public && (
                  <Typography
                    component="a"
                    href={`mailto:${entry.email}`}
                    sx={{ color: 'rgba(196,224,56,0.5)', fontSize: '0.875rem', textDecoration: 'none', '&:hover': { color: '#C4E038' }, transition: 'color 0.2s' }}
                  >
                    {entry.email}
                  </Typography>
                )}
              </Box>
              <Typography sx={{ color: 'rgba(224,224,224,0.2)', fontSize: '0.875rem', flexShrink: 0 }}>
                {new Date(entry.created_at).toLocaleDateString('ko-KR')}
              </Typography>
            </Box>

            {entry.keyword && (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 1, py: 0.25,
                  border: '1px solid rgba(196,224,56,0.25)',
                  color: 'rgba(196,224,56,0.6)',
                  fontSize: '0.875rem',
                  letterSpacing: 0.5,
                  mb: 1.2,
                }}
              >
                # {entry.keyword}
              </Box>
            )}

            <Typography sx={{ color: 'rgba(224,224,224,0.6)', fontSize: '0.875rem', lineHeight: 1.8, wordBreak: 'keep-all' }}>
              {entry.message}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: 'rgba(224,224,224,0.08)' }} />
        </Box>
      ))}
    </Box>
  )
}

function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [titleRef, titleInView] = useInView()

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('choiseulgi91@naver.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Box
      id="contact"
      sx={{
        backgroundColor: '#121212',
        py: { xs: 10, md: 14 },
        borderTop: '1px solid rgba(224,224,224,0.06)',
      }}
    >
      <Container maxWidth="sm">
        <Box
          ref={titleRef}
          sx={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: '#C4E038', letterSpacing: 0, mb: 2, display: 'block', textAlign: 'center' }}
          >
            Contact
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: '#E0E0E0',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              mb: 8,
              textAlign: 'center',
            }}
          >
            Let's Connect
          </Typography>
          <Typography
            sx={{
              color: 'rgba(224,224,224,0.45)',
              fontSize: '0.9375rem',
              textAlign: 'center',
              mb: 8,
              mt: -6,
              wordBreak: 'keep-all',
              lineHeight: 1.8,
            }}
          >
            함께 성장할 기회를 찾고 있습니다.
          </Typography>
        </Box>

        <Box>
          <Divider sx={{ borderColor: 'rgba(224,224,224,0.1)' }} />
          {INFO_ROWS.map(({ label, renderValue }) => (
            <Box key={label}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 2.5,
                  px: 0.5,
                  cursor: 'default',
                  '&:hover .info-label': { color: '#C4E038' },
                  '&:hover .info-value': { color: '#C4E038' },
                }}
              >
                <Typography
                  className="info-label"
                  sx={{
                    color: 'rgba(224,224,224,0.28)',
                    fontSize: '0.875rem',
                    letterSpacing: 1.5,
                    fontWeight: 600,
                    transition: 'color 0.2s',
                    minWidth: 90,
                    flexShrink: 0,
                  }}
                >
                  {label}
                </Typography>
                {renderValue(copied, handleCopyEmail)}
              </Box>
              <Divider sx={{ borderColor: 'rgba(224,224,224,0.1)' }} />
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 4, mt: 5, justifyContent: 'center' }}>
          {[
            { label: '/GITHUB', href: 'https://github.com/choiseulgi' },
            { label: '/INSTAGRAM', href: '#' },
          ].map(({ label, href }) => (
            <Typography
              key={label}
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'rgba(224,224,224,0.3)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                letterSpacing: 2,
                fontWeight: 500,
                transition: 'color 0.35s ease',
                '&:hover': { color: '#E0E0E0' },
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>

      </Container>
    </Box>
  )
}

function GuestbookSection() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  return (
    <Box
      sx={{
        backgroundColor: '#0E0E0E',
        py: { xs: 10, md: 14 },
        borderTop: '1px solid rgba(224,224,224,0.06)',
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="overline"
          sx={{ color: '#C4E038', letterSpacing: 0, mb: 2, display: 'block', textAlign: 'center' }}
        >
          Guestbook
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: '#E0E0E0',
            letterSpacing: '-0.02em',
            mb: 2,
            textAlign: 'center',
          }}
        >
          Leave a Message
        </Typography>
        <Typography
          sx={{ color: 'rgba(224,224,224,0.35)', fontSize: '0.875rem', textAlign: 'center', mb: 8, wordBreak: 'keep-all' }}
        >
          방문해주셔서 감사합니다. 짧은 인사나 피드백을 남겨주세요.
        </Typography>

        <GuestbookForm onSubmitSuccess={() => setRefreshTrigger(p => p + 1)} />

        <Box sx={{ mt: 10 }}>
          <Typography
            sx={{ color: 'rgba(224,224,224,0.2)', fontSize: '0.6rem', letterSpacing: 4, fontWeight: 600, mb: 3 }}
          >
            FEED
          </Typography>
          <GuestbookFeed refreshTrigger={refreshTrigger} />
        </Box>

        <Typography
          sx={{ color: 'rgba(224,224,224,0.2)', mt: 10, fontSize: '0.75rem', textAlign: 'center' }}
        >
          © 2026 Choi Seulgi. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

/* ── Home 페이지 조합 ─────────────────────────────────────── */
export default function Home() {
  return (
    <Box>
      <HeroSection />
      <ProjectsSection />
      <ContactSection />
      <GuestbookSection />
    </Box>
  )
}
