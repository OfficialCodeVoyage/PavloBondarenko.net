import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Pavlo Bondarenko Blog - Web Development Insights';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: '#111',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            marginBottom: 40,
            color: 'white',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}
        >
          Blog & Insights
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 'normal',
            color: '#f0f0f0',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}
        >
          Web Development Articles by Pavlo Bondarenko
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 