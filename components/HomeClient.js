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
  
    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };
  
    window.addEventListener('mousemove', handleMouseMove);
  
    const animate = () => {
      time += 0.012;
  
      const float1 = Math.sin(time * 1.1) * 8;
      const float2 = Math.sin(time * 0.8 + 1) * 6;
      const float3 = Math.sin(time * 1.3 + 2) * 7;
  
      const tilt1 = Math.cos(time * 0.9) * 4;
      const tilt2 = Math.cos(time * 1.2 + 1) * 3;
      const tilt3 = Math.cos(time * 0.7 + 2) * 5;
  
      if (pill1) pill1.style.transform = `
  translate(${mouseX * 60 + Math.sin(time * 1.1) * 30}px, ${mouseY * 10 + Math.sin(time * 1.1) * 8}px)
  rotateY(${mouseX * 12 + Math.cos(time * 0.9) * 4}deg)
`;
if (pill2) pill2.style.transform = `
  translate(${mouseX * -50 + Math.sin(time * 0.8 + 1) * 25}px, ${mouseY * 14 + Math.sin(time * 0.8 + 1) * 6}px)
  rotateY(${mouseX * -10 + Math.cos(time * 1.2 + 1) * 3}deg)
`;
if (pill3) pill3.style.transform = `
  translate(${mouseX * 70 + Math.sin(time * 1.3 + 2) * 35}px, ${mouseY * -8 + Math.sin(time * 1.3 + 2) * 7}px)
  rotateY(${mouseX * 14 + Math.cos(time * 0.7 + 2) * 5}deg)
`;
  
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
