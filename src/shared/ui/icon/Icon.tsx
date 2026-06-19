import styles from "./Icon.module.css";

/**
 * Available icon IDs from the SVG sprite (`/icons/sprite.svg`).
 * Each maps to a `<symbol id="icon-{name}">` in the sprite file.
 */
export type IconName = "instagram" | "facebook" | "tiktok" | "logo";

export interface IconProps {
  /** Icon identifier matching a `<symbol>` in the sprite. */
  name: IconName;
  /** Width and height in pixels (square). Defaults to 16. */
  size?: number;
  /** Optional CSS class applied to the root `<svg>` element. */
  className?: string;
  /** Accessible label. If omitted the icon is marked `aria-hidden`. */
  label?: string;
}

/**
 * Renders an icon from the SVG sprite sheet at `/icons/sprite.svg`.
 *
 * Usage:
 * ```tsx
 * <Icon name="instagram" size={14} />
 * <Icon name="logo" size={32} label="MriyaFoods" />
 * ```
 */
export const Icon = ({ name, size = 16, className = "", label }: IconProps) => {
  const isDecorative = !label;

  return (
    <svg
      className={`${styles.icon} ${className}`.trim()}
      width={size}
      height={size}
      aria-hidden={isDecorative ? "true" : undefined}
      aria-label={label}
      role={isDecorative ? undefined : "img"}
      focusable="false"
    >
      <use href={`/icons/sprite.svg#icon-${name}`} />
    </svg>
  );
};

Icon.displayName = "Icon";
