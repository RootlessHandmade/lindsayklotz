import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getAllPosts } from '../lib/posts';
import HomeClient from '../components/HomeClient';

export default function Home() {
  const posts = getAllPosts();
  const latest = posts[0];

  return (
    <>
      <Nav />
      <HomeClient posts={posts} latest={latest} />
      <Footer />
    </>
  );
}