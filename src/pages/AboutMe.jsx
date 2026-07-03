import { useState } from 'react'
import {
  Box, Container, Typography, Grid,
  Accordion, AccordionSummary, AccordionDetails,
  Chip, Tooltip,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { skills } from '../data/skills'
import { useInView } from '../hooks/useInView'

const aboutMeData = {
  basicInfo: {
    name: '理쒖뒳湲?,
    role: 'UI/UX Designer',
    work: [
      { date: '2024. 06 ~ 2025. 12', content: '?ㅼ삤?쒖뒪??(湲고쉷 諛??붿옄??' },
      { date: '2016. 01 ~ 2021. 10', content: '援?┰?섏궛怨쇳븰???곌뎄?? },
    ],
    education: [
      { date: '2026. 07', content: "SBS?꾩뭅?곕? '?밸뵒?먯씠???ㅻТ???묒꽦怨쇱젙' ?섎즺" },
      { date: '2023. 12', content: "洹몃┛AI罹좏띁??'?붿????몄쭛?붿옄???몄옱 ?묒꽦怨쇱젙' ?섎즺" },
      { date: '2016. 02', content: '?꾨궓??숆탳 ?섏궛怨쇳븰怨?議몄뾽' },
    ],
    certification: [
      { date: '2024. 07', content: '而댄벂?곌렇?섑뵿?ㅼ슫?⑷린?μ궗' },
      { date: '2023. 12', content: 'GTQ ?몃뵒?먯씤 1湲? },
      { date: '2023. 11', content: 'GTQ ?ы넗??1湲? },
      { date: '2023. 11', content: 'GTQ ?쇰윭?ㅽ듃 1湲? },
      { date: '2013. 12', content: '?щТ?먮룞?붿궛?낃린?? },
    ],
  },
  sections: [
    {
      id: 'why-design',
      title: 'Why Design',
      content: '?ъ슜?먭? ?뺣낫瑜??쎄퀬 ?몄븞?섍쾶 ?댄빐?????덈뒗 ?붾㈃??留뚮뱶??寃껋뿉 ?λ?瑜??먭뺨 UI/UX ?붿옄?몄쓣 ?쒖옉?덉뒿?덈떎. ?쇨렇留덈? ?쒖슜???ㅼ뼇???쒕퉬?ㅻ? 湲고쉷?섍퀬 ?ㅺ퀎?섎ŉ, ?ъ슜?먯쓽 愿?먯뿉?????쎄퀬 吏곴??곸씤 寃쏀뿕??留뚮뱶??諛⑸쾿??袁몄???怨좊??섍퀬 ?덉뒿?덈떎. 蹂닿린 醫뗭? ?붾㈃???섏뼱 臾몄젣瑜??닿껐?섎뒗 ?붿옄?몄쓣 留뚮뱶??寃껋씠 ???紐⑺몴?낅땲??',
    },
    {
      id: 'how-i-design',
      title: 'How I Design',
      content: '???紐⑤뱺 ?붿옄?몄뿉??紐낇솗???댁쑀媛 ?덉뼱???쒕떎怨??앷컖?⑸땲?? ?뺣낫???곗꽑?쒖쐞瑜?遺꾨챸?섍쾶 ?꾨떖?섍퀬, ?ъ슜?먭? ?먯뿰?ㅻ읇寃??먮쫫???곕씪媛????덈룄濡??ㅺ퀎?섎뒗 寃껋쓣 以묒슂?섍쾶 ?ш퉩?덈떎. ?묒? 媛꾧꺽怨??뺣젹, ?곗튂 ?곸뿭源뚯???洹쇨굅瑜?媛吏怨?寃곗젙?섎ŉ ?쇨????덈뒗 ?ъ슜??寃쏀뿕??留뚮뱶????吏묒쨷?⑸땲??',
    },
    {
      id: 'how-i-learn',
      title: 'How I Learn',
      content: '?덈줈???뱀궗?댄듃? ?깆쓣 ?먯깋?섎뒗 寃껋쓣 醫뗭븘?⑸땲?? 醫뗭? ?쒕퉬?ㅻ? 諛쒓껄?섎㈃ ?⑥닚???ъ슜?섎뒗 ??洹몄튂吏 ?딄퀬 ?붾㈃ 援ъ꽦怨??ъ슜???먮쫫???댄렣蹂대ŉ ?ㅺ퀎 ?섎룄瑜?遺꾩꽍?⑸땲?? ?몄긽 源딆? ?붿옄?몄? 吏곸젒 ?쇨렇留덈줈 援ы쁽??蹂대ŉ 援ъ“? ?먮━瑜??댄빐?섍퀬, ?대? ?듯빐 ?ㅻТ 媛먭컖怨??붿옄????웾??袁몄????ㅼ썙媛怨??덉뒿?덈떎.',
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
  color: 'rgba(33,241,168,0.65)',
  fontSize: '0.68rem',
  letterSpacing: 3,
  fontWeight: 700,
  mb: 2.5,
  display: 'block',
}

const itemSx = {
  color: '#E0E0E0',
  fontSize: '0.875rem',
  lineHeight: 1.9,
  wordBreak: 'keep-all',
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

        {/* ?? ?명듃濡?臾멸뎄 ?? */}
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

        {/* ?? 2而щ읆 ?덉씠?꾩썐 ?? */}
        <Grid ref={gridRef} container spacing={2} sx={{ mb: { xs: 6, md: 8 }, opacity: gridInView ? 1 : 0, transform: gridInView ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }} alignItems="stretch">

          {/* 醫뚯륫: Profile + Skills (4) */}
          <Grid item xs={12} md={5} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>

              {/* Profile */}
              <Box sx={{ ...cardSx, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography component="span" sx={labelSx}>PROFILE</Typography>
                {/* ?ъ쭊 ?곸뿭 ???ㅼ젣 ?ъ쭊?쇰줈 援먯껜 ??img ?쒓렇濡?蹂寃?*/}
                <Box
                  sx={{
                    width: '65%',
                    aspectRatio: '3 / 4',
                    backgroundColor: '#242424',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed rgba(255,255,255,0.07)',
                    mb: 3,
                  }}
                >
                  <Typography sx={{ color: 'rgba(255,255,255,0.12)', fontSize: '0.75rem', letterSpacing: 3 }}>
                    PHOTO
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: '#E0E0E0', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em', mb: 1 }}
                >
                  {aboutMeData.basicInfo.name}
                </Typography>
                <Chip
                  label={aboutMeData.basicInfo.role}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(33,241,168,0.1)',
                    color: '#21F1A8',
                    border: '1px solid rgba(33,241,168,0.3)',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    alignSelf: 'flex-start',
                    mb: 2.5,
                  }}
                />
                <Typography
                  sx={{
                    color: 'rgba(224,224,224,0.65)',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    wordBreak: 'keep-all',
                  }}
                >
                  ???ш린???덉뼱???좉퉴<br />?댁쑀瑜??댁븘 ?ㅺ퀎?섎뒗 ?붿옄?대꼫 理쒖뒳湲곗엯?덈떎
                </Typography>
              </Box>

              {/* Skills */}
              <Box sx={cardSx}>
                <Typography component="span" sx={labelSx}>SKILLS</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
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
                            color: '#21F1A8',
                            fontSize: '0.75rem',
                            border: '1px solid rgba(33,241,168,0.2)',
                          },
                        },
                        arrow: { sx: { color: '#2A2A2A' } },
                      }}
                    >
                      <Chip
                        label={name}
                        size="medium"
                        sx={{
                          backgroundColor: 'rgba(224,224,224,0.08)',
                          color: '#E0E0E0',
                          border: '1px solid rgba(224,224,224,0.25)',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          cursor: tooltip ? 'help' : 'default',
                          transition: 'all 0.2s',
                          '&:hover': tooltip ? {
                            backgroundColor: 'rgba(33,241,168,0.12)',
                            color: '#21F1A8',
                            borderColor: 'rgba(33,241,168,0.5)',
                          } : {
                            backgroundColor: 'rgba(224,224,224,0.14)',
                            borderColor: 'rgba(224,224,224,0.4)',
                          },
                        }}
                      />
                    </Tooltip>
                  ))}
                </Box>
              </Box>

            </Box>
          </Grid>

          {/* ?곗륫: Education + Work + Certification (6) */}
          <Grid item xs={12} md={7} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>

              {/* Education */}
              <Box sx={cardSx}>
                <Typography component="span" sx={labelSx}>EDUCATION</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
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

              {/* Work */}
              <Box sx={cardSx}>
                <Typography component="span" sx={labelSx}>WORK</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
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

        </Grid>

        {/* ?? ?꾩퐫?붿뼵 ?뱀뀡 援щ텇 ?? */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: { xs: 6, md: 8 }, mt: { xs: 2, md: 4 } }}>
          <Box sx={{ flex: 1, height: '1px', backgroundColor: 'rgba(224,224,224,0.08)' }} />
          <Typography
            sx={{
              color: 'rgba(224,224,224,0.25)',
              fontSize: '0.68rem',
              letterSpacing: 3,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            MORE ABOUT ME
          </Typography>
          <Box sx={{ flex: 1, height: '1px', backgroundColor: 'rgba(224,224,224,0.08)' }} />
        </Box>

        {/* ?? ?꾩퐫?붿뼵 ?뱀뀡 ?? */}
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
