'use client';
import { useEffect } from 'react';

export default function CursorEffect() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const COLORS = ['#FF3CAC', '#4DFFD2', '#0D0D0D'];
    let mouse = { x: W / 2, y: H / 2 };
    let particles = [];
    let trail = { x: W / 2, y: H / 2 };
    let ringPulse = 0;
    let clickX = W / 2;
    let clickY = H / 2;

    class Particle {
      constructor(x, y, type = 'trail') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];

        if (type === 'burst') {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1 + Math.random() * 3;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.r  = 2 + Math.random() * 2;
          this.life = 0.8;
          this.decay = 0.02 + Math.random() * 0.02;
        } else {
          this.vx = (Math.random() - 0.5) * 1.5;
          this.vy = (Math.random() - 0.5) * 1.5 - 0.5;
          this.r  = 1 + Math.random() * 3;
          this.life = 0.7;
          this.decay = 0.05 + Math.random() * 0.04;
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.type === 'burst') this.vy += 0.08;
        this.r *= 0.97;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (Math.random() < 0.2) {
        particles.push(new Particle(
          mouse.x + (Math.random() - 0.5) * 8,
          mouse.y + (Math.random() - 0.5) * 8,
          'trail'
        ));
      }
    };

    const handleClick = (e) => {
      clickX = e.clientX;
      clickY = e.clientY;
      for (let i = 0; i < 7; i++) {
        particles.push(new Particle(e.clientX, e.clientY, 'burst'));
      }
      ringPulse = 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    let rafId;
    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      trail.x += (mouse.x - trail.x) * 0.15;
      trail.y += (mouse.y - trail.y) * 0.15;

      if (ringPulse > 0) {
        const progress = 1 - ringPulse;
        const radius = 10 + progress * 40;
        const alpha = ringPulse * 0.5;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#FF3CAC';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#FF3CAC';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(clickX, clickY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        ringPulse -= 0.025;
      }

      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => { p.update(); p.draw(); });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      if (document.body.contains(canvas)) document.body.removeChild(canvas);
    };
  }, []);

  return null;
}