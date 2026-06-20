"use client";

import Image from "next/image";
import styles from "./Marquee.module.css";

interface MarqueeProps {
  reverse?: boolean;
  text?: string;
  showFlags?: boolean;
}

export const Marquee = ({
  reverse = false,
  text = "From Ukraine, with Care.",
  showFlags = true,
}: MarqueeProps) => {
  const items = Array.from({ length: 8 });

  const renderGroup = (keyPrefix: string) => (
    <div className={styles.marqueeGroup}>
      {items.map((_, idx) => (
        <div key={`${keyPrefix}-${idx}`} className={styles.marqueeItem}>
          <span className={styles.marqueeText}>{text}</span>
          {showFlags && (
            <div className={styles.flagsContainer}>
              <Image
                src="/assets/about/canada.svg"
                alt="Canada Flag"
                width={24}
                height={12}
                className={styles.flagIcon}
              />
              <Image
                src="/assets/about/ukraine.svg"
                alt="Ukraine Flag"
                width={18}
                height={12}
                className={styles.flagIcon}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`${styles.marqueeTrack} ${reverse ? styles.reverse : ""}`}>
      {renderGroup("group1")}
      {renderGroup("group2")}
    </div>
  );
};

Marquee.displayName = "Marquee";
