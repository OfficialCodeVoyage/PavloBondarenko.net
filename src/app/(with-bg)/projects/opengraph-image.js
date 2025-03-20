import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Projects by Pavlo Bondarenko - Work Portfolio';
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
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
          color: '#111',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            marginBottom: 40,
            color: '#111',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}
        >
          My Projects
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 'normal',
            color: '#333',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}
        >
          Pavlo Bondarenko - Portfolio Showcase
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 