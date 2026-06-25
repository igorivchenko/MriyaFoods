"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CooperationForm } from "@/features/cooperation-form";
import styles from "./Cooperation.module.css";

export const Cooperation = () => {
  return (
    <section className={styles.section} id="cooperation">
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {/* Left Column: Title and Contact Form */}
          <motion.div
            className={styles.leftColumn}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <h2 className={styles.title}>Get in touch</h2>
            <CooperationForm />
          </motion.div>

          {/* Right Column: Information text and visual representation */}
          <motion.div
            className={styles.rightColumn}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className={styles.rightContent}>
              <p className={styles.description}>
                We&apos;re here to help with any questions or concerns! Whether
                you need assistance with an order, sizing, or simply want to
                learn more about our collections, feel free to reach out.
              </p>

              <div className={styles.imageContainer}>
                <div className={styles.yellowCircle} />
                <div className={styles.imageWrapper}>
                  <Image
                    src="/assets/cooperation/cooperation.png"
                    alt="Smiling representative gesturing to the contact form"
                    width={600}
                    height={600}
                    className={styles.image}
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                </div>
              </div>

              <p className={styles.description}>
                Email us or use the form below, and we&apos;ll get back to you
                as soon as possible. We strive to answer any inquiries as soon
                as we can!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

Cooperation.displayName = "Cooperation";
