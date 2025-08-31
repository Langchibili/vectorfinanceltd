'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Skeleton from '@mui/material/Skeleton'
import { ArrowBackIosNew } from '@mui/icons-material'

/**
 * PageSkeleton
 *
 * Props:
 * - title: string
 * - subtitle: string (optional)
 * - breadcrumb: [{ label, href }] (optional)
 * - actions: [{ label, onClick, variant='contained'|'outlined', color='primary', startIcon }] (optional)
 * - loading: boolean (shows skeletons)
 * - rightNode: React node to display at header right
 * - showBack: boolean (show back icon)
 * - onBack: function
 * - maxWidth: number | string (defaults to 1200)
 * - padding: number | string (defaults to 3)
 * - footer: React node (optional)
 * - children: page content
 */
export default function PageSkeleton({
  title = '',
  subtitle = '',
  breadcrumb = null,
  actions = [],
  loading = false,
  rightNode = null,
  showBack = false,
  onBack = null,
  maxWidth = 1200,
  padding = 3,
  footer = null,
  children
}) {
  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      <Container maxWidth={false} sx={{ maxWidth, px: { xs: 2, sm: 3 }, mt: 3 }}>
        {/* Header */}
        <Paper elevation={0} sx={{ mb: 3, p: { xs: 2, sm: 3 }, bgcolor: 'transparent' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Back + Breadcrumbs */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {showBack && (
                  <IconButton aria-label="back" onClick={onBack} size="small" sx={{ mr: 0.5 }}>
                    <ArrowBackIosNew fontSize="small" />
                  </IconButton>
                )}

                {loading ? (
                  <Skeleton variant="text" width={220} height={28} />
                ) : (
                  breadcrumb && breadcrumb.length > 0 && (
                    <Breadcrumbs aria-label="breadcrumb" sx={{ display: { xs: 'none', sm: 'block' } }}>
                      {breadcrumb.map((b, i) => (
                        b.href ? (
                          <Link key={i} underline="hover" color="inherit" href={b.href}>{b.label}</Link>
                        ) : (
                          <Typography key={i} color="text.primary">{b.label}</Typography>
                        )
                      ))}
                    </Breadcrumbs>
                  )
                )}
              </Box>

              {/* Title / Subtitle */}
              <Box sx={{ mt: 1 }}>
                {loading ? (
                  <>
                    <Skeleton variant="text" width={260} height={36} />
                    <Skeleton variant="text" width={160} height={20} />
                  </>
                ) : (
                  <>
                    {title && <Typography variant="h5" sx={{ fontWeight: 700 }}>{title}</Typography>}
                    {subtitle && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{subtitle}</Typography>}
                  </>
                )}
              </Box>

              {/* Actions (mobile-friendly) */}
              <Box sx={{ mt: 2 }}>
                {loading ? (
                  <Stack direction="row" spacing={1}>
                    <Skeleton variant="rectangular" width={100} height={36} />
                    <Skeleton variant="rectangular" width={100} height={36} />
                  </Stack>
                ) : (
                  actions && actions.length > 0 && (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                      {actions.map((a, i) => (
                        <Button
                          key={i}
                          variant={a.variant || 'contained'}
                          color={a.color || 'primary'}
                          onClick={a.onClick}
                          startIcon={a.startIcon || null}
                          size={a.size || 'medium'}
                          sx={{ textTransform: 'none' }}
                        >
                          {a.label}
                        </Button>
                      ))}
                    </Stack>
                  )
                )}
              </Box>
            </Box>

            {/* right node (stats / contact card / quick actions) */}
            <Box sx={{ ml: 'auto', pl: 2, display: 'flex', alignItems: 'flex-start', mt: { xs: 2, sm: 0 } }}>
              {loading ? (
                <Box>
                  <Skeleton variant="rectangular" width={140} height={56} />
                </Box>
              ) : (
                rightNode
              )}
            </Box>
          </Box>
        </Paper>

        {/* Main content container */}
        <Paper elevation={1} sx={{ p: padding }}>
          {loading ? (
            <>
              <Skeleton variant="rectangular" width="100%" height={28} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 1 }} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1 }}>
                <Skeleton variant="rectangular" width={{ xs: '100%', sm: '60%' }} height={120} />
                <Skeleton variant="rectangular" width={{ xs: '100%', sm: '40%' }} height={120} />
              </Stack>
            </>
          ) : (
            children
          )}
        </Paper>

        {/* optional footer under content */}
        {footer && (
          <Box sx={{ mt: 2 }}>
            {footer}
          </Box>
        )}
      </Container>
    </Box>
  )
}