import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Pavlo Bondarenko - Full-Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation is reusing the same as OpenGraph for consistency
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
          Pavlo Bondarenko
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
          Full-Stack Developer & Tech Enthusiast
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 