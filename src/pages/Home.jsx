import { useState, useEffect } from 'react'
import {
  Box, Typography, Container, Button,
  TextField, Divider, Snackbar, Alert,
  IconButton, Tooltip, Checkbox, FormControlLabel,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useInView } from '../hooks/useInView'

const LIME = '#21F1A8'
const FONT = 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif'
const OPEN_Q = String.fromCharCode(0x201C)
const CLOSE_Q = String.fromCharCode(0x201D)
const MARQUEE_BASE = "Hello :D — I'm Seulgi Choi "


/* ── 1. Hero 섹션 ───────────────────────────────────────────── */
function HeroSection() {
  const marqueeLine = MARQUEE_BASE.repeat(8)
  const fullHeadline = `${OPEN_Q}왜 여기에 있어야 할까${CLOSE_Q}`

  const [typed, setTyped] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    let intervalId = null
    const timeoutId = setTimeout(() => {
      let i = 0
      intervalId = setInterval(() => {
        i++
        setTyped(fullHeadline.slice(0, i))
        if (i >= fullHeadline.length) {
          clearInterval(intervalId)
          setTypingDone(true)
        }
      }, 100)
    }, 400)
    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#171717',
        pt: '64px',
        '@keyframes marqFwd': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        '@keyframes marqBwd': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        '@keyframes blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        '@keyframes photoLeft': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }}
    >
      {/* BG 마퀴 — overflow:hidden 컨테이너 */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        {[
          { top: '5%', anim: 'marqFwd 130s linear infinite' },
          { top: '54%', anim: 'marqBwd 160s linear infinite' },
        ].map(({ top, anim }) => (
          <Box
            key={top}
            sx={{
              position: 'absolute',
              top,
              left: 0,
              whiteSpace: 'nowrap',
              display: 'flex',
              animation: anim,
              userSelect: 'none',
            }}
          >
            {[0, 1].map(i => (
              <Box
                key={i}
                component="span"
                sx={{
                  fontFamily: FONT,
                  fontSize: { xs: '120px', md: '250px' },
                  fontWeight: 600,
                  color: '#1E1E1E',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.6,
                  display: 'inline-block',
                }}
              >
                {marqueeLine}
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      {/* 텍스트 콘텐츠 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          pt: { xs: '12%', md: '10%' },
          px: { xs: '20px', md: '80px' },
        }}
      >
        <Box sx={{ minHeight: { xs: '4rem', sm: '5.5rem', md: '7rem' }, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: { xs: 4, md: 7 } }}>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '3rem', sm: '4.5rem', md: '5.625rem' },
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            {typed}
            {!typingDone && (
              <Box component="span" sx={{ animation: 'blink 0.7s step-end infinite', ml: '2px' }}>|</Box>
            )}
          </Typography>
        </Box>

        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '1.5rem', sm: '2.2rem', md: '3.125rem' },
              fontWeight: 500,
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
              opacity: typingDone ? 1 : 0,
              transform: typingDone ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
            }}
          >
            <Box component="span" sx={{ color: LIME }}>이유</Box>
            <Box component="span" sx={{ color: '#ffffff' }}>를 담아 설계하는</Box>
          </Typography>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '1.5rem', sm: '2.2rem', md: '3.125rem' },
              fontWeight: 500,
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
              opacity: typingDone ? 1 : 0,
              transform: typingDone ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
            }}
          >
            <Box component="span" sx={{ color: '#ffffff' }}>디자이너 </Box>
            <Box component="span" sx={{ color: LIME }}>최슬기</Box>
            <Box component="span" sx={{ color: '#ffffff' }}>입니다</Box>
          </Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.28)',
            letterSpacing: '-0.01em',
            fontWeight: 400,
            opacity: typingDone ? 1 : 0,
            transform: typingDone ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s',
          }}
        >
          Web & Editorial Designer
        </Typography>
      </Box>

      {/* 사진 마퀴 스트립 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          overflow: 'hidden',
          mt: { xs: '48px', sm: '64px', md: '200px' },
          opacity: typingDone ? 1 : 0,
          transition: 'opacity 0.8s ease 0.9s',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            animation: 'photoLeft 22s linear infinite',
            width: 'max-content',
          }}
        >
          {[0, 1, 2, 3, 4, 0, 1, 2, 3, 4].map((_, i) => (
            <Box
              key={i}
              sx={{
                width: '427px',
                height: '460px',
                flexShrink: 0,
                backgroundColor: '#242424',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

/* ── StepCard ───────────────────────────────────────────────── */
/* ── 2. 어떻게 디자인하나요? 섹션 ─────────────────────────── */
function HowIDesignSection() {
  const [ref, inView] = useInView()

  return (
    <Box
      sx={{
        backgroundColor: '#171717',
        pt: '250px',
        pb: '120px',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: '20px', md: '80px' } }}>
        <Box
          ref={ref}
          sx={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '2.8rem', md: '4.375rem' },
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              lineHeight: 1.34,
              mb: 6,
            }}
          >
            {'어떻게'}<br />{'디자인하나요?'}
          </Typography>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '1.1rem', md: '1.5rem' },
              fontWeight: 300,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
              wordBreak: 'keep-all',
            }}
          >
            {'모든 디자인에 명확한 이유가 있어야 한다고 생각합니다.'}
            <br />
            {'정보의 우선순위를 분명히 전달하고 사용자가 자연스럽게 흐름을 따라갈 수 있는 설계를 추구합니다.'}
            <br />
            {'작은 간격과 정렬, 터치 영역 하나에도 근거를 두는 디테일을 만들어가고 싶습니다.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

/* ── 3. Contact 섹션 ────────────────────────────────────────── */
const inputSx = {
  '& .MuiInput-root': {
    color: '#E0E0E0',
    fontSize: '0.875rem',
    fontFamily: FONT,
    '&:before': { borderBottomColor: 'rgba(224,224,224,0.18)' },
    '&:hover:not(.Mui-disabled):before': { borderBottomColor: 'rgba(224,224,224,0.45)' },
    '&:after': { borderBottomColor: '#21F1A8' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(224,224,224,0.3)', fontSize: '0.875rem', letterSpacing: '-0.01em', fontFamily: FONT },
  '& .MuiInputLabel-root.Mui-focused': { color: '#21F1A8' },
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
          sx={{ color: '#E0E0E0', textDecoration: 'none', fontSize: '0.875rem', fontFamily: FONT, transition: 'color 0.2s', '&:hover': { color: '#21F1A8' } }}
        >
          choiseulgi91@naver.com
        </Typography>
        <Tooltip title={copied ? '복사됨!' : 'Copy'} placement="top">
          <IconButton
            size="small"
            onClick={onCopy}
            sx={{ color: copied ? '#21F1A8' : 'rgba(224,224,224,0.22)', p: 0.5, transition: 'color 0.2s', '&:hover': { color: '#21F1A8', backgroundColor: 'transparent' } }}
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
      <Typography className="info-value" sx={{ color: '#E0E0E0', fontSize: '0.875rem', fontFamily: FONT, transition: 'color 0.2s' }}>
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
        sx={{ color: '#E0E0E0', textDecoration: 'none', fontSize: '0.875rem', fontFamily: FONT, transition: 'color 0.2s', '&:hover': { color: '#21F1A8' } }}
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
              sx={{ color: 'rgba(224,224,224,0.25)', '&.Mui-checked': { color: '#21F1A8' }, p: 0.5 }}
            />
          }
          label={
            <Typography sx={{ fontSize: '0.875rem', fontFamily: FONT, color: 'rgba(224,224,224,0.4)', whiteSpace: 'nowrap' }}>
              {'이메일 공개'}
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
        <Typography sx={{ fontSize: '0.875rem', fontFamily: FONT, letterSpacing: '-0.01em', color: 'rgba(224,224,224,0.3)', mb: 1.5 }}>
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
                  ? '1.5px solid #21F1A8'
                  : '1px solid rgba(224,224,224,0.12)',
                transition: 'border-color 0.2s, background-color 0.2s',
                backgroundColor: form.emoji === e ? 'rgba(33,241,168,0.06)' : 'transparent',
                '&:hover': { borderColor: 'rgba(33,241,168,0.45)' },
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
          backgroundColor: '#21F1A8',
          color: '#0E0E0E',
          fontWeight: 700,
          fontFamily: FONT,
          px: 4,
          '&:hover': { backgroundColor: '#4FF5BC' },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(33,241,168,0.3)',
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
      <Typography sx={{ color: 'rgba(224,224,224,0.18)', fontSize: '0.875rem', fontFamily: FONT, mt: 2, py: 4, textAlign: 'center' }}>
        {'아직 작성된 방명록이 없어요. 첫 번째 방명록을 남겨주세요!'}
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
                <Typography sx={{ color: '#E0E0E0', fontSize: '0.875rem', fontFamily: FONT, fontWeight: 600 }}>
                  {entry.writer_name}
                </Typography>
                {entry.company_or_job && (
                  <Typography sx={{ color: '#E8E8E8', fontSize: '0.875rem', fontFamily: FONT }}>
                    {'· '}{entry.company_or_job}
                  </Typography>
                )}
                {entry.is_email_public && (
                  <Typography
                    component="a"
                    href={`mailto:${entry.email}`}
                    sx={{ color: 'rgba(33,241,168,0.5)', fontSize: '0.875rem', fontFamily: FONT, textDecoration: 'none', '&:hover': { color: '#21F1A8' }, transition: 'color 0.2s' }}
                  >
                    {entry.email}
                  </Typography>
                )}
              </Box>
              <Typography sx={{ color: 'rgba(224,224,224,0.2)', fontSize: '0.875rem', fontFamily: FONT, flexShrink: 0 }}>
                {new Date(entry.created_at).toLocaleDateString('ko-KR')}
              </Typography>
            </Box>

            {entry.keyword && (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 1, py: 0.25,
                  border: '1px solid rgba(33,241,168,0.25)',
                  color: 'rgba(33,241,168,0.6)',
                  fontSize: '0.875rem',
                  fontFamily: FONT,
                  letterSpacing: '-0.01em',
                  mb: 1.2,
                }}
              >
                {'# '}{entry.keyword}
              </Box>
            )}

            <Typography sx={{ color: 'rgba(224,224,224,0.6)', fontSize: '0.875rem', fontFamily: FONT, lineHeight: 1.8, wordBreak: 'keep-all' }}>
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
        py: '120px',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: '20px', md: '80px' } }}>
        <Box sx={{ maxWidth: 560, mx: 'auto' }}>
        <Box
          ref={titleRef}
          sx={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '1.8rem', md: '2.625rem' },
              fontWeight: 600,
              fontFamily: FONT,
              color: '#E0E0E0',
              letterSpacing: '-0.01em',
              lineHeight: 1.6,
              mt: '-8px',
              mb: 0.5,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {`Let's Connect`}
          </Typography>
          <Typography
            sx={{
              color: '#E8E8E8',
              fontSize: '1rem',
              fontFamily: FONT,
              textAlign: 'center',
              mb: 8,
              wordBreak: 'keep-all',
            }}
          >
            {'함께 성장할 기회를 찾고 있습니다.'}
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
                  '&:hover .info-label': { color: '#21F1A8' },
                  '&:hover .info-value': { color: '#21F1A8' },
                }}
              >
                <Typography
                  className="info-label"
                  sx={{
                    color: 'rgba(224,224,224,0.28)',
                    fontSize: '0.875rem',
                    fontFamily: FONT,
                    letterSpacing: '-0.01em',
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
                fontFamily: FONT,
                letterSpacing: '-0.01em',
                fontWeight: 500,
                transition: 'color 0.35s ease',
                '&:hover': { color: '#E0E0E0' },
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>
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
        backgroundColor: '#171717',
        py: '120px',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: '20px', md: '80px' } }}>
        <Box sx={{ maxWidth: 560, mx: 'auto' }}>
        <Typography
          sx={{
            fontSize: { xs: '1.8rem', md: '2.625rem' },
            fontWeight: 600,
            fontFamily: FONT,
            color: '#E0E0E0',
            letterSpacing: '-0.01em',
            lineHeight: 1.6,
            mt: '-8px',
            mb: 0.5,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {'Leave a Message'}
        </Typography>
        <Typography
          sx={{ color: '#E8E8E8', fontSize: '1rem', fontFamily: FONT, textAlign: 'center', mb: 8, wordBreak: 'keep-all' }}
        >
          {'방문해주셔서 감사합니다. 짧은 인사나 피드백을 남겨주세요.'}
        </Typography>

        <GuestbookForm onSubmitSuccess={() => setRefreshTrigger(p => p + 1)} />

        <Box sx={{ mt: 10 }}>
          <Typography
            sx={{ color: 'rgba(224,224,224,0.2)', fontSize: '0.6rem', fontFamily: FONT, letterSpacing: '-0.01em', fontWeight: 600, mb: 3 }}
          >
            FEED
          </Typography>
          <GuestbookFeed refreshTrigger={refreshTrigger} />
        </Box>

        <Typography
          sx={{ color: 'rgba(224,224,224,0.2)', mt: 10, fontSize: '0.75rem', fontFamily: FONT, textAlign: 'center' }}
        >
          {'© 2026 Choi Seulgi. All rights reserved.'}
        </Typography>
        </Box>
      </Container>
    </Box>
  )
}

/* ── Home 페이지 ────────────────────────────────────────────── */
export default function Home() {
  return (
    <Box>
      <HeroSection />
      <HowIDesignSection />
      <ContactSection />
      <GuestbookSection />
    </Box>
  )
}
