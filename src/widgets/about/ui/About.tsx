"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Marquee } from "@/shared/ui";
import aboutUsImg from "@/assets/images/about_us.png";
import styles from "./About.module.css";

export const About = () => {
  return (
    <section className={styles.aboutSection} id="about">
      {/* Background Intersecting Marquee Ribbon Lines */}
      <div className={styles.marqueeBackground}>
        <div className={styles.ribbonWrapper1}>
          <Marquee />
        </div>
        <div className={styles.ribbonWrapper2}>
          <Marquee reverse />
        </div>
      </div>

      <div className={`${styles.container} container`}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          About us
        </motion.h2>

        {/* Layout Grid */}
        <div className={styles.grid}>
          {/* Left Column: Handshake Image (Without wrapper card or hover effects) */}
          <motion.div
            className={styles.imageColumn}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <Image
              src={aboutUsImg}
              alt="Two shaking hands painted with Canadian and Ukrainian flags"
              width={560}
              height={450}
              className={styles.handshakeImage}
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
              sizes="(max-width: 768px) 100vw, 560px"
              priority
            />
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            className={styles.textColumn}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className={styles.paragraphs}>
              <p className={styles.paragraphNormal}>
                We proudly offer authentic Ukrainian products and carefully
                selected Eastern European brands, helping you reconnect with
                your roots or discover something new.
              </p>

              <p className={styles.paragraphBold}>
                <strong>Our mission is simple:</strong> quality food with a
                story — whether it{"'"}s a childhood favorite or a cultural
                discovery.
              </p>

              <p className={styles.paragraphDream}>
                Mriya means “dream” in Ukrainian — and our dream is to make it
                easy and joyful for anyone in Canada to experience the best of
                Ukrainian taste, delivered with care.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

About.displayName = "About";
