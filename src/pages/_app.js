import { CartProvider } from '../components/CartProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
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
