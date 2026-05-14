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
            I&apos;m a designer and lifelong learner based in [your city]. I write about
            graphic design, visual thinking, creative learning, and what happens when
            disciplines collide in unexpected ways.
          </p>
          <p>
            This blog is where I think out loud — sharing what I&apos;m learning,
            what I&apos;m making, and the ideas that keep me up at night in the best way.
          </p>
          <p>
            If you want to follow along, <a href="/subscribe">subscribe to my newsletter</a>.
            I send one email a week — no fluff, just ideas worth your time.
          </p>

          <h2>What I write about</h2>
          <ul>
            <li><strong>Graphic design</strong> — typography, color, layout, visual systems</li>
            <li><strong>Learning</strong> — how to get better at creative work</li>
            <li><strong>Innovation</strong> — what happens when design meets other disciplines</li>
          </ul>

          <h2>Get in touch</h2>
          <p>
            Find me at <a href="https://lindsayklotz.com">lindsayklotz.com</a> or
            reach out via <a href="mailto:hello@lindsayklotz.com">hello@lindsayklotz.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
