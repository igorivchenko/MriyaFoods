import Link from "next/link";
import { Icon } from "@/shared/ui";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer} aria-label="Main footer">
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {/* Column 1: Logo */}
          <div className={styles.columnLogo}>
            <Link
              href="/"
              className={styles.logoLink}
              aria-label="MriyaFoods Home"
            >
              <Icon name="logo" size={91} className={styles.logoIcon} />
            </Link>
          </div>

          {/* Column 2: Menu */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Menu</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.link}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#cooperation" className={styles.link}>
                  Cooperation
                </Link>
              </li>
              <li>
                <Link href="/catalog" className={styles.link}>
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/#cooperation" className={styles.link}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Helpful Links */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Helpful Links</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/services" className={styles.link}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/supports" className={styles.link}>
                  Supports
                </Link>
              </li>
              <li>
                <Link href="/terms" className={styles.link}>
                  Terms&Condition
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={styles.link}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact us */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contact us</h3>
            <ul className={styles.contactList}>
              <li>
                <a href="tel:+16475555555" className={styles.link}>
                  + 647-555-5555
                </a>
              </li>
              <li>
                <a href="mailto:info@mriyafoods.ca" className={styles.link}>
                  info@mriyafoods.ca
                </a>
              </li>
              <li>
                <span className={styles.contactText}>Toronto, Ontario</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Yellow/Gold strip */}
      <div className={styles.bottomBar}>
        <div className="container">
          <p className={styles.copyright}>2025 | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
