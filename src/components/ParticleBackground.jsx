import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];

    const createParticle = () => {
      const particle = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 5 + 2,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: `hsl(${Math.random() * 360}, 100%, 70%)` // Random gradient color using HSL
      };
      particles.push(particle);
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Use a gradient color for each particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0, particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Fades to transparent at the edge

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Remove particles that are out of bounds and add new ones
        if (particle.x < 0 || particle.x > window.innerWidth || particle.y < 0 || particle.y > window.innerHeight) {
          particles.splice(index, 1);
          createParticle(); // Add a new particle when one goes out of bounds
        }
      });

      requestAnimationFrame(animateParticles);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initially add particles
    for (let i = 0; i < 150; i++) {
      createParticle();
    }

    // Start animating particles
    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default ParticleBackground;

