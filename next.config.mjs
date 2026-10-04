// next.config.mjs

const isDev = process.env.NODE_ENV !== 'production'

/* =========================================================
   CONTENT SECURITY POLICY
   ---------------------------------------------------------
   Tells the browser which sources the site may load from.
   - scripts: own site only ('unsafe-inline' is required by Next.js
     without per-request nonces, which would make every page dynamic
     and slower on the Vercel free tier). vercel.live = Vercel's
     preview toolbar.
   - images: any https (blog posts, team, Cloudinary, Unsplash) + local previews
   - video: own site + Cloudinary (home background video)
   - connections: own API + EmailJS (contact form) + Vercel toolbar
   - frames: any https site (portfolio live-website previews)
   - nobody may put adEstra inside their own frame (clickjacking)
   ========================================================= */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://vercel.live${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https://res.cloudinary.com",
  "font-src 'self' data:",
  `connect-src 'self' https://api.emailjs.com https://vercel.live wss://ws-us3.pusher.com${isDev ? ' ws: http://localhost:*' : ''}`,
  "frame-src https:",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Old-browser version of frame-ancestors
  { key: 'X-Frame-Options', value: 'DENY' },
  // Don't let browsers guess file types (stops some upload tricks)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Send only the domain (not full URLs) to other sites
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // The site never needs these browser features
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  // Always use HTTPS for 2 years
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Don't advertise "X-Powered-By: Next.js"
  poweredByHeader: false,

  async headers() {
    return [
      {
        // Every page and file
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Keep admin pages out of search engines and never cache them
        source: '/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      {
        source: '/admin',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ]
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev());
