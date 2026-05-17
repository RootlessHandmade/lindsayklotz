import Script from 'next/script';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Subscribe — Lindsay Klotz',
  description: 'Get ideas about graphic design, learning, and innovation delivered to your inbox.',
};

export default function Subscribe() {
  return (
    <>
      <Nav />
      <main className={styles.main}>

        {/* ── Hero ── */}
        <div className={styles.hero}>
          <div className={styles.pillRow} aria-hidden="true">
            <div className={styles.pill} style={{ background: 'var(--pink)', width: 80 }} />
            <div className={styles.pill} style={{ background: 'var(--mint)', width: 50 }} />
            <div className={styles.pill} style={{ background: 'var(--ink)', width: 65 }} />
          </div>
          <h1 className={styles.title}>Stay in the loop.</h1>
          <p className={styles.sub}>
            One email a week — ideas about graphic design, creative learning,
            and what happens when disciplines collide. No fluff, no spam.
            Just things worth your time.
          </p>
        </div>

        {/* ── Kit form ── */}
        <div className={styles.formBox}>
          <div data-uid="eaa7969e7a" />
          <Script
            src="https://lindsay-klotz.kit.com/eaa7969e7a/index.js"
            data-uid="eaa7969e7a"
            strategy="afterInteractive"
          />
        </div>

        {/* ── What to expect ── */}
        <div className={styles.expect}>
          <h2 className={styles.expectTitle}>What you&apos;ll get</h2>
          <div className={styles.expectGrid}>
            <div className={styles.expectCard}>
              <div className={styles.expectDot} style={{ background: 'var(--pink)' }} />
              <div>
                <p className={styles.expectName}>Design breakdowns</p>
                <p className={styles.expectDesc}>Real examples of what works, what doesn&apos;t, and why.</p>
              </div>
            </div>
            <div className={styles.expectCard}>
              <div className={styles.expectDot} style={{ background: 'var(--mint)' }} />
              <div>
                <p className={styles.expectName}>Learning insights</p>
                <p className={styles.expectDesc}>How to get better at creative work — faster and with less frustration.</p>
              </div>
            </div>
            <div className={styles.expectCard}>
              <div className={styles.expectDot} style={{ background: 'var(--ink)' }} />
              <div>
                <p className={styles.expectName}>Fresh perspectives</p>
                <p className={styles.expectDesc}>Ideas from outside design that change how you think inside it.</p>
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}