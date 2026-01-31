import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { SkipLink } from '../accessibility/SkipLink';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
