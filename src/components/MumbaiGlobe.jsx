import React, { useRef, useEffect, useMemo } from 'react';
import Globe from 'react-globe.gl';

// Generates a custom procedural city-grid / abstract latitude-longitude texture
// so the sphere is 100% visible on a pure white background without country textures!
function generateGridTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base soft porcelain fill
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw crisp, modern architectural grid & coordinate lines (representing the city grid)
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.5;

  // Horizontal Grid Lines
  for (let y = 0; y < canvas.height; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Vertical Grid Lines
  for (let x = 0; x < canvas.width; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Accent city nodal lines in soft slate
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2.5;
  for (let x = 0; x < canvas.width; x += 128) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  return canvas.toDataURL();
}

export default function MumbaiGlobe() {
  const globeEl = useRef();

  // Memoize texture generation so it runs instantly with zero network delay
  const gridTextureUrl = useMemo(() => generateGridTexture(), []);

  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableZoom = true;
        controls.enableRotate = true;
      }

      // Center perspective tightly over Mumbai coordinates
      globeEl.current.pointOfView({ lat: 19.0760, lng: 72.8777, altitude: 1.5 }, 1000);
    }
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#ffffff', overflow: 'hidden' }} className="cursor-grab active:cursor-grabbing">
      <Globe
        ref={globeEl}
        backgroundColor="#ffffff"
        
        // Procedural Grid Texture (No Countries, Pure Custom City Grid Aesthetic)
        globeImageUrl={gridTextureUrl}
        
        // Soft atmospheric rim glow so the 3D sphere pops off the white background
        atmosphereColor="#93c5fd"
        atmosphereAltitude={0.18}
      />
    </div>
  );
}