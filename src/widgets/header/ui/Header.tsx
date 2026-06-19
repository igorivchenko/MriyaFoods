"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Icon } from "@/shared/ui";
import styles from "./Header.module.css";

/** Navigation link descriptor */
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Catalog", href: "/catalog" },
  { label: "Contact", href: "/contact" },
];

export interface HeaderProps {
  /** Currently active nav path (e.g. "/" for Home). Used for active link styling. */
  activePath?: string;
}

export const Header = ({ activePath }: HeaderProps) => {
  const pathname = usePathname();
  const currentPath = activePath ?? pathname ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header>
      {/* ── Top Info Bar ─────────────────────────────────── */}
      <div className={styles.topBar}>
        <div
          className={styles.topBarInner}
          style={{
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--spacing-md)",
            position: "relative",
          }}
        >
          {/* Left: Social cluster */}
          <div className={styles.socialCluster}>
            <span className={styles.followLabel}>Follow us</span>
            <div className={styles.socialLinks}>
              <a
                href="https://instagram.com"
                className={styles.socialLink}
                aria-label="Follow us on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="instagram" size={14} />
              </a>
              <a
                href="https://facebook.com"
                className={styles.socialLink}
                aria-label="Follow us on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="facebook" size={14} />
              </a>
              <a
                href="https://tiktok.com"
                className={styles.socialLink}
                aria-label="Follow us on TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="tiktok" size={14} />
              </a>
            </div>
          </div>

          {/* Center: Delivery info */}
          <span className={styles.deliveryInfo}>
            Delivery time: 09:00 –19:00
          </span>

          {/* Right: Phone number */}
          <a href="tel:+16475555555" className={styles.phoneLink}>
            <span>+ 647-555-5555</span>
          </a>
        </div>
      </div>

      {/* ── Main Navigation Bar ──────────────────────────── */}
      <nav className={styles.navBar} aria-label="Main navigation">
        <div
          className={styles.navBarInner}
          style={{
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--spacing-md)",
          }}
        >
          {/* Brand / Logo zone */}
          <Link href="/" className={styles.brand} aria-label="MriyaFoods Home">
            <span className={styles.brandIcon}>
              <Icon name="logo" size={32} />
            </span>
          </Link>

          {/* Desktop navigation links */}
          <ul className={styles.navLinks} role="menubar">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className={styles.navItem} role="none">
                <Link
                  href={link.href}
                  role="menuitem"
                  className={`${styles.navLink} ${
                    currentPath === link.href ? styles.navLinkActive : ""
                  }`.trim()}
                  aria-current={currentPath === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Action zone: Search + Cart + Account */}
          <div className={styles.actions}>
            {/* Search bar */}
            <form className={styles.searchBar} role="search" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="header-search" className="visually-hidden">
                Search
              </label>
              <input
                id="header-search"
                type="search"
                className={styles.searchInput}
                placeholder="Search"
                aria-label="Search products"
              />
              <button
                type="submit"
                className={styles.searchBtn}
                aria-label="Submit search"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Cart button — dumb presentational */}
            <button
              type="button"
              className={styles.actionBtn}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
            </button>

            {/* Account button — dumb presentational */}
            <button
              type="button"
              className={styles.actionBtn}
              aria-label="My account"
            >
              <User size={20} />
            </button>

            {/* Mobile hamburger toggle */}
            <button
              type="button"
              className={styles.mobileToggle}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={toggleMobile}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ────────────────────────────────── */}
      {/* Overlay backdrop */}
      <div
        className={`${styles.mobileOverlay} ${
          mobileOpen ? styles.mobileOverlayOpen : ""
        }`.trim()}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Slide-in drawer */}
      <aside
        className={`${styles.mobileDrawer} ${
          mobileOpen ? styles.mobileDrawerOpen : ""
        }`.trim()}
        aria-label="Mobile navigation"
      >
        <div className={styles.mobileDrawerHeader}>
          <span className={styles.brandName}>MriyaFoods</span>
          <button
            type="button"
            className={styles.mobileDrawerClose}
            aria-label="Close menu"
            onClick={closeMobile}
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile search */}
        <div className={styles.mobileSearch}>
          <div className={styles.mobileSearchBar}>
            <Search size={16} color="var(--color-primary-tint)" />
            <input
              type="search"
              className={styles.mobileSearchInput}
              placeholder="Search products..."
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Mobile nav links */}
        <ul className={styles.mobileNavLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={styles.mobileNavLink}
                onClick={closeMobile}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </header>
  );
};

Header.displayName = "Header";
