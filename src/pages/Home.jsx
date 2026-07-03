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

const LIME = '#D4F04A'
const FONT = 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif'
const OPEN_Q = String.fromCharCode(0x201C)
const CLOSE_Q = String.fromCharCode(0x201D)
const MARQUEE_BASE = "Hello :D — I'm Seulgi Choi        "

/* ── CircleButton ───────────────────────────────────────────── */
function CircleButton({ size, bgColor, label, to }) {
  const navigate = useNavigate()
  const isLime = bgColor === LIME

  return (
    <Box
      onClick={() => navigate(to)}
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        boxShadow: isLime
          ? 'inset -7px -9px 18px rgba(0,0,0,0.45), inset 6px 7px 16px rgba(255,255,220,0.38), 0 14px 44px rgba(212,240,74,0.32)'
          : 'inset -7px -9px 18px rgba(0,0,0,0.22), inset 6px 7px 16px rgba(255,255,255,0.55), 0 14px 44px rgba(255,255,255,0.12)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.07) translateY(-6px)',
          boxShadow: isLime
            ? 'inset -7px -9px 18px rgba(0,0,0,0.45), inset 6px 7px 16px rgba(255,255,220,0.38), 0 28px 68px rgba(212,240,74,0.48)'
            : 'inset -7px -9px 18px rgba(0,0,0,0.22), inset 6px 7px 16px rgba(255,255,255,0.55), 0 28px 68px rgba(255,255,255,0.24)',
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: FONT,
          color: '#0a0a0a',
          fontWeight: 700,
          fontSize: size > 170 ? '1rem' : '0.875rem',
          textAlign: 'center',
          px: 2,
          lineHeight: 1.4,
          userSelect: 'none',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}

/* ── 1. Hero 섹션 ───────────────────────────────────────────── */
function HeroSection() {
  const marqueeLine = MARQUEE_BASE.repeat(8)

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pt: '64px',
        '@keyframes marqFwd': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        '@keyframes marqBwd': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      }}
    >
      {/* BG 마퀴 텍스트 2줄 */}
      {[
        { top: '14%', anim: 'marqFwd 26s linear infinite' },
        { top: '60%', anim: 'marqBwd 32s linear infinite' },
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
            pointerEvents: 'none',
            zIndex: 0,
            userSelect: 'none',
          }}
        >
          {[0, 1].map(i => (
            <Box
              key={i}
              component="span"
              sx={{
                fontFamily: FONT,
                fontSize: { xs: '4.5rem', md: '7.5rem' },
                fontWeight: 800,
                color: 'rgba(255,255,255,0.038)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                display: 'inline-block',
              }}
            >
              {marqueeLine}
            </Box>
          ))}
        </Box>
      ))}

      {/* 중앙 콘텐츠 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          width: '100%',
          maxWidth: 920,
          px: { xs: 3, md: 6 },
        }}
      >
        {/* 헤드라인 */}
        <Box sx={{ mb: { xs: 10, md: 14 } }}>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '3rem', sm: '4.5rem', md: '5.625rem' },
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              mb: 2,
            }}
          >
            {OPEN_Q}왜 여기에 있어야 할까{CLOSE_Q}
          </Typography>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '1.5rem', sm: '2.2rem', md: '3.125rem' },
              fontWeight: 500,
              lineHeight: 1.4,
              letterSpacing: '-0.02em',
              mb: 3,
            }}
          >
            <Box component="span" sx={{ color: LIME }}>이유를 담아 설계하는</Box>
            {' '}
            <Box component="span" sx={{ color: '#ffffff' }}>디자이너 최슬기입니다</Box>
          </Typography>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '1rem', md: '1.5rem' },
              color: 'rgba(255,255,255,0.28)',
              letterSpacing: '0.08em',
              fontWeight: 400,
            }}
          >
            Web & Editorial Designer
          </Typography>
        </Box>

        {/* 구체 3개 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 3, md: 5 },
            flexWrap: 'wrap',
          }}
        >
          <CircleButton size={160} bgColor={LIME} label="About Me" to="/about" />
          <CircleButton size={200} bgColor="#ffffff" label="Web Design" to="/projects" />
          <CircleButton size={160} bgColor={LIME} label="Editorial Design" to="/projects" />
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
        backgroundColor: '#0f0f0f',
        py: { xs: 14, md: 20 },
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Container maxWidth="sm">
        <Box
          ref={ref}
          sx={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              mb: 6,
            }}
          >
            {'어떻게'}<br />{'디자인하나요?'}
          </Typography>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: '0.875rem', md: '0.9375rem' },
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 2,
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
    '&:after': { borderBottomColor: '#C4E038' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(224,224,224,0.3)', fontSize: '0.875rem', letterSpacing: 1, fontFamily: FONT },
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
          sx={{ color: '#E0E0E0', textDecoration: 'none', fontSize: '0.875rem', fontFamily: FONT, transition: 'color 0.2s', '&:hover': { color: '#C4E038' } }}
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
        sx={{ color: '#E0E0E0', textDecoration: 'none', fontSize: '0.875rem', fontFamily: FONT, transition: 'color 0.2s', '&:hover': { color: '#C4E038' } }}
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
        <Typography sx={{ fontSize: '0.875rem', fontFamily: FONT, letterSpacing: 1, color: 'rgba(224,224,224,0.3)', mb: 1.5 }}>
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
          backgroundColor: '#C4E038',
          color: '#0E0E0E',
          fontWeight: 700,
          fontFamily: FONT,
          px: 4,
          '&:hover': { backgroundColor: '#d4f04a' },
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
                  <Typography sx={{ color: 'rgba(224,224,224,0.35)', fontSize: '0.875rem', fontFamily: FONT }}>
                    {'· '}{entry.company_or_job}
                  </Typography>
                )}
                {entry.is_email_public && (
                  <Typography
                    component="a"
                    href={`mailto:${entry.email}`}
                    sx={{ color: 'rgba(196,224,56,0.5)', fontSize: '0.875rem', fontFamily: FONT, textDecoration: 'none', '&:hover': { color: '#C4E038' }, transition: 'color 0.2s' }}
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
                  border: '1px solid rgba(196,224,56,0.25)',
                  color: 'rgba(196,224,56,0.6)',
                  fontSize: '0.875rem',
                  fontFamily: FONT,
                  letterSpacing: 0.5,
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
            sx={{ color: '#C4E038', letterSpacing: 0, mb: 2, display: 'block', textAlign: 'center', fontFamily: FONT }}
          >
            Contact
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              fontFamily: FONT,
              color: '#E0E0E0',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              mb: 8,
              textAlign: 'center',
            }}
          >
            {`Let's Connect`}
          </Typography>
          <Typography
            sx={{
              color: 'rgba(224,224,224,0.45)',
              fontSize: '0.9375rem',
              fontFamily: FONT,
              textAlign: 'center',
              mb: 8,
              mt: -6,
              wordBreak: 'keep-all',
              lineHeight: 1.8,
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
                  '&:hover .info-label': { color: '#C4E038' },
                  '&:hover .info-value': { color: '#C4E038' },
                }}
              >
                <Typography
                  className="info-label"
                  sx={{
                    color: 'rgba(224,224,224,0.28)',
                    fontSize: '0.875rem',
                    fontFamily: FONT,
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
                fontFamily: FONT,
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
          sx={{ color: '#C4E038', letterSpacing: 0, mb: 2, display: 'block', textAlign: 'center', fontFamily: FONT }}
        >
          Guestbook
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            fontFamily: FONT,
            color: '#E0E0E0',
            letterSpacing: '-0.02em',
            mb: 2,
            textAlign: 'center',
          }}
        >
          Leave a Message
        </Typography>
        <Typography
          sx={{ color: 'rgba(224,224,224,0.35)', fontSize: '0.875rem', fontFamily: FONT, textAlign: 'center', mb: 8, wordBreak: 'keep-all' }}
        >
          {'방문해주셔서 감사합니다. 짧은 인사나 피드백을 남겨주세요.'}
        </Typography>

        <GuestbookForm onSubmitSuccess={() => setRefreshTrigger(p => p + 1)} />

        <Box sx={{ mt: 10 }}>
          <Typography
            sx={{ color: 'rgba(224,224,224,0.2)', fontSize: '0.6rem', fontFamily: FONT, letterSpacing: 4, fontWeight: 600, mb: 3 }}
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
