import './globals.css';
import CursorEffect from '../components/CursorEffect';

export const metadata = {
  title: 'Lindsay Klotz — Design · Learning · Innovation',
  description: 'Writing about graphic design, visual thinking, and what happens when creative disciplines collide.',
  openGraph: {
    title: 'Lindsay Klotz',
    description: 'Writing about graphic design, visual thinking, and what happens when creative disciplines collide.',
    url: 'https://lindsayklotz.com',
    siteName: 'Lindsay Klotz',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CursorEffect />
        {children}
      </body>
    </html>
  );
}