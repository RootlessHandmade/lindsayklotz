'use client';
import { useEffect, useRef } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import styles from './page.module.css';

export default function Subscribe() {
  const formRef = useRef(null);

  useEffect(() => {
    if (!formRef.current) return;

    // Load the Kit CK script only on this page
    const script = document.createElement('script');
    script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
    script.async = true;
    formRef.current.appendChild(script);

    return () => {
      // Clean up script when leaving the page
      if (formRef.current && script.parentNode === formRef.current) {
        formRef.current.removeChild(script);
      }
    };
  }, []);

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
        <div className={styles.formBox} ref={formRef}>
          <form
            action="https://app.kit.com/forms/9453759/subscriptions"
            className="seva-form formkit-form"
            method="post"
            data-sv-form="9453759"
            data-uid="eaa7969e7a"
            data-format="inline"
            data-version="5"
            style={{ maxWidth: '100%' }}
          >
            <div data-style="clean">
              <ul
                className="formkit-alert formkit-alert-error"
                data-element="errors"
                data-group="alert"
              />
              <div
                data-element="fields"
                data-stacked="false"
                className="seva-fields formkit-fields"
                style={{ display: 'flex', gap: 10 }}
              >
                <div className="formkit-field" style={{ flex: 1 }}>
                  <input
                    className="formkit-input"
                    name="email_address"
                    aria-label="Email Address"
                    placeholder="Email Address"
                    required
                    type="email"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1.5px solid var(--border)',
                      borderRadius: 8,
                      fontSize: 14,
                      fontFamily: 'var(--font-body)',
                      color: 'var(--ink)',
                      outline: 'none',
                    }}
                  />
                </div>
                <button
                  data-element="submit"
                  className="formkit-submit"
                  style={{
                    background: 'var(--pink)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 13,
                    letterSpacing: '.02em',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>Subscribe</span>
                </button>
              </div>
              <p style={{
                fontSize: 11,
                color: 'var(--muted)',
                marginTop: 12,
                fontFamily: 'var(--font-body)',
              }}>
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </form>
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