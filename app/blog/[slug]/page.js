import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import { getAllPosts, getPostBySlug } from '../../../lib/posts';
import styles from './page.module.css';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: `${post.title} — Lindsay Klotz`, description: post.excerpt };
}

async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export default async function PostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const contentHtml = await markdownToHtml(post.content || '');

  return (
    <>
      <Nav />
      <article className={styles.article}>

        <header className={styles.header}>
          <div className={styles.tags}>
            {(post.tags || []).map((tag) => (
              <a key={tag} href={`/blog?tag=${tag.toLowerCase()}`} className="tag tag-pink">{tag}</a>
            ))}
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
          <div className={styles.meta}>
            <span className={styles.date}>{formatDate(post.date)}</span>
            {post.readTime && <span className={styles.readTime}>{post.readTime} min read</span>}
          </div>
          <div className={styles.divider} />
        </header>

        <div
          className={`prose ${styles.prose}`}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* ── Download button ── */}
        {post.downloadUrl && (
          <div className={styles.downloadBox}>
            <div className={styles.downloadInner}>
              <div className={styles.downloadText}>
                <p className={styles.downloadLabel}>
                  {post.downloadLabel || 'Download'}
                </p>
                <p className={styles.downloadSub}>Free PDF — no email required</p>
              </div>
              <a
                href={post.downloadUrl}
                download
                className={styles.downloadBtn}
              >
                ↓ Download PDF
              </a>
            </div>
          </div>
        )}

        <div className={styles.back}>
          <a href="/blog" className={styles.backLink}>← Back to all posts</a>
        </div>
      </article>
      <Footer />
    </>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}