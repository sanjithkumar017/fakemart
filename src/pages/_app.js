import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CartProvider } from '../components/CartProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { analytics } from '../lib/firebase';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Log page view on route change
    const handleRouteChange = (url) => {
      if (analytics) {
        const { logEvent } = require('firebase/analytics');
        logEvent(analytics, 'page_view', {
          page_path: url,
          page_title: document.title
        });
      }
    };

    // Log initial page view
    handleRouteChange(router.pathname);

    // Subscribe to route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.pathname]);

  return (
    <CartProvider>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </CartProvider>
  );
}
