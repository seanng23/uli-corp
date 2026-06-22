import { ImageResponse } from 'next/og'

export const alt = 'United U-LI Corporation Berhad — Engineering Tomorrow\'s Infrastructure'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F0EAD6',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 16, color: '#FF8905', marginBottom: 24, letterSpacing: 3 }}>
          UNITED U-LI CORPORATION BERHAD
        </div>
        <div style={{ fontSize: 64, color: '#000000', fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Engineering Tomorrow&apos;s Infrastructure
        </div>
        <div style={{ fontSize: 20, color: '#1C1A17', marginTop: 32, maxWidth: 900 }}>
          Over 40 years delivering certified cable support solutions across ASEAN.
        </div>
      </div>
    ),
    size
  )
}
