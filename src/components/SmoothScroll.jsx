// components/SmoothScroll.jsx
'use client';

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        // Higher duration = much slower, longer deceleration (2.4s gives a heavy agency feel)
        duration: 2.4,
        
        // Slower easing curve for a gradual, effortless slowdown
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
        
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        
        // Lower multiplier = slower speed per scroll notch
        wheelMultiplier: 0.75, 
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}