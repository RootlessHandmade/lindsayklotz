import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { getAllPosts } from '../lib/posts';
import styles from './page.module.css';

export default function Home() {
  const posts = getAllPosts();
  const latest = posts[0];
  const rest   = posts.slice(1);

  return (
    <>
      <Nav />

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
            <span className="tag tag-pink">Graphic design</span>
            <span className="tag tag-dark">Learning</span>
            <span className="tag tag-ghost">Innovation</span>
          </div>

          <h1 className={styles.heroHeadline}>
            DESIGN.<br />
            <span className={styles.pink}>LEARN.</span><br />
            <span className={styles.outline}>MAKE.</span>
          </h1>

          <p className={styles.heroSub}>
            Hi, I&apos;m Lindsay — a designer and lifelong learner writing about
            graphic design, visual thinking, and what happens when creative
            disciplines collide.
          </p>

          <div className={styles.heroCtas}>
            <a href="/blog" className="btn-primary">READ THE BLOG</a>
            <a href="/about" className="btn-outline">ABOUT ME</a>
          </div>
        </div>

        {/* ── Pill hero mark ── */}
        <div className={styles.heroMark} aria-hidden="true">
          <div className={styles.pillLg} style={{ background: 'var(--pink)', width: 180 }}>DESIGN</div>
          <div className={styles.pillLg} style={{ background: 'var(--mint)', color: 'var(--ink)', width: 116, marginLeft: 24 }}>LEARN</div>
          <div className={styles.pillLg} style={{ background: 'var(--ink)', width: 150, marginLeft: 10 }}>MAKE</div>
        </div>
      </section>

      {/* ── Topic strip ── */}
      <div className={styles.topicStrip}>
        <span className={styles.topicLabel}>Explore →</span>
        {['Typography','Color theory','Design systems','Creative process','Visual thinking','Innovation'].map((t) => (
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

      <Footer />
    </>
  );
}
