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

    let mouseX = 0, mouseY = 0;
    let time = 0;

    const BOUNCE   = 0.7;
    const FRICTION = 0.88;
    const SPRING   = 0.07;

    // Pills: position offset from their natural layout position
    const pills = [
      { el: pill1, x: 0, y: 0, vx: 0, vy: 0, w: 180, h: 52 },
      { el: pill2, x: 0, y: 0, vx: 0, vy: 0, w: 116, h: 52 },
      { el: pill3, x: 0, y: 0, vx: 0, vy: 0, w: 150, h: 52 },
    ];

    // Store natural (un-transformed) positions once
    let bases = null;

    const getBases = () => {
      // Temporarily reset transforms to get natural positions
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
      if (!bases) { getBases(); }

      time += 0.012;

      // Target offsets for each pill
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

      // Spring toward target
      pills.forEach((p, i) => {
        p.vx += (targets[i].x - p.x) * SPRING;
        p.vy += (targets[i].y - p.y) * SPRING;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x  += p.vx;
        p.y  += p.vy;
      });

      // Collision resolution — run 3 iterations for stability
      for (let iter = 0; iter < 3; iter++) {
        for (let i = 0; i < pills.length; i++) {
          for (let j = i + 1; j < pills.length; j++) {
            const a = pills[i];
            const b = pills[j];

            // Actual screen rects after current offsets
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
              // Push apart on the smallest overlap axis
              if (overlapX <= overlapY) {
                const push = overlapX / 2;
                const dir  = aLeft < bLeft ? -1 : 1;
                a.x += dir * push;
                b.x -= dir * push;
                // Transfer velocity
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

      // Apply transforms
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
      {/* ── Announcement bar ── */}
      {latest && (
        <a href={`/blog/${latest.slug}`} className={styles.ticker}>
          <span className={styles.tickerDot} />
          <span className={styles.tickerText}>
            NEW POST — {latest.title.toUpperCase()}
          </span>
          <span className={styles.tickerCta}>Read now →</span>
        </a>
      )}

      {/* ── Hero ── */}
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

        {/* ── Pill hero mark ── */}
        <div className={styles.heroMark} aria-hidden="true">
          <div id="pill1" className={styles.pillLg} style={{ background: 'var(--pink)', width: 180 }}>DESIGN</div>
          <div id="pill2" className={styles.pillLg} style={{ background: 'var(--mint)', color: 'var(--ink)', width: 116, marginLeft: 24 }}>LEARN</div>
          <div id="pill3" className={styles.pillLg} style={{ background: 'var(--ink)', width: 150, marginLeft: 10 }}>CREATE</div>
        </div>
      </section>

      {/* ── Topic strip ── */}
      <div className={styles.topicStrip}>
        <span className={styles.topicLabel}>Explore →</span>
        {['Design', 'Learning', 'Innovation', 'Compliance', 'Training', 'AI'].map((t) => (
          <a key={t} href={`/blog?tag=${t.toLowerCase()}`} className={styles.topicTag}>{t}</a>
        ))}
      </div>

      {/* ── Post grid ── */}
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