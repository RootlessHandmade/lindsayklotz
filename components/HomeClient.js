'use client';
import { useEffect } from 'react';
import PostCard from './PostCard';
import styles from '../app/page.module.css';

export default function HomeClient({ posts, latest }) {

  useEffect(() => {
    const pill1 = document.getElementById('pill1');
    const pill2 = document.getElementById('pill2');
    const pill3 = document.getElementById('pill3');

    if (!pill1 || !pill2 || !pill3) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
    `;

    [pill1, pill2, pill3].forEach(p => { p.style.position = 'relative'; p.style.zIndex = '1'; });

    const heroMark = pill1.parentElement;
    heroMark.style.position = 'relative';
    heroMark.insertBefore(canvas, heroMark.firstChild);

    const ctx = canvas.getContext('2d');

    const PINK = '#FF3CAC';
    const MINT = '#4DFFD2';

    let mouseX = 0, mouseY = 0;
    let time = 0;
    let bases = null;
    let heroRect = null;

    // Wide triangle — lots of distance between pills
    const TRIANGLE = [
      { tx:  20, ty: -200 },
      { tx:  80, ty:    0 },
      { tx:  20, ty:  200 },
    ];

    const params = [
      { ax: 14, ay: 10, px: 0,   py: 0,   spd: 0.5  },
      { ax: 10, ay: 14, px: 1.4, py: 1.0, spd: 0.38 },
      { ax: 12, ay: 10, px: 2.6, py: 1.9, spd: 0.58 },
    ];

    const pills = [pill1, pill2, pill3];
    const pillSizes = [
      { w: 180, h: 52 },
      { w: 116, h: 52 },
      { w: 150, h: 52 },
    ];

    const getBases = () => {
      pills.forEach(p => { p.style.transform = 'none'; });
      heroRect = heroMark.getBoundingClientRect();
      canvas.width  = heroRect.width;
      canvas.height = heroRect.height;
      const cx = heroRect.width  / 2;
      const cy = heroRect.height / 2;
      bases = TRIANGLE.map((t) => ({ x: cx + t.tx, y: cy + t.ty }));
    };

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const handleResize = () => { bases = null; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize',    handleResize);

    let rafId;

    const animate = () => {
      if (!bases) getBases();
      if (!bases) { rafId = requestAnimationFrame(animate); return; }

      time += 0.007;

      const raw = params.map((p, i) => ({
        x: bases[i].x + Math.sin(time * p.spd + p.px) * p.ax + mouseX * 10,
        y: bases[i].y + Math.cos(time * p.spd * 0.75 + p.py) * p.ay + mouseY * 6,
      }));

      // Collision separation
      const pts = raw.map(p => ({ ...p }));
      for (let iter = 0; iter < 4; iter++) {
        for (let i = 0; i < 3; i++) {
          for (let j = i + 1; j < 3; j++) {
            const aLeft  = pts[i].x - pillSizes[i].w / 2;
            const aRight = pts[i].x + pillSizes[i].w / 2;
            const aTop   = pts[i].y - pillSizes[i].h / 2;
            const aBot   = pts[i].y + pillSizes[i].h / 2;
            const bLeft  = pts[j].x - pillSizes[j].w / 2;
            const bRight = pts[j].x + pillSizes[j].w / 2;
            const bTop   = pts[j].y - pillSizes[j].h / 2;
            const bBot   = pts[j].y + pillSizes[j].h / 2;
            const ox = Math.min(aRight, bRight) - Math.max(aLeft, bLeft);
            const oy = Math.min(aBot,   bBot)   - Math.max(aTop,  bTop);
            if (ox > 0 && oy > 0) {
              if (ox <= oy) {
                const push = ox / 2 * (pts[i].x < pts[j].x ? -1 : 1);
                pts[i].x += push; pts[j].x -= push;
              } else {
                const push = oy / 2 * (pts[i].y < pts[j].y ? -1 : 1);
                pts[i].y += push; pts[j].y -= push;
              }
            }
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines behind pills
      const pairs = [[0,1],[1,2],[0,2]];
      pairs.forEach(([a, b]) => {
        const dx   = pts[a].x - pts[b].x;
        const dy   = pts[a].y - pts[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = Math.max(0, 0.4 - dist / 1200);
        if (alpha <= 0) return;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = PINK;
        ctx.lineWidth   = 0.8;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(pts[a].x, pts[a].y);
        ctx.lineTo(pts[b].x, pts[b].y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Midpoint mint dot
        const mx = (pts[a].x + pts[b].x) / 2;
        const my = (pts[a].y + pts[b].y) / 2;
        ctx.globalAlpha = alpha * 2.5;
        ctx.fillStyle   = MINT;
        ctx.shadowColor = MINT;
        ctx.shadowBlur  = 4;
        ctx.beginPath();
        ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Apply transforms
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
      pills.forEach(p => { p.style.transform = 'none'; p.style.position = ''; p.style.zIndex = ''; });
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