import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Shop</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/search" className={styles.footerLink}>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/search?category=smartphones" className={styles.footerLink}>
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/search?category=laptops" className={styles.footerLink}>
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/search?category=fragrances" className={styles.footerLink}>
                  Fragrances
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Customer Service</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>About</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="#" className={styles.footerLink}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2026 FakeMart. All rights reserved.</p>
      </div>
    </footer>
  );
}
