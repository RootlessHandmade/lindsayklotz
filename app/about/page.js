import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import styles from './page.module.css';

export const metadata = { title: 'About — Lindsay Klotz' };

export default function About() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.mark} aria-hidden="true">
          <div className={styles.pillLg} style={{ background: 'var(--pink)', width: 120 }} />
          <div className={styles.pillLg} style={{ background: 'var(--mint)', width: 75, marginLeft: 20 }} />
          <div className={styles.pillLg} style={{ background: 'var(--ink)', width: 100, marginLeft: 10 }} />
        </div>

        <h1 className={styles.title}>Hi, I&apos;m Lindsay.</h1>
        <div className={styles.prose}>
          <p>
            I&apos;m a learning developer focused on the intersection where creativity, innovation, AI, and human-centered learning meet.
          </p>
          <p>
            I&apos;ve spent the last 11 years in L&D rescuing people from bloated content, sleepy courses, and the quiet despair of “click next to continue.”
          </p>
          <p>
          This blog is where I explore the things I keep coming back to in L&D: useful design, creative problem-solving, AI, and the strange little art of making people care.
          </p>
          <p>
            If you want to follow along, <a href="/subscribe">subscribe to my newsletter</a>.
            I send emails sparingly — no fluff, just ideas worth your time.
          </p>

          <h2>Get in touch</h2>
          <p>
            Find me at <a href="https://lindsayklotz.com">lindsayklotz.com</a> or
            reach out via <a href="mailto:rootlesshandmade@gmail.com">rootlesshandmade@gmail.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
