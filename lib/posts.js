import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content/posts');

export function getAllPosts() {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const raw  = fs.readFileSync(path.join(postsDir, filename), 'utf8');
      const { data, content } = matter(raw);
      return { slug, content, ...data };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { slug, content, ...data };
}

export function getAllTags() {
  const posts = getAllPosts();
  const tagSet = new Set();
  posts.forEach((p) => (p.tags || []).forEach((t) => tagSet.add(t)));
  return Array.from(tagSet);
}
