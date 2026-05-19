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

    const heroMark = pill1.parentElement;
    const pills = [pill1, pill2, pill3];

    heroMark.style.position = 'relative';
    pills.forEach(p => {
      p.style.position = 'absolute';
      p.style.zIndex = '1';
    });

    let heroRect = heroMark.getBoundingClientRect();
    const W = () => heroRect.width;
    const H = () => heroRect.height;

    const PILL_DEFS = [
      { w: 180, h: 52 },
      { w: 116, h: 52 },
      { w: 150, h: 52 },
    ];

    let time = 0;
    let mouseX = 0, mouseY = 0;

    // Expanded radii — fills the full hero area
    const paths = [
      { cx: 0.40, cy: 0.40, rx: 0.42, ry: 0.38, spd: 0.28, off: 0   },
      { cx: 0.55, cy: 0.55, rx: 0.38, ry: 0.35, spd: 0.22, off: 2.1 },
      { cx: 0.48, cy: 0.48, rx: 0.44, ry: 0.32, spd: 0.18, off: 4.2 },
    ];

    const state = paths.map((p) => ({
      x: p.cx * 400,
      y: p.cy * 300,
      vx: 0,
      vy: 0,
    }));

    const SPRING   = 0.12;
    const FRICTION = 0.82;
    const BOUNCE   = 1.4;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const handleResize = () => {
      heroRect = heroMark.getBoundingClientRect();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize',    handleResize);

    let rafId;

    const animate = () => {
      time += 0.008;

      const cw = W(), ch = H();

      const targets = paths.map(p => ({
        x: p.cx * cw + Math.sin(time * p.spd + p.off) * p.rx * cw + mouseX * 12,
        y: p.cy * ch + Math.sin(time * p.spd * 2 + p.off) * p.ry * ch + mouseY * 8,
      }));

      state.forEach((s, i) => {
        s.vx += (targets[i].x - s.x) * SPRING;
        s.vy += (targets[i].y - s.y) * SPRING;
        s.vx *= FRICTION;
        s.vy *= FRICTION;
        s.x  += s.vx;
        s.y  += s.vy;
      });

      // Bounce collision — 3 iterations
      for (let iter = 0; iter < 3; iter++) {
        for (let i = 0; i < 3; i++) {
          for (let j = i + 1; j < 3; j++) {
            const a  = state[i];
            const b  = state[j];
            const aw = PILL_DEFS[i].w, ah = PILL_DEFS[i].h;
            const bw = PILL_DEFS[j].w, bh = PILL_DEFS[j].h;

            const ox = Math.min(a.x+aw/2, b.x+bw/2) - Math.max(a.x-aw/2, b.x-bw/2);
            const oy = Math.min(a.y+ah/2, b.y+bh/2) - Math.max(a.y-ah/2, b.y-bh/2);

            if (ox > 0 && oy > 0) {
              if (ox <= oy) {
                const dir = a.x < b.x ? -1 : 1;
                a.x += dir * ox/2; b.x -= dir * ox/2;
                const avg = (a.vx + b.vx) / 2;
                a.vx = avg * -BOUNCE + dir * 1.5;
                b.vx = avg *  BOUNCE - dir * 1.5;
              } else {
                const dir = a.y < b.y ? -1 : 1;
                a.y += dir * oy/2; b.y -= dir * oy/2;
                const avg = (a.vy + b.vy) / 2;
                a.vy = avg * -BOUNCE + dir * 1.5;
                b.vy = avg *  BOUNCE - dir * 1.5;
              }
            }
          }
        }
      }

      // Clamp to bounds
      state.forEach((s, i) => {
        const hw = PILL_DEFS[i].w / 2, hh = PILL_DEFS[i].h / 2;
        if (s.x < hw)      { s.x = hw;      s.vx =  Math.abs(s.vx) * 0.6; }
        if (s.x > cw - hw) { s.x = cw - hw; s.vx = -Math.abs(s.vx) * 0.6; }
        if (s.y < hh)      { s.y = hh;      s.vy =  Math.abs(s.vy) * 0.6; }
        if (s.y > ch - hh) { s.y = ch - hh; s.vy = -Math.abs(s.vy) * 0.6; }
      });

      pills.forEach((el, i) => {
        const s  = state[i];
        const hw = PILL_DEFS[i].w / 2, hh = PILL_DEFS[i].h / 2;
        el.style.left  = `${s.x - hw}px`;
        el.style.top   = `${s.y - hh}px`;
        el.style.width = `${PILL_DEFS[i].w}px`;
      });

      rafId = requestAnimationFrame(animate);
    };

    heroRect = heroMark.getBoundingClientRect();
    state.forEach((s, i) => {
      s.x = paths[i].cx * W();
      s.y = paths[i].cy * H();
    });

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize',    handleResize);
      cancelAnimationFrame(rafId);
      pills.forEach(p => {
        p.style.position = '';
        p.style.left = '';
        p.style.top = '';
        p.style.width = '';
        p.style.zIndex = '';
        p.style.transform = 'none';
      });
      heroMark.style.position = '';
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