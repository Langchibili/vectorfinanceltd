'use client'
import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import { getImage } from '@/Functions'
import { backEndUrl } from '@/Constants'
import { Slide } from '@material-ui/core'

export default class CollateralCarousel extends React.Component {
  state = { index: 0 }

  next = () => {
    const { media } = this.props
    if (!media || media.length === 0) return
    this.setState(({ index }) => ({ index: (index + 1) % media.length }))
  }

  prev = () => {
    const { media } = this.props
    if (!media || media.length === 0) return
    this.setState(({ index }) => ({ index: (index - 1 + media.length) % media.length }))
  }

  goTo = i => {
    this.setState({ index: i })
  }

  renderMainImage(src) {
    return (
      <Box sx={{ width: '100%', height: { xs: 220, sm: 360 }, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f7f7f7', borderRadius: 2, overflow: 'hidden' }}>
        <img src={src} alt="collateral" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </Box>
    )
  }

  render() {
    const { media = [] } = this.props
    const { index } = this.state
    const current = media[index]
    let mainSrc = '/no-cover-photo.jpg'
    if (current && current.attributes) {
      const attr = current.attributes
      if (attr.formats && attr.formats.medium && attr.formats.medium.url) {
        mainSrc = backEndUrl + attr.formats.medium.url
      } else if (attr.url) {
        mainSrc = backEndUrl + attr.url
      }
    }

    return (
      <Box>
        <Box sx={{ position: 'relative' }}>
          {this.renderMainImage(mainSrc)}

          <IconButton
            onClick={this.prev}
            sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.8)' }}
            size="small"
          >
            <ArrowBackIos />
          </IconButton>

          <IconButton
            onClick={this.next}
            sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.8)' }}
            size="small"
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mt: 1, overflowX: 'auto', py: 1 }}>
          {media.map((m, i) => {
            const attr = m.attributes || {}
            const thumb = attr.formats?.thumbnail?.url ? backEndUrl + attr.formats.thumbnail.url : (attr.url ? backEndUrl + attr.url : '/no-cover-photo.jpg')
            return (
              <Box
                key={m.id || i}
                onClick={() => this.goTo(i)}
                sx={{
                  borderRadius: 1,
                  overflow: 'hidden',
                  border: i === index ? '2px solid #1976d2' : '1px solid rgba(0,0,0,0.08)',
                  width: 64,
                  height: 64,
                  flex: '0 0 auto',
                  cursor: 'pointer'
                }}
              ><Slide in={true} direction="left">
                <img src={thumb} alt={'thumb-' + i} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Slide>
              </Box>
            )
          })}
        </Stack>
      </Box>
    )
  }
}