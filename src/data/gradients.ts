/**
 * Curated Dataset of Grainient Gradients & Background Assets
 */

export interface GradientItem {
  id: string;
  name: string;
  category: 'noisy-grainy' | 'smooth-blend' | 'animated' | 'ai-generated';
  colors: string[];
  tags: string[];
  isPro: boolean;
  css: string;
  imageUrl?: string;
  description: string;
}

export const CATEGORIES = [
  { id: 'all', name: 'All Assets', count: '1,499+' },
  { id: 'noisy-grainy', name: 'Noisy / Grainy', count: '387' },
  { id: 'smooth-blend', name: 'Smooth Blend', count: '466' },
  { id: 'animated', name: 'Abstract Animated', count: '90' },
  { id: 'ai-generated', name: 'AI Generated', count: '556' },
] as const;

export const GRADIENTS_DATA: GradientItem[] = [
  {
    id: 'grain-01',
    name: 'Electric Lime Pulse',
    category: 'noisy-grainy',
    colors: ['#09090b', '#c2f13c', '#15803d', '#1e293b'],
    tags: ['Neon', 'Dark', 'Cyberpunk', 'Green'],
    isPro: false,
    css: 'radial-gradient(circle at 20% 20%, #c2f13c 0%, transparent 45%), radial-gradient(circle at 80% 80%, #15803d 0%, #09090b 70%)',
    imageUrl: 'https://framerusercontent.com/images/96xoOFnQP5CtwpeROZ7uf8vwi6k.png',
    description: 'Grainient signature electric lime neon blend with high-density film grain.'
  },
  {
    id: 'grain-02',
    name: 'Obsidian Velvet',
    category: 'noisy-grainy',
    colors: ['#030712', '#312e81', '#4c1d95', '#0f172a'],
    tags: ['Dark', 'Deep Space', 'Purple', 'Minimal'],
    isPro: false,
    css: 'radial-gradient(circle at 50% 30%, #4c1d95 0%, transparent 60%), radial-gradient(circle at 80% 90%, #312e81 0%, #030712 80%)',
    imageUrl: 'https://framerusercontent.com/images/eiodnGRlaG2am17MfvyHwgFU.png',
    description: 'Deep nocturnal violet with cinematic analog noise texture.'
  },
  {
    id: 'grain-03',
    name: 'Solar Eclipse Flaring',
    category: 'noisy-grainy',
    colors: ['#450a0a', '#dc2626', '#f97316', '#fbbf24'],
    tags: ['Sunset', 'Warm', 'Solar', 'Orange'],
    isPro: true,
    css: 'linear-gradient(135deg, #450a0a 0%, #dc2626 40%, #f97316 70%, #fbbf24 100%)',
    imageUrl: 'https://framerusercontent.com/images/8wbgJBwgz7qeHDUgK98K4BgdgI.png',
    description: 'Intense atmospheric heat wave with radiant chromatic noise.'
  },
  {
    id: 'grain-04',
    name: 'Nordic Aurora Borealis',
    category: 'smooth-blend',
    colors: ['#064e3b', '#0d9488', '#06b6d4', '#3b82f6'],
    tags: ['Aurora', 'Smooth', 'Teal', 'Cool'],
    isPro: false,
    css: 'linear-gradient(160deg, #064e3b 0%, #0d9488 35%, #06b6d4 70%, #3b82f6 100%)',
    imageUrl: 'https://framerusercontent.com/images/XEeRMSfHWtwUPfzKtM3BV6YKgxY.png',
    description: 'Silky polar atmosphere with multi-spectral cyan and ocean blue blend.'
  },
  {
    id: 'grain-05',
    name: 'Cyber Horizon 2099',
    category: 'smooth-blend',
    colors: ['#1e1b4b', '#701a75', '#db2777', '#f43f5e'],
    tags: ['Cyberpunk', 'Neon', 'Pink', 'Vibrant'],
    isPro: true,
    css: 'linear-gradient(120deg, #1e1b4b 0%, #701a75 40%, #db2777 75%, #f43f5e 100%)',
    imageUrl: 'https://framerusercontent.com/images/I7hqpfLhcTmXNxojuSIBiuioC14.png',
    description: 'Dystopian synthwave sunrise engineered for high-converting hero sections.'
  },
  {
    id: 'grain-06',
    name: 'Liquid Hologram Prismatic',
    category: 'smooth-blend',
    colors: ['#fce7f3', '#e0e7ff', '#cffafe', '#fef3c7'],
    tags: ['Pastel', 'Holographic', 'Light', 'Minimal'],
    isPro: false,
    css: 'radial-gradient(circle at 30% 20%, #fce7f3 0%, #e0e7ff 40%, #cffafe 70%, #fef3c7 100%)',
    imageUrl: 'https://framerusercontent.com/images/ISpYlREjEehXiDgjZ9G4Ds9Fog.png',
    description: 'Iridescent pearl sheen with gentle refractive light dispersion.'
  },
  {
    id: 'grain-07',
    name: 'Quantum Kinetic Warp',
    category: 'animated',
    colors: ['#020617', '#1e293b', '#38bdf8', '#818cf8'],
    tags: ['Animated', 'Shader', 'Interactive', 'Blue'],
    isPro: true,
    css: 'radial-gradient(at 20% 30%, #38bdf8 0px, transparent 50%), radial-gradient(at 80% 80%, #818cf8 0px, #020617 70%)',
    imageUrl: 'https://framerusercontent.com/images/MEOemsBjJBdoRPmg1LaE6XalTs.png',
    description: 'Real-time procedural WebGL warp canvas with harmonic wave distortion.'
  },
  {
    id: 'grain-08',
    name: 'Hyper-Vortex Emerald',
    category: 'animated',
    colors: ['#022c22', '#059669', '#34d399', '#c2f13c'],
    tags: ['Animated', 'Green', 'Emerald', 'Pulse'],
    isPro: true,
    css: 'radial-gradient(at 70% 30%, #c2f13c 0px, transparent 50%), radial-gradient(at 30% 70%, #059669 0px, #022c22 80%)',
    imageUrl: 'https://framerusercontent.com/images/FvNBhjTGZBTiW47XaRNoSughwM.png',
    description: 'High-speed looping particle vortex with glowing emerald filaments.'
  },
  {
    id: 'grain-09',
    name: 'Neural Synthesis Nebula',
    category: 'ai-generated',
    colors: ['#0f172a', '#6366f1', '#a855f7', '#ec4899'],
    tags: ['AI Generated', 'Abstract', 'Nebula', 'Purple'],
    isPro: false,
    css: 'linear-gradient(45deg, #0f172a 0%, #6366f1 35%, #a855f7 65%, #ec4899 100%)',
    imageUrl: 'https://framerusercontent.com/images/r6k4GwBdPATNys7nN2ssdREJA.png',
    description: 'Generative cosmic cloud synthesized with diffusion algorithms at 8K resolution.'
  },
  {
    id: 'grain-10',
    name: 'Chromium Molten Metal',
    category: 'ai-generated',
    colors: ['#18181b', '#71717a', '#d4d4d8', '#ffffff'],
    tags: ['Metallic', 'Monochrome', 'AI Generated', 'Sleek'],
    isPro: true,
    css: 'linear-gradient(135deg, #18181b 0%, #71717a 30%, #ffffff 50%, #71717a 70%, #18181b 100%)',
    imageUrl: 'https://framerusercontent.com/images/kFrJOnxd307CfKL2aOYI7khpbE.png',
    description: 'Reflective liquid mercury surface with high-contrast specular highlights.'
  },
  {
    id: 'grain-11',
    name: 'Pastel Dream Mirage',
    category: 'smooth-blend',
    colors: ['#fed7aa', '#fbcfe8', '#ddd6fe', '#bae6fd'],
    tags: ['Pastel', 'Warm', 'Soft', 'Dreamy'],
    isPro: false,
    css: 'linear-gradient(115deg, #fed7aa 0%, #fbcfe8 35%, #ddd6fe 70%, #bae6fd 100%)',
    imageUrl: 'https://framerusercontent.com/images/MAQNsN9778GwXX5cAy1ZmGHFOk.png',
    description: 'Ultra-soft peach and lavender cloud gradient for friendly modern web interfaces.'
  },
  {
    id: 'grain-12',
    name: 'Dark Matter Singularity',
    category: 'noisy-grainy',
    colors: ['#000000', '#18181b', '#27272a', '#3f3f46'],
    tags: ['Dark', 'Monochrome', 'Minimal', 'Stealth'],
    isPro: false,
    css: 'radial-gradient(circle at center, #27272a 0%, #18181b 45%, #000000 100%)',
    imageUrl: 'https://framerusercontent.com/images/XZ0xJYCYnNOUIowAe1k3VFPU.png',
    description: 'Pure stealth aesthetics with matte carbon textures and subtle film decay.'
  }
];

