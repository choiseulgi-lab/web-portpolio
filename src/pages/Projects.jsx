import { useEffect, useState } from 'react'
import { Box, Container, Typography, Grid, CircularProgress } from '@mui/material'
import { supabase } from '../lib/supabase'
import ProjectCard from '../components/ProjectCard'
import { useInView } from '../hooks/useInView'

/* Projects 페이지 */
export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [gridRef, gridInView] = useInView()

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order')
      if (data) setProjects(data)
      setLoading(false)
    }
    fetchProjects()
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        pt: { xs: 12, md: 14 },
        pb: { xs: 10, md: 14 },
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Container maxWidth="lg">
        {/* 페이지 헤더 */}
        <Box sx={{ mb: { xs: 6, md: 10 } }}>
          <Typography
            sx={{
              color: 'var(--color-text-primary)',
              fontWeight: 700,
              fontSize: { xs: '2.2rem', md: '3.75rem' },
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              mb: 2,
              animation: 'fadeInUp 0.6s ease 0.2s both',
            }}
          >
            Explore My Work
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'var(--color-text-muted)',
              animation: 'fadeInUp 0.6s ease 0.35s both',
            }}
          >
            사용자 관점에서 문제를 발견하고 해결한 프로젝트를 소개합니다.
          </Typography>
        </Box>

        {/* 로딩 */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <CircularProgress sx={{ color: 'var(--color-primary)' }} />
          </Box>
        )}

        {/* 카드 그리드 */}
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
                  transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
                }}
              >
                <ProjectCard project={project} />
              </Grid>
            ))}
            {projects.length === 0 && (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 12 }}>
                  <Typography sx={{ color: 'var(--color-text-muted)' }}>
                    등록된 프로젝트가 없습니다.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
