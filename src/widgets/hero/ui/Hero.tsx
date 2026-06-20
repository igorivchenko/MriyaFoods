"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Smile } from "lucide-react";
import { Button } from "@/shared/ui";
import heroImg from "@/assets/images/hero.png";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Left Column: Content */}
        <motion.div
          className={styles.contentColumn}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <h1 className={styles.headline}>
            A European Taste Journey.
            <span className={styles.accentHeadline}>One Bite at a Time.</span>
          </h1>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <div className={styles.iconWrapper}>
                <ShieldCheck size={18} className={styles.featureIcon} />
              </div>
              <div className={styles.featureText}>
                <h3 className={styles.featureTitle}>UNIQUE OFFERING</h3>
                <p className={styles.featureDesc}>
                  We carefully curate each and every product we decide to
                  import. This leads to us having a wide and special offering of
                  products to share with your customers and your market.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.iconWrapper}>
                <MapPin size={18} className={styles.featureIcon} />
              </div>
              <div className={styles.featureText}>
                <h3 className={styles.featureTitle}>FAST DELIVERY</h3>
                <p className={styles.featureDesc}>
                  Whether you are local, or across the country, our team of
                  professionals work around the clock to ensure you have the
                  freshest product and quickest delivery available.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.iconWrapper}>
                <Smile size={18} className={styles.featureIcon} />
              </div>
              <div className={styles.featureText}>
                <h3 className={styles.featureTitle}>100% SATISFACTION</h3>
                <p className={styles.featureDesc}>
                  Your happiness is always our priority. We stand by the quality
                  of our products and services, guaranteeing an experience{" "}
                  {"you'll"} love every time.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.cta}>
            <Link href="/catalog" passHref>
              <Button variant="glass" size="lg" className={styles.shopBtn}>
                Shop now
              </Button>
            </Link>
            <Link href="/cooperation" passHref>
              <Button variant="primary" size="lg" className={styles.workBtn}>
                Work with us
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Visual Container */}
        <motion.div
          className={styles.visualColumn}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className={styles.imageContainer}>
            {/* Background Yellow Circle */}
            <div className={styles.circleBg} />

            {/* Optimized LCP Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={heroImg}
                alt="Smiling blonde woman holding a paper grocery bag filled with fresh bread and pastries"
                priority
                className={styles.heroImage}
                width={460}
                height={510}
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Floating Badges */}
            <motion.div
              className={styles.badgeTaste}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              Taste at home!
            </motion.div>

            <motion.div
              className={styles.badgeYummy}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              Yuuummmy!
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

Hero.displayName = "Hero";
