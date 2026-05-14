import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import PostCard from '../../components/PostCard';
import { getAllPosts, getAllTags } from '../../lib/posts';
import styles from './page.module.css';

export const metadata = { title: 'Blog — Lindsay Klotz' };

export default function BlogPage({ searchParams }) {
  const activeTag = searchParams?.tag || null;
  const allPosts  = getAllPosts();
  const tags      = getAllTags();
  const posts     = activeTag
    ? allPosts.filter((p) => (p.tags || []).map(t => t.toLowerCase()).includes(activeTag.toLowerCase()))
    : allPosts;

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>The Blog</h1>
          <p className={styles.sub}>Design, learning, and everything in between.</p>
        </header>

        {/* Tag filters */}
        <div className={styles.filters}>
          <a href="/blog" className={`${styles.filter} ${!activeTag ? styles.active : ''}`}>All</a>
          {tags.map((tag) => (
            <a
              key={tag}
              href={`/blog?tag=${tag.toLowerCase()}`}
              className={`${styles.filter} ${activeTag === tag.toLowerCase() ? styles.active : ''}`}
            >{tag}</a>
          ))}
        </div>

        {posts.length > 0 ? (
          <div className={styles.grid}>
            {posts.map((post) => <PostCard key={post.slug} post={post} />)}
          </div>
        ) : (
          <p className={styles.empty}>No posts yet — check back soon.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
