import Link from 'next/link';
import styles from './PostCard.module.css';

export default function PostCard({ post }) {
  const { slug, title, date, excerpt, tags = [] } = post;

  return (
    <Link href={`/blog/${slug}`} className={`post-card ${styles.card}`}>
      <div className={styles.colorBar} />
      <div className={styles.body}>
        <div className={styles.tags}>
          {tags.slice(0, 2).map((tag) => (
            <span key={tag} className={`tag ${styles.tag}`}>{tag}</span>
          ))}
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.footer}>
          <span className={styles.date}>{formatDate(date)}</span>
          <span className={styles.arrow}>→</span>
        </div>
      </div>
    </Link>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}
