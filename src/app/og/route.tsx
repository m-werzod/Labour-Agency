import { ImageResponse } from 'next/og';
import { siteConfig, licenseInfo } from '@/config/site';

export const runtime = 'nodejs';

const size = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #142b54 0%, #0b2545 60%, #081c37 100%)',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                border: '3px solid #ffffff',
                borderRightColor: '#34b886',
                borderTopColor: '#e08c42',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#fff', fontSize: 30, fontWeight: 800, letterSpacing: 1 }}>
              SPECIALIST <span style={{ color: '#34b886' }}>GROUP</span>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, letterSpacing: 4 }}>
              LICENSED WORKFORCE · UZBEKISTAN
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#fff', fontSize: 60, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
            Licensed Workforce Solutions from Uzbekistan to the World
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Badge text={`Government Licensed · No. ${licenseInfo.licenseNumber}`} />
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22 }}>{siteConfig.domain}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(52,184,134,0.15)',
        border: '1px solid rgba(52,184,134,0.4)',
        color: '#a7f3d0',
        padding: '10px 20px',
        borderRadius: 999,
        fontSize: 22,
        fontWeight: 600,
      }}
    >
      {text}
    </div>
  );
}
