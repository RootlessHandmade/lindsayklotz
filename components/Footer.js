import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className="pill-mark pill-mark-sm">
            <div className="p1" />
            <div className="p2" />
            <div className="p3" />
          </div>
          <span className={styles.wordmark}>LINDSAY KLOTZ</span>
        </div>
        <nav className={styles.links}>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/subscribe">Subscribe</Link>
        </nav>
        <p className={styles.copy}>© {new Date().getFullYear()} Lindsay Klotz. All rights reserved.</p>
      </div>
    </footer>
  );
}
