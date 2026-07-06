import { useState } from 'react'
import {
  Box, Container, Typography, Grid,
  Accordion, AccordionSummary, AccordionDetails,
  Chip, Tooltip,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { designSkills, codeSkills } from '../data/skills'
import { useInView } from '../hooks/useInView'

const aboutMeData = {
  basicInfo: {
    name: '최슬기',
    role: 'UI/UX Designer',
    work: [
      { date: '2024. 06 ~ 2025. 12', content: '네오시스템 (기획 및 디자인)' },
      { date: '2016. 01 ~ 2021. 10', content: '국립수산과학원 (연구원)' },
    ],
    education: [
      { date: '2026. 07', content: "SBS아카데미 '웹디자이너 실무자 양성과정' 수료" },
      { date: '2023. 12', content: "그린AI캠퍼스 '디지털 편집디자인 인재 양성과정' 수료" },
      { date: '2016. 02', content: '전남대학교 수산과학과 대학원 졸업' },
      { date: '2014. 02', content: '전남대학교 해양생산관리학과 졸업' },
    ],
    certification: [
      { date: '2024. 07', content: '컴퓨터그래픽스운용기능사' },
      { date: '2023. 12', content: 'GTQ 인디자인 1급' },
      { date: '2023. 11', content: 'GTQ 포토샵 1급' },
      { date: '2023. 11', content: 'GTQ 일러스트 1급' },
      { date: '2013. 12', content: '사무자동화산업기사' },
    ],
  },
  sections: [
    {
      id: 'why-design',
      title: 'Why Design',
      content: '사용자가 정보를 쉽고 편안하게 이해할 수 있는 화면을 만드는 것에 흥미를 느껴 UI/UX 디자인을 시작했습니다. 피그마를 활용해 다양한 서비스를 기획하고 설계하며, 사용자의 관점에서 더 쉽고 직관적인 경험을 만드는 방법을 꾸준히 고민하고 있습니다. 보기 좋은 화면을 넘어 문제를 해결하는 디자인을 만드는 것이 저의 목표입니다.',
    },
    {
      id: 'how-i-design',
      title: 'How I Design',
      content: '모든 디자인에 명확한 이유가 있어야 한다고 생각합니다.\n정보의 우선순위를 분명히 전달하고 사용자가 자연스럽게 흐름을 따라갈 수 있는 설계를 추구합니다.\n작은 간격과 정렬, 터치 영역 하나에도 근거를 두는 디테일을 만들어가고 싶습니다.',
    },
    {
      id: 'how-i-learn',
      title: 'How I Learn',
      content: '새로운 웹사이트와 앱을 탐색하는 것을 좋아합니다. 좋은 서비스를 발견하면 단순히 사용하는 데 그치지 않고 화면 구성과 사용자 흐름을 살펴보며 설계 의도를 분석합니다. 인상 깊은 디자인은 직접 피그마로 구현해 보며 구조와 원리를 이해하고, 이를 통해 실무 감각과 디자인 역량을 꾸준히 키워가고 있습니다.',
    },
  ],
}


const cardSx = {
  backgroundColor: '#1A1A1A',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '12px',
  p: { xs: 3, md: 3.5 },
  height: '100%',
  boxSizing: 'border-box',
  transition: 'transform 0.25s ease, border-color 0.25s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: 'rgba(33,241,168,0.3)',
  },
}

const labelSx = {
  color: '#D2D2D2',
  fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
  fontSize: '0.75rem',
  letterSpacing: 0,
  fontWeight: 400,
  mb: 3,
  display: 'block',
}

const itemSx = {
  color: '#E0E0E0',
  fontSize: '0.9375rem',
  lineHeight: 1.9,
  wordBreak: 'keep-all',
  whiteSpace: 'nowrap',
}

export default function AboutMe() {
  const [expanded, setExpanded] = useState('why-design')
  const [gridRef, gridInView] = useInView()
  const [accordionRef, accordionInView] = useInView()

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0E0E0E',
        pt: { xs: 12, md: 14 },
        pb: { xs: 10, md: 14 },
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes popIn': {
          '0%':   { transform: 'scale(0.7)', opacity: 0 },
          '70%':  { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)',   opacity: 1 },
        },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 5 } }}>

        {/* ── 인트로 문구 ── */}
        <Box sx={{ mb: { xs: 8, md: 10 } }}>
          <Typography
            sx={{
              fontSize: { xs: '2.2rem', md: '3.75rem' },
              fontWeight: 700,
              color: '#E0E0E0',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              animation: 'fadeInUp 0.6s ease 0.1s both',
            }}
          >
            Hello{' '}
            <Box
              component="span"
              sx={{
                color: '#21F1A8',
                display: 'inline-block',
                animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.6s both',
                fontSize: { xs: '2.6rem', md: '4.4rem' },
              }}
            >
              :D
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2.2rem', md: '3.75rem' },
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              animation: 'fadeInUp 0.6s ease 0.3s both',
            }}
          >
            <Box component="span" sx={{ color: '#21F1A8' }}>I'm </Box>
            <Box component="span" sx={{ color: '#E0E0E0' }}>Seulgi Choi</Box>
          </Typography>
        </Box>

        {/* ── 2컬럼 레이아웃 ── */}
        <Grid ref={gridRef} container spacing={2} sx={{ mb: { xs: 6, md: 8 }, opacity: gridInView ? 1 : 0, transform: gridInView ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }} alignItems="stretch">

          {/* 좌측: Work + Certification */}
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>

              {/* Work */}
              <Box sx={cardSx}>
                <Typography component="span" sx={labelSx}>WORK</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {aboutMeData.basicInfo.work.map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 0.25, md: 2 } }}>
                      <Typography sx={{ ...itemSx, color: 'rgba(224,224,224,0.4)', flexShrink: 0 }}>
                        {item.date}
                      </Typography>
                      <Typography sx={itemSx}>{item.content}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Certification */}
              <Box sx={{ ...cardSx, flexGrow: 1 }}>
                <Typography component="span" sx={labelSx}>CERTIFICATION</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {aboutMeData.basicInfo.certification.map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 0.25, md: 2 } }}>
                      <Typography sx={{ ...itemSx, color: 'rgba(224,224,224,0.4)', flexShrink: 0 }}>
                        {item.date}
                      </Typography>
                      <Typography sx={itemSx}>{item.content}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

            </Box>
          </Grid>

          {/* 우측: Education + Skills */}
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>

              {/* Education */}
              <Box sx={cardSx}>
                <Typography component="span" sx={labelSx}>EDUCATION</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {aboutMeData.basicInfo.education.map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 0.25, md: 2 } }}>
                      <Typography sx={{ ...itemSx, color: 'rgba(224,224,224,0.4)', flexShrink: 0 }}>
                        {item.date}
                      </Typography>
                      <Typography sx={itemSx}>{item.content}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Skills */}
              <Box sx={{ ...cardSx, flexGrow: 1 }}>
                <Typography component="span" sx={{ ...labelSx, mb: 2 }}>SKILLS</Typography>

                {/* DESIGN TOOLS */}
                <Typography sx={{ fontSize: '0.6875rem', fontWeight: 500, color: 'rgba(224,224,224,0.4)', letterSpacing: '0.05em', mb: 1 }}>
                  DESIGN TOOLS
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {designSkills.map(({ name, tooltip }) => (
                    <Tooltip key={name} title={tooltip || ''} placement="top" arrow disableHoverListener={!tooltip}
                      componentsProps={{
                        tooltip: { sx: { backgroundColor: '#2A2A2A', color: '#21F1A8', fontSize: '0.75rem', border: '1px solid rgba(33,241,168,0.2)' } },
                        arrow: { sx: { color: '#2A2A2A' } },
                      }}
                    >
                      <Chip label={name} size="small" sx={{
                        backgroundColor: 'rgba(224,224,224,0.08)', color: '#E0E0E0',
                        border: '1px solid rgba(224,224,224,0.25)', fontWeight: 400, fontSize: '0.8125rem',
                        cursor: tooltip ? 'help' : 'default', transition: 'all 0.2s',
                        '&:hover': tooltip ? { backgroundColor: 'rgba(33,241,168,0.12)', color: '#21F1A8', borderColor: 'rgba(33,241,168,0.5)' }
                          : { backgroundColor: 'rgba(224,224,224,0.14)', borderColor: 'rgba(224,224,224,0.4)' },
                      }} />
                    </Tooltip>
                  ))}
                </Box>

                {/* CODE */}
                <Typography sx={{ fontSize: '0.6875rem', fontWeight: 500, color: 'rgba(224,224,224,0.4)', letterSpacing: '0.05em', mb: 1 }}>
                  CODE
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {codeSkills.map(({ name, tooltip }) => (
                    <Tooltip key={name} title={tooltip || ''} placement="top" arrow disableHoverListener={!tooltip}
                      componentsProps={{
                        tooltip: { sx: { backgroundColor: '#2A2A2A', color: '#21F1A8', fontSize: '0.75rem', border: '1px solid rgba(33,241,168,0.2)' } },
                        arrow: { sx: { color: '#2A2A2A' } },
                      }}
                    >
                      <Chip label={name} size="small" sx={{
                        backgroundColor: 'rgba(224,224,224,0.08)', color: '#E0E0E0',
                        border: '1px solid rgba(224,224,224,0.25)', fontWeight: 400, fontSize: '0.8125rem',
                        cursor: tooltip ? 'help' : 'default', transition: 'all 0.2s',
                        '&:hover': tooltip ? { backgroundColor: 'rgba(33,241,168,0.12)', color: '#21F1A8', borderColor: 'rgba(33,241,168,0.5)' }
                          : { backgroundColor: 'rgba(224,224,224,0.14)', borderColor: 'rgba(224,224,224,0.4)' },
                      }} />
                    </Tooltip>
                  ))}
                </Box>
              </Box>

            </Box>
          </Grid>

        </Grid>

        {/* ── 아코디언 섹션 구분 ── */}
        <Typography
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700,
            color: '#FBFBFB',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            mb: { xs: 3, md: 5 },
            mt: { xs: 8, md: 12 },
          }}
        >
          MORE<br />ABOUT ME
        </Typography>

        {/* ── 아코디언 섹션 ── */}
        <Box ref={accordionRef} sx={{ opacity: accordionInView ? 1 : 0, transform: accordionInView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          {aboutMeData.sections.map((section) => (
            <Accordion
              key={section.id}
              expanded={expanded === section.id}
              onChange={handleChange(section.id)}
              disableGutters
              elevation={0}
              sx={{
                backgroundColor: 'transparent',
                borderTop: '1px solid rgba(224,224,224,0.08)',
                '&:last-of-type': { borderBottom: '1px solid rgba(224,224,224,0.08)' },
                '&::before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: expanded === section.id ? '#21F1A8' : 'rgba(224,224,224,0.3)',
                      transition: 'color 0.2s',
                    }}
                  />
                }
                sx={{
                  px: 0,
                  py: 3,
                  minHeight: 'unset',
                  '& .MuiAccordionSummary-content': { my: 0 },
                  '&:hover .section-title': { color: '#21F1A8' },
                }}
              >
                <Typography
                  className="section-title"
                  sx={{
                    color: expanded === section.id ? '#21F1A8' : '#E0E0E0',
                    fontWeight: 700,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    letterSpacing: '-0.01em',
                    transition: 'color 0.2s',
                  }}
                >
                  {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pb: 4, pt: 0 }}>
                <Typography
                  sx={{
                    color: 'rgba(224,224,224,0.6)',
                    fontSize: '0.9375rem',
                    lineHeight: 2,
                    wordBreak: 'keep-all',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {section.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

      </Container>
    </Box>
  )
}
