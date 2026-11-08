/**
 * Pure Code Generator for Gradient Export
 * Phase 5 Compliance: Pure string synthesis, zero DOM mutations.
 */

import { ShaderParams } from '../shader/shaderEngine';

export function generateStandardCss(params: ShaderParams): string {
  return `/* Grainient CSS Preset */
background-color: ${params.color1};
background-image: 
  radial-gradient(at 20% 30%, ${params.color2} 0px, transparent 50%),
  radial-gradient(at 80% 20%, ${params.color3} 0px, transparent 50%),
  radial-gradient(at 50% 80%, ${params.color1} 0px, transparent 50%),
  radial-gradient(at 80% 80%, ${params.color4} 0px, transparent 50%);
background-size: 100% 100%;`;
}

export function generateTailwindClasses(params: ShaderParams): string {
  return `bg-[${params.color1}] bg-[radial-gradient(at_20%_30%,${params.color2}_0px,transparent_50%),radial-gradient(at_80%_20%,${params.color3}_0px,transparent_50%),radial-gradient(at_80%_80%,${params.color4}_0px,transparent_50%)]`;
}

export function generateSvgNoiseFilter(grainIntensity = 25): string {
  const freq = (0.65 + (grainIntensity / 100) * 0.35).toFixed(3);
  return `<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
  <filter id='grainient-noise'>
    <feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='3' stitchTiles='stitch'/>
    <feColorMatrix type='saturate' values='0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#grainient-noise)' opacity='0.35'/>
</svg>`;
}

export function generateReactSnippet(title: string, params: ShaderParams): string {
  return `import React from 'react';

export const ${title.replace(/[^a-zA-Z0-9]/g, '')}Gradient: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div 
      className={\`w-full h-full relative overflow-hidden \${className}\`}
      style={{
        backgroundColor: '${params.color1}',
        backgroundImage: \`
          radial-gradient(at 20% 30%, ${params.color2} 0px, transparent 50%),
          radial-gradient(at 80% 20%, ${params.color3} 0px, transparent 50%),
          radial-gradient(at 80% 80%, ${params.color4} 0px, transparent 50%)
        \`
      }}
    >
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: "url(\\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\\")"
        }}
      />
    </div>
  );
};`;
}
