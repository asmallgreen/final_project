import React from 'react'

export default function useParallax() {
  const parallax = useParallax({
    speed: -10,
  });
  return <div ref={parallax.ref} />;
}