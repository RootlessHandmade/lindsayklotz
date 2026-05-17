'use client';
import { useEffect } from 'react';
import PostCard from './PostCard';
import styles from '../app/page.module.css';

export default function HomeClient({ posts, latest }) {

  useEffect(() => {
    const pill1 = document.getElementById('pill1');
    const pill2 = document.getElementById('pill2');
    const pill3 = document.getElementById('pill3');
  
    let mouseX = 0, mouseY = 0;
    let time = 0;
  
    // Each pill has its own position and velocity
    const pills = [
      { el: pill1, x: 0, y: 0, vx: 0, vy: 0, baseX: 0,   baseY: 0   },
      { el: pill2, x: 0, y: 0, vx: 0, vy: 0, baseX: 24,  baseY: 62  },
      { el: pill3, x: 0, y: 0, vx: 0, vy: 0, baseX: 10,  baseY: 124 },
    ];
  
    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };
  
    window.addEventListener('mousemove', handleMouseMove);
  
    const PILL_W = 180;
    const PILL_H = 52;
    const BOUNCE = 0.6;
    const FRICTION = 0.85;
  
    const animate = () => {
      time += 0.012;
  
      // Target positions from mouse + ambient float
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
  
      // Spring each pill toward its target
      pills.forEach((p, i) => {
        const tx = targets[i].x;
        const ty = targets[i].y;
        p.vx += (tx - p.x) * 0.08;
        p.vy += (ty - p.y) * 0.08;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;
      });
  
      // Collision detection between each pair
      for (let i = 0; i < pills.length; i++) {
        for (let j = i + 1; j < pills.length; j++) {
          const a = pills[i];
          const b = pills[j];
  
          // Get real screen positions
          const ax = a.baseX + a.x;
          const ay = a.baseY + a.y;
          const bx = b.baseX + b.x;
          const by = b.baseY + b.y;
  
          const dx = bx - ax;
          const dy = by - ay;
          const overlapX = PILL_W - Math.abs(dx);
          const overlapY = PILL_H - Math.abs(dy);
  
          if (overlapX > 0 && overlapY > 0) {
            // Resolve on the smaller overlap axis
            if (overlapX < overlapY) {
              const push = (overlapX / 2) * (dx > 0 ? 1 : -1);
              a.vx -= push * BOUNCE;
              b.vx += push * BOUNCE;
            } else {
              const push = (overlapY / 2) * (dy > 0 ? 1 : -1);
              a.vy -= push * BOUNCE;
              b.vy += push * BOUNCE;
            }
          }
        }
      }
  
      // Apply transforms
      pills.forEach((p, i) => {
        const tilt = mouseX * [12, -10, 14][i];
        if (p.el) {
          p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotateY(${tilt}deg)`;
        }
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
