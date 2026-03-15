import { useEffect, useRef, useState } from 'react';

/**
 * Water Circle Background Component
 * Creates animated water ripple effect with cursor effects and twinkling stars
 * Design: Cyberpunk Minimalism with interactive effects
 */

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  maxOpacity: number;
}

export default function WaterCircleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  // Handle mouse and touch movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsMouseMoving(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        mousePos.current = { x: touch.clientX, y: touch.clientY };
        setIsMouseMoving(true);
      }
    };

    const handleTouchEnd = () => {
      setIsMouseMoving(false);
    };

    const handleMouseLeave = () => {
      setIsMouseMoving(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    const ripples: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
    }> = [];

    // Initialize stars
    const stars: Star[] = [];
    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        maxOpacity: Math.random() * 0.6 + 0.3,
      });
    }

    // Create ripples at intervals
    const createRipple = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ripples.push({
        x: centerX,
        y: centerY,
        radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height) * 1.5,
        opacity: 0.8,
      });
    };

    // Create initial ripples
    createRipple();
    const rippleInterval = setInterval(createRipple, 1500);

    // Animation loop
    const animate = () => {
      // Clear canvas with dark background
      ctx.fillStyle = 'rgba(15, 20, 25, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid background
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 50;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw twinkling stars
      stars.forEach((star) => {
        star.opacity += (Math.random() - 0.5) * star.twinkleSpeed;
        star.opacity = Math.max(0, Math.min(star.maxOpacity, star.opacity));

        // Draw star glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3);
        gradient.addColorStop(0, `rgba(57, 255, 20, ${star.opacity})`);
        gradient.addColorStop(1, `rgba(57, 255, 20, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw star core
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Calculate distance from center to cursor for parallax effect
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      let cursorDistance = 0;
      let cursorAngle = 0;

      if (isMouseMoving) {
        const dx = mousePos.current.x - centerX;
        const dy = mousePos.current.y - centerY;
        cursorDistance = Math.sqrt(dx * dx + dy * dy);
        cursorAngle = Math.atan2(dy, dx);

        // Draw cursor effect - expanding circle
        const maxCursorRadius = 150;
        const cursorOpacity = Math.max(0, 1 - cursorDistance / (canvas.width * 0.5));

        ctx.strokeStyle = `rgba(255, 0, 110, ${cursorOpacity * 0.4})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mousePos.current.x, mousePos.current.y, maxCursorRadius * cursorOpacity, 0, Math.PI * 2);
        ctx.stroke();

        // Draw cursor glow
        const glowGradient = ctx.createRadialGradient(
          mousePos.current.x,
          mousePos.current.y,
          0,
          mousePos.current.x,
          mousePos.current.y,
          maxCursorRadius
        );
        glowGradient.addColorStop(0, `rgba(255, 0, 110, ${cursorOpacity * 0.2})`);
        glowGradient.addColorStop(1, `rgba(255, 0, 110, 0)`);

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mousePos.current.x, mousePos.current.y, maxCursorRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw cursor crosshair
        const crosshairSize = 30;
        ctx.strokeStyle = `rgba(0, 217, 255, ${cursorOpacity * 0.6})`;
        ctx.lineWidth = 1;

        // Horizontal line
        ctx.beginPath();
        ctx.moveTo(mousePos.current.x - crosshairSize, mousePos.current.y);
        ctx.lineTo(mousePos.current.x + crosshairSize, mousePos.current.y);
        ctx.stroke();

        // Vertical line
        ctx.beginPath();
        ctx.moveTo(mousePos.current.x, mousePos.current.y - crosshairSize);
        ctx.lineTo(mousePos.current.x, mousePos.current.y + crosshairSize);
        ctx.stroke();
      }

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += 2;
        ripple.opacity = Math.max(0, 1 - ripple.radius / ripple.maxRadius);

        if (ripple.opacity > 0) {
          // Draw ripple circle
          ctx.strokeStyle = `rgba(0, 217, 255, ${ripple.opacity * 0.6})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.stroke();

          // Draw filled circle with gradient
          const innerRadius = Math.max(0, ripple.radius - 10);
          const outerRadius = ripple.radius + 10;

          const gradient = ctx.createRadialGradient(
            ripple.x,
            ripple.y,
            innerRadius,
            ripple.x,
            ripple.y,
            outerRadius
          );
          gradient.addColorStop(0, `rgba(0, 217, 255, ${ripple.opacity * 0.3})`);
          gradient.addColorStop(1, `rgba(0, 217, 255, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ripples.splice(i, 1);
        }
      }

      // Draw center point
      ctx.fillStyle = 'rgba(0, 217, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearInterval(rippleInterval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMouseMoving]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        display: 'block',
      }}
    />
  );
}
