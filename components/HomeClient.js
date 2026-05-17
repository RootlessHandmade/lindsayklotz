'use client';
import { useEffect } from 'react';
import PostCard from './PostCard';
import styles from '../app/page.module.css';

export default function HomeClient({ posts, latest }) {

  // ── Cursor particle effect ──
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

    // Trail dot
    let trail = { x: W / 2, y: H / 2 };

    class Particle {
      constructor(x, y, type = 'trail') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];

        if (type === 'burst') {
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 6;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.r  = 4 + Math.random() * 6;
          this.life = 1;
          this.decay = 0.03 + Math.random() * 0.03;
        } else {
          this.vx = (Math.random() - 0.5) * 1.5;
          this.vy = (Math.random() - 0.5) * 1.5 - 0.5;
          this.r  = 2 + Math.random() * 3;
          this.life = 1;
          this.decay = 0.04 + Math.random() * 0.04;
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.type === 'burst') this.vy += 0.15; // gravity
        this.r *= 0.97;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Cursor ring
    let ring = { x: W/2, y: H/2, scale: 1, opacity: 0 };
    let ringPulse = 0;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      ring.opacity = 1;

      // Spawn trail particles
      if (Math.random() < 0.4) {
        particles.push(new Particle(
          mouse.x + (Math.random() - 0.5) * 8,
          mouse.y + (Math.random() - 0.5) * 8,
          'trail'
        ));
      }
    };

    const handleClick = (e) => {
      // Burst of particles on click
      for (let i = 0; i < 28; i++) {
        particles.push(new Particle(e.clientX, e.clientY, 'burst'));
      }
      ringPulse = 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    let rafId;
    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      // Smooth trail follow
      trail.x += (mouse.x - trail.x) * 0.15;
      trail.y += (mouse.y - trail.y) * 0.15;

      // Draw cursor ring
      if (ring.opacity > 0) {
        const pulse = ringPulse > 0 ? 1 + (1 - ringPulse) * 2 : 1;
        ctx.save();
        ctx.globalAlpha = ring.opacity * 0.6;
        ctx.strokeStyle = '#FF3CAC';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#FF3CAC';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, 14 * pulse, 0, Math.PI * 2);
        ctx.stroke();

        // Inner dot
        ctx.globalAlpha = ring.opacity * 0.9;
        ctx.fillStyle = '#FF3CAC';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ring.opacity *= 0.98;
        if (ringPulse > 0) ringPulse -= 0.06;
      }

      // Update + draw particles
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
      document.body.removeChild(canvas);
    };
  }, []);

  // ── Pill animation ──
  useEffect(() => {
    const pill1 = document.getElementById('pill1');
    const pill2 = document.getElementById('pill2');
    const pill3 = document.getElementById('pill3');

    if (!pill1 || !pill2 || !pill3) return;

    let mouseX = 0, mouseY = 0;
    let time = 0;

    const BOUNCE   = 0.7;
    const FRICTION = 0.88;
    const SPRING   = 0.07;

    const pills = [
      { el: pill1, x: 0, y: 0, vx: 0, vy: 0, w: 180, h: 52 },
      { el: pill2, x: 0, y: 0, vx: 0, vy: 0, w: 116, h: 52 },
      { el: pill3, x: 0, y: 0, vx: 0, vy: 0, w: 150, h: 52 },
    ];

    let bases = null;

    const getBases = () => {
      pills.forEach(p => { p.el.style.transform = 'none'; });
      bases = pills.map(p => {
        const r = p.el.getBoundingClientRect();
        return { left: r.left, top: r.top };
      });
    };

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!bases) getBases();

      time += 0.012;

      const targets = [
        {
          x: mouseX * 60 + Math.sin(time * 1.1) * 30,
          y: mouseY * 20 + Math.sin(time * 1.1) * 40,
        },
        {
          x: mouseX * -50 + Math.sin(time * 0.8 + 1) * 25,
          y: mouseY * 25 + Math.sin(time * 0.8 + 1) * 35,
        },
        {
          x: mouseX * 70 + Math.sin(time * 1.3 + 2) * 35,
          y: mouseY * -15 + Math.sin(time * 1.3 + 2) * 45,
        },
      ];

      pills.forEach((p, i) => {
        p.vx += (targets[i].x - p.x) * SPRING;
        p.vy += (targets[i].y - p.y) * SPRING;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x  += p.vx;
        p.y  += p.vy;
      });

      for (let iter = 0; iter < 3; iter++) {
        for (let i = 0; i < pills.length; i++) {
          for (let j = i + 1; j < pills.length; j++) {
            const a = pills[i];
            const b = pills[j];

            const aLeft  = bases[i].left + a.x;
            const aTop   = bases[i].top  + a.y;
            const aRight = aLeft + a.w;
            const aBot   = aTop  + a.h;

            const bLeft  = bases[j].left + b.x;
            const bTop   = bases[j].top  + b.y;
            const bRight = bLeft + b.w;
            const bBot   = bTop  + b.h;

            const overlapX = Math.min(aRight, bRight) - Math.max(aLeft, bLeft);
            const overlapY = Math.min(aBot,   bBot)   - Math.max(aTop,  bTop);

            if (overlapX > 0 && overlapY > 0) {
              if (overlapX <= overlapY) {
                const push = overlapX / 2;
                const dir  = aLeft < bLeft ? -1 : 1;
                a.x += dir * push;
                b.x -= dir * push;
                const avgVx = (a.vx + b.vx) / 2;
                a.vx = avgVx * -BOUNCE;
                b.vx = avgVx *  BOUNCE;
              } else {
                const push = overlapY / 2;
                const dir  = aTop < bTop ? -1 : 1;
                a.y += dir * push;
                b.y -= dir * push;
                const avgVy = (a.vy + b.vy) / 2;
                a.vy = avgVy * -BOUNCE;
                b.vy = avgVy *  BOUNCE;
              }
            }
          }
        }
      }

      pills.forEach((p, i) => {
        const tilt = mouseX * [12, -10, 14][i];
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotateY(${tilt}deg)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    let rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {latest && (
        <a href={`/blog/${latest.slug}`} className={styles.ticker}>
          <span className={styles.tickerDot} />
          <span className={styles.tickerText}>
            NEW POST — {latest.title.toUpperCase()}
          </span>
          <span className={styles.tickerCta}>Read now →</span>
        </a>
      )}

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroTags}>
            <span className="tag tag-pink">Design</span>
            <span className="tag tag-dark">Learning</span>
            <span className="tag tag-ghost">Innovation</span>
          </div>

          <h1 className={styles.heroHeadline}>
            DESIGN.<br />
            <span className={styles.pink}>LEARN.</span><br />
            <span className={styles.outline}>CREATE.</span>
          </h1>

          <p className={styles.heroSub}>
            Hi, I&apos;m Lindsay — a graphic designer and lifelong learner writing about the intersection of visual design, creative learning, AI, and human-centered innovation.
          </p>

          <div className={styles.heroCtas}>
            <a href="/blog" className="btn-primary">READ THE BLOG</a>
            <a href="/about" className="btn-outline">ABOUT ME</a>
          </div>
        </div>

        <div className={styles.heroMark} aria-hidden="true">
          <div id="pill1" className={styles.pillLg} style={{ background: 'var(--pink)', width: 180 }}>DESIGN</div>
          <div id="pill2" className={styles.pillLg} style={{ background: 'var(--mint)', color: 'var(--ink)', width: 116, marginLeft: 24 }}>LEARN</div>
          <div id="pill3" className={styles.pillLg} style={{ background: 'var(--ink)', width: 150, marginLeft: 10 }}>CREATE</div>
        </div>
      </section>

      <div className={styles.topicStrip}>
        <span className={styles.topicLabel}>Explore →</span>
        {['Design', 'Learning', 'Innovation', 'Compliance', 'Training', 'AI'].map((t) => (
          <a key={t} href={`/blog?tag=${t.toLowerCase()}`} className={styles.topicTag}>{t}</a>
        ))}
      </div>

      {posts.length > 0 && (
        <main className={styles.main}>
          <h2 className={styles.sectionTitle}>Latest posts</h2>
          <div className={styles.grid}>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </main>
      )}
    </>
  );
}