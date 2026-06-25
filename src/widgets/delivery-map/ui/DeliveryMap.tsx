"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import styles from "./DeliveryMap.module.css";

// Styled Skeleton Fallback for Leaflet Map
export const MapSkeleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.skeletonMap}>
        {/* Shimmer overlay */}
        <div className={styles.shimmer} />

        {/* Loading Spinner and Info */}
        <div className={styles.skeletonContent}>
          <div className={styles.spinner} />
          <p className={styles.skeletonText}>
            Loading interactive delivery map...
          </p>
        </div>

        {/* Legend Placeholder */}
        <div className={`${styles.skeletonLegend} glass-panel`}>
          <div className={styles.skeletonLegendItem}>
            <div className={styles.skeletonColor} />
            <div className={styles.skeletonLines}>
              <div className={styles.skeletonLineShort} />
              <div className={styles.skeletonLineLong} />
            </div>
          </div>
          <div className={styles.skeletonLegendItem}>
            <div className={styles.skeletonColor} />
            <div className={styles.skeletonLines}>
              <div className={styles.skeletonLineShort} />
              <div className={styles.skeletonLineLong} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MapSkeleton.displayName = "MapSkeleton";

// Dynamic Import of MapInner (client-side only, no SSR)
const MapInner = dynamic(
  () => import("./MapInner").then((mod) => mod.MapInner),
  {
    ssr: false,
    loading: () => <MapSkeleton />,
  },
);

export const DeliveryMap = () => {
  return (
    <section className={styles.section} id="delivery">
      <div className={`${styles.container} container`}>
        {/* Animated Heading Section */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <h2 className={styles.title}>Your Sweet Spot on the Map</h2>
        </motion.div>

        {/* Map Container Wrapper */}
        <motion.div
          className={styles.mapContainerOuter}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
        >
          <MapInner />
        </motion.div>
      </div>
    </section>
  );
};

DeliveryMap.displayName = "DeliveryMap";
