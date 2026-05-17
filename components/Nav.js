'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Nav.module.css';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
      <div className="pill-mark pill-mark-sm" style={{ transition: 'transform 0.2s ease', cursor: 'pointer' }}
  onMouseEnter={e => e.currentTarget.style.transform = 'rotate(-8deg) scale(1.1)'}
  onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}
  onMouseDown={e => e.currentTarget.style.transform = 'rotate(12deg) scale(0.95)'}
  onMouseUp={e => e.currentTarget.style.transform = 'rotate(-8deg) scale(1.1)'}
>
  <div className="p1" />
  <div className="p2" />
  <div className="p3" />
</div>
        <span className={styles.wordmark}>LINDSAY KLOTZ</span>
      </Link>

      <div className={`${styles.links} ${open ? styles.open : ''}`}>
      <Link href="/blog"    className={styles.link}>Blog</Link>
      <Link href="/about"   className={styles.link}>About</Link>
      <Link href="/subscribe" className={styles.subscribe}>Subscribe</Link>
      </div>

      <button
        className={styles.burger}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}
