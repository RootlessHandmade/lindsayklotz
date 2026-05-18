'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Nav.module.css';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
      <div className="pill-mark pill-mark-sm" style={{ cursor: 'pointer' }}
  onMouseEnter={e => {
    e.currentTarget.children[0].style.transform = 'rotate(-12deg) translateX(-2px)';
    e.currentTarget.children[1].style.transform = 'rotate(6deg) translateX(3px)';
    e.currentTarget.children[2].style.transform = 'rotate(-4deg) translateX(-1px)';
  }}
  onMouseLeave={e => {
    e.currentTarget.children[0].style.transform = 'rotate(0deg)';
    e.currentTarget.children[1].style.transform = 'rotate(0deg)';
    e.currentTarget.children[2].style.transform = 'rotate(0deg)';
  }}
  onMouseDown={e => {
    e.currentTarget.children[0].style.transform = 'rotate(8deg) translateX(2px)';
    e.currentTarget.children[1].style.transform = 'rotate(-10deg) translateX(-3px)';
    e.currentTarget.children[2].style.transform = 'rotate(5deg) translateX(2px)';
  }}
  onMouseUp={e => {
    e.currentTarget.children[0].style.transform = 'rotate(-12deg) translateX(-2px)';
    e.currentTarget.children[1].style.transform = 'rotate(6deg) translateX(3px)';
    e.currentTarget.children[2].style.transform = 'rotate(-4deg) translateX(-1px)';
  }}
>
  <div className="p1" style={{ transition: 'transform 0.2s ease' }} />
  <div className="p2" style={{ transition: 'transform 0.25s ease' }} />
  <div className="p3" style={{ transition: 'transform 0.15s ease' }} />
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
