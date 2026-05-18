'use client';
import { useEffect, useRef } from 'react';
import PostCard from './PostCard';
import styles from '../app/page.module.css';

export default function HomeClient({ posts, latest }) {

  const canvasRef = useRef(null);

  // ── Breathing constellation pill animation ──
  useEffect(() => {
    const pill1 = document.getElementById('pill1');
    const pill2 = document.getElementById('pill2');
    const pill3 = document.getElementById('pill3');

    if (!pill1 || !pill2 || !pill3) return;

    // Create canvas overlay for the connecting lines
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
    `;

    const heroMark = pill1.parentElement;
    heroMark.style.position = 'relative';
    heroMark.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    let mouseX = 0.5, mouseY = 0.5;
    let time = 0;

    const PINK = '#FF3CAC';
    const MINT = '#4DFFD2';

    // Natural base offsets for each pill (relative to heroMark)
    let bases = null;
    let heroRect = null;

    const getBases = () => {
      pill1.style.transform = 'none';
      pill2.style.transform = 'none';
      pill3.style.transform = 'none';
      heroRect = heroMark.getBoundingClientRect();
      canvas.width  = heroRect.width;
      canvas.height = heroRect.height;
      bases = [pill1, pill2, pill3].map(p => {
        const r = p.getBoundingClientRect();
        return {
          x: r.left - heroRect.left + r.width  / 2,
          y: r.top  - heroRect.top  + r.height / 2,
          w: r.width,
          h: r.height,
        };
      });
    };

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const handleResize = () => { bases = null; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize',    handleResize);

    // Pill animation params — very subtle
    const params = [
      { ax: 18, ay: 14, px: 0,   py: 0,   spd: 0.55 },
      { ax: 14, ay: 18, px: 1.3, py: 0.9, spd: 0.40 },
      { ax: 20, ay: 12, px: 2.5, py: 1.8, spd: 0.65 },
    ];

    const pills = [pill1, pill2, pill3];

    let rafId;

    const animate = () => {
      if (!bases) getBases();
      if (!bases)  { rafId = requestAnimationFrame(animate); return; }

      time += 0.008;

      // Resize canvas if needed
      if (heroRect) {
        const nr = heroMark.getBoundingClientRect();
        if (nr.width !== heroRect.width || nr.height !== heroRect.height) {
          bases = null;
          rafId = requestAnimationFrame(animate);
          return;
        }
      }

      // Compute current positions
      const pts = params.map((p, i) => ({
        x: bases[i].x + Math.sin(time * p.spd + p.px) * p.ax + mouseX * 14,
        y: bases[i].y + Math.cos(time * p.spd * 0.75 + p.py) * p.ay + mouseY * 8,
      }));

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      const pairs = [[0,1],[1,2],[0,2]];
      pairs.forEach(([a, b]) => {
        const dx   = pts[a].x - pts[b].x;
        const dy   = pts[a].y - pts[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = Math.max(0, 0.28 - dist / 420);

        if (alpha <= 0) return;

        // Line
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = PINK;
        ctx.lineWidth   = 0.8;
        ctx.beginPath();
        ctx.moveTo(pts[a].x, pts[a].y);
        ctx.lineTo(pts[b].x, pts[b].y);
        ctx.stroke();

        // Midpoint mint dot
        const mx = (pts[a].x + pts[b].x) / 2;
        const my = (pts[a].y + pts[b].y) / 2;
        ctx.globalAlpha = alpha * 2.2;
        ctx.fillStyle   = MINT;
        ctx.beginPath();
        ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Apply transforms to actual pill elements
      pills.forEach((el, i) => {
        const dx = pts[i].x - bases[i].x;
        const dy = pts[i].y - bases[i].y;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize',    handleResize);
      cancelAnimationFrame(rafId);
      if (heroMark.contains(canvas)) heroMark.removeChild(canvas);
      pills.forEach(p => { p.style.transform = 'none'; });
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